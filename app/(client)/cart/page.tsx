"use client";
import React, { useEffect, useState } from "react";
import PriceFormater from "@/components/PriceFormater";
import QuantityButtons from "@/components/QuantityButtons";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { urlFor } from "@/sanity/lib/image";
import useCartStore from "@/store";
import { useAuth, useUser } from "@clerk/nextjs";
import { ArrowLeft, ShoppingBag, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import EmptyCart from "@/components/EmptyCart";
import { client } from "@/sanity/lib/client";
import { Address } from "@/sanity.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Container from "@/components/Container";
import { Input } from "@/components/ui/input";
import NoAccessToCart from "@/components/NoAccessToCart";
import Title from "@/components/Title";
import AddToWishListButton from "@/components/AddToWishListButton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { createCheckoutSession, Metadata } from "@/actions/createCheckoutSession";

const CartPage = () => {
  const {
    deleteCartProduct,
    getItemCount,
    getTotalPrice,
    getDiscountAmount,
    getSubTotalPrice,
    resetCart,
  } = useCartStore();

  const [loading, setLoading] = useState(false);
  const groupedItems = useCartStore((state) => state.getGroupedItems());
  const { user } = useUser();
  const { isSignedIn } = useAuth();
  const [addresses, setAddresses] = useState<Address[] | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [couponCode, setCouponCode] = useState("");
  const [voucherCode, setVoucherCode] = useState("");

  // === ADD DISCOUNTED ITEMS CALCULATION HERE ===
  // Calculate discounted price per product based on product.discount (percentage)
  const discountedItems = groupedItems.map((item) => {
    const price = item.product.price ?? 0;
    const discountPercent = item.product.discount ?? 0;

    const priceAfterDiscount = Math.round(price * (1 - discountPercent / 100));

    return {
      ...item,
      product: {
        ...item.product,
        priceAfterDiscount,
      },
    };
  });

  const fetchAddresses = async () => {
    setLoading(true);
    try {
      const query = `*[_type=="address"] | order(publishedAt desc)`;
      const data = await client.fetch(query);
      setAddresses(data);
      const defaultAddress = data.find((addr: Address) => addr.default);
      if (defaultAddress) {
        setSelectedAddress(defaultAddress);
      } else if (data.length > 0) {
        setSelectedAddress(data[0]);
      }
    } catch (error) {
      console.log("Addresses fetching error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleResetCart = () => {
    const confirmed = window.confirm("Are you sure to reset your Cart?");
    if (confirmed) {
      resetCart();
      toast.success("Your cart reset successfully!");
    }
  };

  // === MODIFY handleCheckout TO SEND discountedItems ===
  const handleCheckout = async () => {
    setLoading(true);
    try {
      const metadata: Metadata = {
        orderNumber: crypto.randomUUID(),
        customerName: user?.fullName ?? "Unknown",
        customerEmail: user?.emailAddresses[0]?.emailAddress ?? "Unknown",
        clerkUserId: user?.id,
        address: selectedAddress,
      };

      const checkoutUrl = await createCheckoutSession(discountedItems, metadata);

      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      console.error("CheckOut error", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = (id: string) => {
    deleteCartProduct(id);
    toast.success("Product deleted successfully!");
  };

  const applyCoupon = () => {
    if (!couponCode.trim()) {
      toast.error("Please enter a coupon code");
      return;
    }
    toast.success("Coupon applied successfully!");
    // Implement coupon logic here
  };

  const applyVoucher = () => {
    if (!voucherCode.trim()) {
      toast.error("Please enter a voucher code");
      return;
    }
    toast.success("Voucher applied successfully!");
    // Implement voucher logic here
  };

  // === MODIFY your price display to use discounted price ===
  // Replace product.price with product.priceAfterDiscount if available, fallback to product.price

  return (
    <div className="pb-20 md:pb-10">
      {isSignedIn ? (
        <Container className="bg-white mt-5 pb-5 rounded-md">
          {discountedItems?.length ? (
            <>
              <div className="flex items-center gap-2 py-5">
                <ShoppingBag className="h-5 w-5 md:h-6 md:w-6" />
                <Title>Shopping Cart</Title>
              </div>

              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto bg-white rounded-md border mb-6">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="py-3 px-4 text-left">Image</th>
                      <th className="py-3 px-4 text-left">Product Name</th>
                      <th className="py-3 px-4 text-left">Model</th>
                      <th className="py-3 px-4 text-left">Status</th>
                      <th className="py-3 px-4 text-center">Favorite</th>
                      <th className="py-3 px-4 text-center">Quantity</th>
                      <th className="py-3 px-4 text-right">Unit Price</th>
                      <th className="py-3 px-4 text-right">Total</th>
                      <th className="py-3 px-4 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {discountedItems?.map(({ product }) => {
                      const itemCount = getItemCount(product?._id);
                      return (
                        <tr key={product?._id} className="border-b">
                          <td className="py-4 px-4">
                            {product?.images && (
                              <Link href={`/product/${product?.slug?.current}`}>
                                <Image
                                  src={urlFor(product.images[0]).url()}
                                  alt={product?.name || "Product image"}
                                  width={80}
                                  height={80}
                                  className="border rounded-md object-cover"
                                />
                              </Link>
                            )}
                          </td>
                          <td className="py-4 px-4">
                            <Link
                              href={`/product/${product?.slug?.current}`}
                              className="font-medium hover:text-primary transition-colors"
                            >
                              {product?.name}
                            </Link>
                          </td>
                          <td className="py-4 px-4 capitalize">{product?.variant}</td>
                          <td className="py-4 px-4 capitalize">{product?.status}</td>
                          <td className="flex items-center gap-2">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <AddToWishListButton product={product} className="relative top-6 items-center left-8" />
                                </TooltipTrigger>
                                <TooltipContent className="font-bold">Add To Favorite</TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex justify-center">
                              <QuantityButtons product={product} />
                            </div>
                          </td>
                          <td className="py-4 px-4 text-right">
                            <PriceFormater amount={product?.priceAfterDiscount ?? product?.price} />
                          </td>
                          <td className="py-4 px-4 text-right font-medium">
                            <PriceFormater amount={(product?.priceAfterDiscount ?? product?.price) * itemCount} />
                          </td>
                          <td className="py-4 px-4 text-center">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <p
                                    onClick={() => handleDeleteProduct(product?._id)}
                                    className="text-red-500 hover:text-red-700 hover:cursor-pointer hoverEffect"
                                  >
                                    <Trash className="h-5 w-5" />
                                  </p>
                                </TooltipTrigger>
                                <TooltipContent className="font-semibold bg-red-600">Delete Product</TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden space-y-4">
                {discountedItems?.map(({ product }) => {
                  const itemCount = getItemCount(product?._id);
                  return (
                    <Card key={product?._id} className="overflow-hidden">
                      <div className="flex p-3 border-b">
                        {product?.images && (
                          <Link href={`/product/${product?.slug?.current}`} className="mr-3">
                            <Image
                              src={urlFor(product.images[0]).url()}
                              alt={product?.name || "Product image"}
                              width={80}
                              height={80}
                              className="border rounded-md object-cover"
                            />
                          </Link>
                        )}
                        <div className="flex-1">
                          <Link
                            href={`/product/${product?.slug?.current}`}
                            className="font-medium hover:text-primary transition-colors"
                          >
                            {product?.name}
                          </Link>
                          <p className="text-sm text-gray-500 capitalize">Model: {product?.variant}</p>
                        </div>
                        <p onClick={() => handleDeleteProduct(product?._id)} className="text-red-500">
                          <Trash className="h-5 w-5" />
                        </p>
                      </div>
                      <div className="p-3 flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-500">Unit Price:</p>
                          <PriceFormater amount={product?.priceAfterDiscount ?? product?.price} className="font-medium" />
                        </div>
                        <QuantityButtons product={product} />
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Total:</p>
                          <PriceFormater amount={(product?.priceAfterDiscount ?? product?.price) * itemCount} className="font-bold" />
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>

              <div className="grid md:grid-cols-3 gap-6 mt-6">
                {/* Coupon & Voucher Section */}
                <div className="md:col-span-2 space-y-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Apply Coupon Code</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-2">
                        <Input placeholder="Enter coupon code" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />
                        <Button onClick={applyCoupon}>Apply Coupon</Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Apply Voucher</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-2">
                        <Input placeholder="Enter voucher code" value={voucherCode} onChange={(e) => setVoucherCode(e.target.value)} />
                        <Button onClick={applyVoucher}>Apply Voucher</Button>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex flex-col sm:flex-row gap-3 mt-6">
                    <Link href="/" className="flex-1">
                      <Button variant="outline" className="w-full flex items-center gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Continue Shopping
                      </Button>
                    </Link>
                    <Button onClick={handleResetCart} variant="destructive" className="flex-1">
                      Reset Cart
                    </Button>
                  </div>
                </div>

                {/* Order Summary web */}
                <div className="hidden md:inline-block">
                  <Card className="bg-white">
                    <CardHeader>
                      <CardTitle>Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <PriceFormater amount={getTotalPrice()} />
                      </div>
                      <div className="flex justify-between">
                        <span>Discount</span>
                        <PriceFormater amount={-getDiscountAmount()} />
                      </div>
                      <Separator />
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total</span>
                        <PriceFormater amount={getSubTotalPrice()} className="text-lg font-bold text-black" />
                      </div>

                      {addresses && (
                        <div className="mt-4">
                          <h3 className="font-medium mb-2">Delivery Address</h3>
                          <RadioGroup defaultValue={addresses?.find((addr) => addr.default)?._id.toString()} className="space-y-2">
                            {addresses.map((address) => (
                              <div
                                onClick={() => setSelectedAddress(address)}
                                key={address?._id}
                                className={`flex items-center space-x-2 cursor-pointer ${
                                  selectedAddress?._id === address?._id && "text-shop_light_orange"
                                }`}
                              >
                                <RadioGroupItem value={address._id.toString()} id={`address-${address?._id}`} />
                                <Label htmlFor={`address-${address?._id}`} className="grid gap-0.5 flex-1 text-sm">
                                  <span className="font-semibold">{address.name}</span>
                                  <span className="text-xs text-muted-foreground line-clamp-2">
                                    {address.address}, {address.city}, {address.state} {address.zip}
                                  </span>
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                          <Button variant="outline" className="w-full mt-3 text-xs" size="sm">
                            Add New Address
                          </Button>
                        </div>
                      )}

                      <Button
                        onClick={handleCheckout}
                        disabled={loading}
                        className="w-full rounded-md font-semibold tracking-wide mt-4 bg-shop_dark_orange hover:bg-shop_light_orange hoverEffect"
                        size="lg"
                      >
                        {loading ? "Processing..." : "Proceed to Checkout"}
                      </Button>

                    </CardContent>
                  </Card>
                </div>

                {/* Order Summary for mobile view */}
                <div className="md:hidden fixed bottom-0 left-0 w-full bg-white pt-2">
                  <Card className="bg-white p-4 rounded-lg border mx-4">
                    <CardHeader>
                      <CardTitle>Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <PriceFormater amount={getTotalPrice()} />
                      </div>
                      <div className="flex justify-between">
                        <span>Discount</span>
                        <PriceFormater amount={-getDiscountAmount()} />
                      </div>
                      <Separator />
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total</span>
                        <PriceFormater amount={getSubTotalPrice()} className="text-lg font-bold text-black" />
                      </div>

                      {addresses && (
                        <div className="mt-4">
                          <h3 className="font-medium mb-2">Delivery Address</h3>
                          <RadioGroup defaultValue={addresses?.find((addr) => addr.default)?._id.toString()} className="space-y-2">
                            {addresses.map((address) => (
                              <div
                                onClick={() => setSelectedAddress(address)}
                                key={address._id}
                                className={`flex items-center space-x-2 cursor-pointer ${
                                  selectedAddress?._id === address?._id && "text-shop_light_orange"
                                }`}
                              >
                                <RadioGroupItem value={address._id.toString()} id={`address-${address._id}`} />
                                <Label htmlFor={`address-${address._id}`} className="grid gap-0.5 flex-1 text-sm">
                                  <span className="font-semibold">{address.name}</span>
                                  <span className="text-xs text-muted-foreground line-clamp-2">
                                    {address.address}, {address.city}, {address.state} {address.zip}
                                  </span>
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                          <Button variant="outline" className="w-full mt-3 text-xs" size="sm">
                            Add New Address
                          </Button>
                        </div>
                      )}

                      <Button
                        onClick={handleCheckout}
                        disabled={loading}
                        className="w-full rounded-md font-semibold tracking-wide mt-4 bg-shop_dark_orange hover:bg-shop_light_orange hoverEffect"
                        size="lg"
                      >
                        {loading ? "Processing..." : "Proceed to Checkout"}
                      </Button>

                    </CardContent>
                  </Card>
                </div>
              </div>
            </>
          ) : (
            <EmptyCart />
          )}
        </Container>
      ) : (
        <NoAccessToCart />
      )}
    </div>
  );
};

export default CartPage;