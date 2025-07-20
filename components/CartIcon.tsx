"use client";
import useCartStore from '@/store';
import {  ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const CartIcon = () => {
  const {items} = useCartStore();
  return (
    <Link href={"/cart"} className='group relative'>
        <ShoppingCart className='w-5 h-5 hover:text-shop_light_orange hoverEffect'/>
        <span className='absolute -top-2 -right-3 bg-shop_dark_orange 
        text-white h-5 w-5 rounded-full text-xs font-semibold flex 
        items-center justify-center'>
          {items?.length ? items?. length : 0}
          </span>
    </Link>
  );
};

export default CartIcon;
