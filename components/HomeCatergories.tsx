
import { Category } from '@/sanity.types';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Title from './Title';

const HomeCatergories = ({ categories }: { categories: Category[] }) => {
  return (
    <div className='bg-white border border-shop_light_orange/20 my-10 md:my-20 p-5 lg:p-7 rounded-md'>
      <Title className='border-b pb-3'>Popular Categories</Title>
      <div className='mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
        {categories?.map((category) =>  (
        <div key={category?._id}
        className='bg-shop_light_bg p-5 flex items-center gap-3 group'>
          {category?.image && (
            <div className='overflow-hidden border border-shop_light_orange/30 hover:border-shop_light_orange hoverEffect w-20 h-20 p-1'>
              <Link 
              href={`/category/${category?.slug?.current}`}>
              <Image
                src={urlFor(category?.image).url()}
                alt="categoryImage"
                width={500}
                height={500}
                className='w-full h-full object-contain group-hover:scale-110 hoverEffect'
              />
              </Link>
            </div>
          )}
          <div className='space-y-1.5'>
            <h3 className='text-base font-semibold'>{category?.title}</h3>
            <p className='text-sm'>
              <span className='font-semibold text-shop_green'>{`(${category?.productCount})`}</span> {" "} items Available
            </p>
          </div>
          </div>
        ))}
        </div>
    </div>
  );
};

export default HomeCatergories;
