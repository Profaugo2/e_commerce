import Link from 'next/link';
import React from 'react';
import Title from './Title';
import { getAllBrands } from '@/sanity/queries';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { GitCompareArrows, Headset, ShieldCheck, Truck } from 'lucide-react';

const extraData = [
    {
      title: "Free Delivery",
      description: "Free shippining over 20,000 FCFA",
      icon: <Truck size={45} />
    },
    {
      title: "Free Return",
      description: "Free shippining over 20,000 FCFA",
      icon: <GitCompareArrows size={45} />
    },
    {
      title: "Customer Support",
      description: "Friendly 27/7 customer support",
      icon: <Headset size={45} />
    },
    {
      title: "Money Back guarantee",
      description: "Quality checked by our team",
      icon: <ShieldCheck size={45} />
    },
];

const ShopByBrands = async () => {
    const brands = await getAllBrands();
  return (
    <div className='mb-10 lg:mb-20 bg-shop_light_bg p-5 lg:p-7'>
      <div className='flex items-center gap-5 justify-between mb-10'>
        <Title className='text-2xl'>Shop <span className='text-shop_btn_dark_orange'>By Brands</span></Title>
        <Link href={"/shop"}
        className='text-sm font-semibold tracking-wide hover:text-shop_dark_orange hoverEffect'>
        veiw all</Link>
      </div>
      <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3'>
        {brands?.map((brand) =>(
            <Link 
            href={{pathname: "/shop", query: {brand: brand?.slug?.current}}}
            key={brand?._id}
            className='bg-white w-34 h-24 flex items-center justify-center rounded-md overflow-hidden
            hover:shadow-lg shadow-shop_dark_orange/40 hoverEffect'>
                {brand?.image && (
                    <Image 
                    src={urlFor(brand?.image).url()}
                    alt='brandImage'
                    width={250}
                    height={250}
                    className='w-32 h-20 object-contain'
                    />
                )}
                </Link>
        ))}
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-16 p-2 shadow-sm hover:shadow-shop_light_orange/20 py-5'>
        {extraData?.map((item, index) =>(
            <div
            key={index}
            className='flex items-center gap-3 group text-lightColor hover:text-shop_light_orange'
            >
                <span className='inline-flex scale-100 group-hover:scale-90 hoverEffect cursor-pointer'>{item?.icon}</span>
                <div className='text-sm'>
                    <p className='text-darkColor/80 font-bold capitalise'>{item?.title}</p>
                     <p className='text-lightColor'>{item?.description}</p>
                </div>
            </div>
        ))}
        </div>
    </div>
  );
};

export default ShopByBrands;
