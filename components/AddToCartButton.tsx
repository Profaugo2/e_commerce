"use client"
import { Product } from '@/sanity.types';
import React from 'react';
import { Button } from './ui/button';
import { ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';
import useCartStore from '@/store';
import toast from 'react-hot-toast';
import QuantityButtons from './QuantityButtons';
import PriceFormater from './PriceFormater';

interface Props {
    product: Product;
    className?: string;
}

const AddToCartButton = ({product, className}:Props) => {
    const { addItem, getItemCount } = useCartStore();
    const itemCount = getItemCount(product?._id);
    const isOutOfStock =product?.stock ===0;
    const handleAddToCart= () => {
        if ((product?.stock as number) > itemCount) {
      addItem(product);
      toast.success(
        `${product?.name?.substring(0, 12)}... added successfully!`
      );
    } else {
      toast.error("Can not add more than available stock");
    }
    };
  return (
    <div className='w-full h-12 flex items-center'>
       {itemCount ? (
        <div className="text-sm w-full">
          <div className="flex items-center justify-between">
            <span className="text-xs text-darkColor/80">Quantity</span>
            <QuantityButtons product={product} />
          </div>
          <div className="flex items-center justify-between border-t pt-1">
            <span className="text-xs font-semibold">Subtotal</span>
            <PriceFormater
              amount={product?.price ? product.price * itemCount : 0}
            />
          </div>
        </div>
      ) : (
        <Button
          className={cn(
            "w-full py-2 px-4 bg-shop_light_orange text-white text-center rounded hover:bg-shop_light_orange/90 transition-colors flex items-center justify-center",
            className
          )}
          onClick={handleAddToCart}
          disabled={isOutOfStock}
        >
          <ShoppingCart size={16} className="mr-2" />
          Add to Cart
        </Button>
      )}
    </div>
  )
}

export default AddToCartButton
