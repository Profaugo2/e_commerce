import { ProductType } from '@/constant/data';
import Link from 'next/link';
import React from 'react';

interface Props {
  selectedTab: string;
  onTabSelect: (tab:string) => void;
}

const HomeTabBar = ({selectedTab, onTabSelect}:Props) => {
  return (
    <div className='flex items-center justify-between flex-wrap gap-5'>
      <div className='flex items-center gap-3 text-sm font-semibold'>
        {ProductType?.map((item) => (
            <button
            onClick={() => onTabSelect(item?.title)}
            key={item?.title} className={`border border-shop_light_orange/20 px-4 py-2 rounded-full md:px-6 md:py-2 hover:bg-shop_light_orange
                hover:border-shop_light_orange hover:text-white hoverEffect 
                ${selectedTab === item?.title ? "bg-shop_light_orange text-white border-shop_light_orange" : "bg-shop_light_orange/20"}`}>{item?.title}</button>
        ))}
      </div>
      <Link href={"/shop"}>View all</Link>
    </div>
  );
};

export default HomeTabBar;
