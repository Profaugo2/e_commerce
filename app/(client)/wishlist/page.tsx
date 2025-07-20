import { currentUser } from '@clerk/nextjs/server'
import React from 'react'
import NoAccessToCart from '@/components/NoAccessToCart';
import WishListProducts from '@/components/WishListProducts';

const WishListPage = async () => {
    const user = await currentUser();
  return (
    <>
     {user ? (
       <WishListProducts />
     ) : (
        <NoAccessToCart details="Log in to view your wishlist items. Don't miss out on your cart products to make the payement!" />
     )} 
    </>
  );
};

export default WishListPage;