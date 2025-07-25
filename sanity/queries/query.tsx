import { defineQuery } from "next-sanity";

const BRANDS_QUERY = defineQuery(`*[_type == 'brand'] | order(title asc)`);
const LATEST_BLOG_QUERY = defineQuery(`*[_type == 'blog' && isLatest == true] | order(title asc){
    ...,
    blogcategories[]->{
    title
    }}`);

const DEAL_PRODUCTS = defineQuery(`*[_type == "product" && status == "hot"] | order(name asc) {
  ...,
  "categories": categories[]->title
}`);

const PRODUCT_BY_SLUG_QUERY = defineQuery(`*[_type == "product" && slug.current == $slug] | order(name asc) [0]`);

const BRAND_QUERY = defineQuery(`*[_type == "product" && slug.current == $slug]{
"brandName": brand->title
}`);

const GET_ALL_BLOG = defineQuery(
  `*[_type == 'blog'] | order(publishedAt desc)[0...$quantity]{
  ...,  
     blogcategories[]->{
    title
}
    }
  `
);

const BLOG_CATEGORIES = defineQuery(
  `*[_type == "blog"]{
     blogcategories[]->{
    ...
    }
  }`
);

const SINGLE_BLOG_QUERY =
  defineQuery(`*[_type == "blog" && slug.current == $slug][0]{
  ..., 
    author->{
    name,
    image,
  },
  blogcategories[]->{
    title,
    "slug": slug.current,
  },
}`);

const OTHERS_BLOG_QUERY = defineQuery(`*[
  _type == "blog"
  && defined(slug.current)
  && slug.current != $slug
]|order(publishedAt desc)[0...$quantity]{
...
  publishedAt,
  title,
  mainImage,
  slug,
  author->{
    name,
    image,
  },
  categories[]->{
    title,
    "slug": slug.current,
  }
}`);

const MY_ORDERS_QUERY =
  defineQuery(`*[_type == 'order' && clerkUserId == $userId] | order(orderData desc){
...,products[]{
  ...,product->
}
}`);
export {BRANDS_QUERY, LATEST_BLOG_QUERY, DEAL_PRODUCTS, PRODUCT_BY_SLUG_QUERY, BRAND_QUERY, GET_ALL_BLOG,
  BLOG_CATEGORIES, SINGLE_BLOG_QUERY, OTHERS_BLOG_QUERY, MY_ORDERS_QUERY
};