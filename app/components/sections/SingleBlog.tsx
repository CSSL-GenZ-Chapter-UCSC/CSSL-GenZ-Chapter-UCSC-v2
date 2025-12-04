"use client";


import { SingleBlogTopSection } from './SingleBlogTopSection';
import { BlogDescription } from './BlogDescription';
import { SingleBlogLastSection } from "./SingleBlogLastSection";


export const SingleBlog = () => {

  return (
    <section className="pt-35 lg:px-23 relative h-full w-full bg-black flex flex-col gap-0">
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








