import Container from "@/components/Container";
import Title from "@/components/Title";
import { urlFor } from "@/sanity/lib/image";
import { getAllBlogs } from "@/sanity/queries";
import dayjs from "dayjs";
import { Calendar} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogPage = async () => {
  const blogs = await getAllBlogs(6);

  return (
    <div className="py-10 bg-tech_white">
      <Container>
        <Title>Our Blogs</Title>
        <h1 className="text-sm text-darkColor/80 tracking-wide mt-1 leading-5 max-w-3xl">
          <p className="text-xl font-semibold">Welcome to Our E-commerce Blog!</p>
            At <span className="text-shop_dark_orange font-bold">NEDY_SHOP</span>, we&apos;re passionate about bringing you the best shopping experience, 
            from the latest trends to unbeatable deals. Our blog is your go-to destination for expert 
            tips, product highlights, and insider insights that help you make informed choices. Whether 
            you&apos;re looking for style inspiration, tech updates, or gift guides, we&apos;ve got you covered. Stay tuned 
            as we share stories that inspire, educate, and celebrate the joy of shopping—because here, it&apos;s not just about buying, 
            it&apos;s about discovering what you love.
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5 md:mt-10">
          {blogs?.map((blog) => (
            <div
              key={blog?._id}
              className="rounded-md overflow-hidden relative group"
            >
              <div className="w-full max-h-96 overflow-hidden">
                {blog?.mainImage && (
                  <Image
                    src={urlFor(blog?.mainImage).url()}
                    alt="blogImage"
                    width={500}
                    height={500}
                    className="w-full h-full object-cover group-hover:scale-110 hoverEffect"
                  />
                )}
              </div>
              <Link
                href={`/blog/${blog?.slug?.current}`}
                className="absolute inset-1"
              ></Link>
              <div className="bg-tech_bg_color p-5">
                <div className="text-xs flex items-center gap-5">
                  <div className="flex items-center relative group cursor-pointer">
                    {blog?.blogcategories?.map((item, index) => (
                      <p
                        key={index}
                        className="font-semibold text-tech_orange tracking-wider"
                      >
                        {item?.title}
                      </p>
                    ))}
                    <span className="absolute left-0 -bottom-1.5 bg-tech_light_color/30 inline-block w-full h-[2px] group-hover:bg-tech_orange hover:cursor-pointer hoverEffect" />
                  </div>
                  <p className="flex items-center gap-1 text-tech_light_color relative group hover:cursor-pointer hover:text-tech_orange hoverEffect">
                    <Calendar size={15} />{" "}
                    {dayjs(blog.publishedAt).format("MMMM D, YYYY")}
                    <span className="absolute left-0 -bottom-1.5 bg-tech_light_color/30 inline-block w-full h-[2px] group-hover:bg-tech_orange hoverEffect" />
                  </p>
                </div>
                <Link
                  href={`/blog/${blog?.slug?.current}`}
                  className="text-base font-bold tracking-wide mt-5 line-clamp-2 h-12 group-hover:text-tech_orange hoverEffect"
                >
                  {blog?.title}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default BlogPage;