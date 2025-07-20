"use client";
import { cn } from '@/lib/utils';
import { Product } from '@/sanity.types'
import useCartStore from '@/store';
import { Heart } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const AddToWishListButton = ({
    product,
    className,
}: {
    product:Product;
    className?: string;
}) => {
  const {favoriteProduct, addToFavorite} = useCartStore();
  const [existingProduct, setExistingProduct] =useState<Product | null>(null);
   useEffect(() => {
     const availableProduct = favoriteProduct?.find(
      (item) => item?._id === product?._id
     );
     setExistingProduct(availableProduct || null)
   }, [product, favoriteProduct])
  const handleFavorite = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault()
    if(product?._id){
      addToFavorite(product).then(() => {
        toast.success(existingProduct 
          ? "Product removed successfully":
        "Product added successfully");
      });
    }
  };
  return (
   <div className={cn("absolute top-2 right-2 z-10 cursor-pointer", className)}>
  <p
    onClick={handleFavorite}
    className={cn(
      "p-2.5 rounded-full hover:text-shop_dark_orange font-bold hoverEffect",
      existingProduct && "bg-shop_dark_orange/80 text-white"
    )}
  >
    <Heart size={20} />
  </p>
</div>
  );
};

export default AddToWishListButton;
