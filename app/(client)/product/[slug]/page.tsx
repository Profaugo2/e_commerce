import { notFound } from 'next/navigation';
import React from 'react';
import { getProductBySlug } from "@/sanity/queries";
import Container from '@/components/Container';
// import ShareBadge from "@/components/singleProduct/ShareBadge";
import ImageView from "@/components/ImageView";
import { CornerDownLeft, StarIcon, Truck } from 'lucide-react';
import PriceView from '@/components/PriceView';
import AddToCartButton from '@/components/AddToCartButton';
import FavoriteButton from '@/components/FavoriteButton';
import ProductCharacteristics from "@/components/ProductCharacteristics";
import { FiShare2 } from "react-icons/fi";
import { RxBorderSplit } from "react-icons/rx";
import { TbTruckDelivery } from "react-icons/tb";
import { FaRegQuestionCircle } from "react-icons/fa";
import { VendorFallback } from '@/components/VendorFallback';


const SingleProductPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

  if (!product) {
    return notFound();
  }
  return (
   <div className="bg-white py-10">
      <Container>
        {/* <ShareBadge product={product} /> */}
        <div className="flex flex-col md:flex-row gap-10 py-10">
          {product?.images && (
            <ImageView images={product?.images} isStock={product?.stock} />
          )}
          <div className="w-full md:w-3/5 flex flex-col gap-5">
            <div className="space-y-1">
              <p className="text-2xl font-bold">{product?.name}</p>
              <p className="text-sm text-gray-600 tracking-wide">
                {product?.description}
              </p>
              <div className="flex items-center gap-0.5 text-xs">
                {[...Array(5)].map((_, index) => (
                  <StarIcon
                    key={index}
                    size={12}
                    className="text-tech_light_green"
                    fill={"#3b9c3c"}
                  />
                ))}
                <p className="font-semibold">{`(120)`}</p>
              </div>
            </div>
            <div className="space-y-2 border-t border-b border-gray-200 py-5">
              <PriceView
                price={product?.price}
                discount={product?.discount}
                className="text-lg font-bold"
              />
              <p
                className={`px-4 inline-block text-center text-xs py-1.5 font-semibold rounded-lg ${product?.stock === 0 ? 
                    "bg-red-100 text-red-600" : "text-green-600 bg-green-100"}`}
              >
                {(product?.stock as number) > 0 ? "In Stock" : "Out of Stock"}
              </p>
            </div>

            <div className="flex justify-between gap-2.5 lg:gap-5">
              <AddToCartButton product={product} />
              <FavoriteButton showProduct={true} product={product} />
            </div>
            <ProductCharacteristics product={product} />
            {!product.inStock && (
                <VendorFallback productId={product._id} />
                                 )}
            <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-b-gray-200 py-5 -mt-2">
              <div className="flex items-center gap-2 text-sm text-black hover:text-red-600 hoverEffect">
                <RxBorderSplit className="text-lg" />
                <p>Compare color</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-black hover:text-red-600 hoverEffect">
                <FaRegQuestionCircle className="text-lg" />
                <p>Ask a question</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-black hover:text-red-600 hoverEffect">
                <TbTruckDelivery className="text-lg" />
                <p>Delivery & Return</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-black hover:text-red-600 hoverEffect">
                <FiShare2 className="text-lg" />
                <p>Share</p>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="border border-tech_light_color/25 border-b-0 p-3 flex items-center gap-2.5">
                <Truck size={30} className="text-tech_orange" />
                <div>
                  <p className="text-base font-semibold text-black">
                    Free Delivery
                  </p>
                  <p className="text-sm text-gray-500 underline underline-offset-2">
                    Enter your Postal code for Delivey Availability.
                  </p>
                </div>
              </div>
              <div className="border border-tech_light_color/25 p-3 flex items-center gap-2.5">
                <CornerDownLeft size={30} className="text-tech_orange" />
                <div>
                  <p className="text-base font-semibold text-black">
                    Return Delivery
                  </p>
                  <p className="text-sm text-gray-500 ">
                    Free 30days Delivery Returns.{" "}
                    <span className="underline underline-offset-2">
                      Details
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <ProductsDetails /> */}
      </Container>
    </div>
  );
};

export default SingleProductPage;
