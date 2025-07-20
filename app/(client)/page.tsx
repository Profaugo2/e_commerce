import Container from '@/components/Container';
import HomeBanner from '@/components/HomeBanner';
import HomeCatergories from '@/components/HomeCatergories';
import LastestBlog from '@/components/LastestBlog';
import ProductGrid from '@/components/ProductGrid';
import ShopByBrands from '@/components/ShopByBrands';
import { getCategories } from '@/sanity/queries/index';
import React from 'react'

const Home = async () => {

  const categories = await getCategories(8);

  return (
    <Container>
      <HomeBanner />
      <div className='py-10'>
        <ProductGrid />
      </div>
      <HomeCatergories categories={categories}/>
      <ShopByBrands />
      <LastestBlog />
    </Container>
  );
};

export default Home;
