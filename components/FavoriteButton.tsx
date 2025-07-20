"use client";
import { Product } from "@/sanity.types";
import useCartStore from "@/store";
import { Heart } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const FavoriteButton = ({
  showProduct = false,
  product,
}: {
  showProduct?: boolean;
  product?: Product | null | undefined;
}) => {

   const { favoriteProduct, addToFavorite } = useCartStore();
  const [existingProduct, setExistingProduct] = useState<Product | null>(null);

  useEffect(() => {
    const availableItem = favoriteProduct.find(
      (item) => item?._id === product?._id
    );
    setExistingProduct(availableItem || null);
  }, [product, favoriteProduct]);

  const handleFavorite = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    if (product?._id) {
      addToFavorite(product).then(() => {
        toast.success(
          existingProduct
            ? "Product removed successfully!"
            : "Product added successfully!"
        );
      });
    }
  };
  return (
     <>
      {!showProduct ? (
        <Link
          href={"/wishlist"}
          className="group relative hover:text-shop_light_orange hoverEffect"
        >
          <Heart className="group hoverEffect mt-.5 w-5 h-5" />
          <span className="absolute -top-2 -right-3 bg-shop_dark_orange text-white h-5 w-5 rounded-full text-xs font-semibold flex items-center justify-center">
            {favoriteProduct?.length ? favoriteProduct?.length : 0}
          </span>
        </Link>
      ) : (
        <button
          onClick={handleFavorite}
          className="group relative hover:text-shop_light_orange hoverEffect border border-shop_light_orange/80 
          hover:border-shop_light_orange p-1.5 rounded-sm "
        >
          <Heart
            fill={existingProduct ? "#ef4a23" : "#fff"}
            className="text-shop_light_orange/80 group-hover:text-shop_dark_orange hoverEffect mt-.5 w-5 h-5"
          />
        </button>
      )}
    </>
  );
};

export default FavoriteButton;
