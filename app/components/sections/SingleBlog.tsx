"use client";


import { SingleBlogTopSection } from './SingleBlogTopSection';
import { BlogDescription } from './BlogDescription';
import { SingleBlogLastSection } from "./SingleBlogLastSection";


export const SingleBlog = () => {

  return (
    <section className="relative h-auto w-full bg-black flex flex-col relative top-[80px]">
        <div>
          <SingleBlogTopSection />
        </div>    
        <div>
          <BlogDescription />
        </div>     
        <div>
          <SingleBlogLastSection />
        </div>     
    </section>
  );
};








