import Container from '@/components/Container';
import ProductCard from '@/components/ProductCard';
import Title from '@/components/Title';
import { getDealProducts } from '@/sanity/queries';
import { Flame } from 'lucide-react';
import React from 'react';

const DealPage = async () => {
    const products = await getDealProducts();
  return (
    <div className='py-10 bg-shop_deal_bg'>
      <Container>
        <div className='flex gap-1'>
            <div>
            <Flame size={20} fill="#fb6c08" className="text-shop_dark_orange/50 group-hover:text-shop_dark_orange"/>
        </div>
         <div>
            <Title className='mb-5 underline underline-offset- decoration-[1px] 
      text-base uppercase tracking-wide'>Hot Deals of this  Month Don&apos;t Miss</Title>
         </div>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5'>
            
              {products?.map((product) => (
                <ProductCard key={product?._id} product={product}/>
              ))}
            
        </div>
      </Container>
    </div>
  );
};

export default DealPage;
