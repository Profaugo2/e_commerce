import stripe from "@/lib/stripe";
import { backendClient } from "@/sanity/lib/backendClient";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Metadata } from "@/actions/createCheckoutSession";

// --- Webhook Handler ---

export async function POST(req: NextRequest) {
  // 1. Get raw body for Stripe signature validation
  const body = await req.text();
  const headersList = headers();
  const sig = (await headersList).get("stripe-signature");

  // 2. Check for signature header
  if (!sig) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  // 3. Validate webhook secret
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.log("Stripe webhook secret is not set");
    return NextResponse.json({ error: "Stripe webhook secret is not set" }, { status: 400 });
  }

  // 4. Verify Stripe event signature
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (error) {
    console.error("Webhook signature verification failed:", error);
    return NextResponse.json({ error: `Webhook Error: ${error}` }, { status: 400 });
  }

  // 5. Handle relevant event types
  try {
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session);
        break;
      // Add more event types here as needed
      default:
        // Ignore other events
        break;
    }
  } catch (error) {
    console.error("Webhook handler error:", error);
    return NextResponse.json({ error: `Handler error: ${error}` }, { status: 400 });
  }

  // 6. Respond success
  return NextResponse.json({ received: true });
}

// --- Event Handlers ---

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  // Retrieve invoice if present
  const invoice = session.invoice
    ? await stripe.invoices.retrieve(session.invoice as string)
    : null;

  // Create order in Sanity CMS
  await createOrderInSanity(session, invoice);
}

// --- Sanity Order Creation ---

async function createOrderInSanity(
  session: Stripe.Checkout.Session,
  invoice: Stripe.Invoice | null
) {
  const {
    id,
    amount_total,
    currency,
    metadata,
    payment_intent,
    total_details,
  } = session;

  // Extract metadata fields
  const {
    orderNumber,
    customerName,
    customerEmail,
    clerkUserId,
    address,
  } = metadata as Metadata & { address?: string };

  const parsedAddress = address ? JSON.parse(address) : null;

  // Get line items, expand product reference
  const lineItemsRes = await stripe.checkout.sessions.listLineItems(id, {
    expand: ["data.price.product"],
  });
  const lineItems = lineItemsRes.data;

  interface SanityProductRef {
  _key: string;
  product: { _type: "reference"; _ref: string };
  quantity: number;
}

  // Prepare product references & stock updates
  const sanityProducts: SanityProductRef[] = [];
  const stockUpdates: { productId: string; quantity: number }[] = [];

  for (const item of lineItems) {
    const productId = (item.price?.product as Stripe.Product)?.metadata?.id;
    const quantity = item.quantity || 0;

    if (!productId) continue;

    sanityProducts.push({
      _key: crypto.randomUUID(),
      product: { _type: "reference", _ref: productId },
      quantity,
    });

    stockUpdates.push({ productId, quantity });
  }

  // Create order in Sanity
  await backendClient.create({
    _type: "order",
    orderNumber,
    stripeCheckoutSessionId: id,
    stripePaymentIntentId: payment_intent,
    customerName,
    stripeCustomerId: customerEmail,
    clerkUserId,
    email: customerEmail,
    currency,
    amountDiscount: total_details?.amount_discount || 0,
    products: sanityProducts,
    totalPrice: amount_total ? amount_total / 100 : 0,
    status: "paid",
    orderDate: new Date().toISOString(),
    invoice: invoice
      ? {
          id: invoice.id,
          number: invoice.number,
          hosted_invoice_url: invoice.hosted_invoice_url,
        }
      : null,
    address: parsedAddress
      ? {
          state: parsedAddress.state,
          zip: parsedAddress.zip,
          city: parsedAddress.city,
          address: parsedAddress.address,
          name: parsedAddress.name,
        }
      : null,
  });

  // Update stock levels in Sanity
  await updateStockLevels(stockUpdates);
}

// --- Sanity Stock Update ---

async function updateStockLevels(
  stockUpdates: { productId: string; quantity: number }[]
) {
  for (const { productId, quantity } of stockUpdates) {
    try {
      const product = await backendClient.getDocument(productId);

      if (!product || typeof product.stock !== "number") {
        console.warn(`Product with ID ${productId} not found or stock is invalid.`);
        continue;
      }

      const newStock = Math.max(product.stock - quantity, 0);
      await backendClient.patch(productId).set({ stock: newStock }).commit();
    } catch (error) {
      console.error(`Failed to update stock for product ${productId}:`, error);
    }
  }
}