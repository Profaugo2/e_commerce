"use client"
import React, { useEffect, useState } from 'react'
import HomeTabBar from './HomeTabBar';
import { ProductType } from '@/constant/data';
import { client } from '@/sanity/lib/client';
import { Loader2 } from 'lucide-react';
import NoProductAvailable from './NoProductAvailable';
import {AnimatePresence } from 'motion/react';
import { motion } from "framer-motion";
import ProductCard from './ProductCard';
import { Product } from '@/sanity.types';

const ProductGrid = () => {

  const loadingMessages = [
  "Product is loading please wait....",
  "Fetching awesome products for you...",
  "Almost there, preparing products...",
  "Good things come to those who wait!",
  "Please check your Internet Connection!"
];
    const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedTab, setSelectedTab] = useState(ProductType[0]?.title || "");

    const query = `*[_type == "product" && variant== $variant] | order(name desc){
  ...,"categories":categories[]->title
}`;

    const params = {variant: selectedTab.toLowerCase()};
    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await client.fetch(query, params);
          setProducts(response)
        } catch (error) {
          console.error("Product fetching Error:", error);
        } finally {
           setLoading(false)
        }
      };
      fetchData();
    }, [selectedTab] );

    useEffect(() => {
      if (loading) {
    const interval = setInterval(() => {
      setLoadingMessageIndex(prevIndex => (prevIndex + 1) % loadingMessages.length);
    }, 3000); // 3000ms = 3 seconds

    // Clear interval when loading becomes false or component unmounts
    return () => clearInterval(interval);
  }
}, [loading]);
  return (
    <div>
      <HomeTabBar selectedTab={selectedTab} onTabSelect={setSelectedTab}/>
      {loading ? (
        <div className='flex flex-col items-center justify-center py-10 min-h-80 gap-4 bg-gray-100 w-full mt-10 rounded-2xl'>
          <div className='space-x-2 flex items-center text-blue-500'>
            <Loader2 className='w-6 h-9 animate-spin'/>
            <span>{loadingMessages[loadingMessageIndex]}</span>
          </div>
      </div>) : products?.length ? (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 mt-10'>
          {products?.map((product)=>(
            <AnimatePresence key={product?._id}>
              <motion.div 
              layout
              initial={{opacity:0.2}}
              animate={{opacity:1}}
              exit={{opacity: 0}}>
                 <ProductCard product={product}/>
              </motion.div>
            </AnimatePresence>
          ))}
        </div>
        ) : (
          <NoProductAvailable  selectedTab={selectedTab}/>
        )}
    </div>
  );
};

export default ProductGrid;
