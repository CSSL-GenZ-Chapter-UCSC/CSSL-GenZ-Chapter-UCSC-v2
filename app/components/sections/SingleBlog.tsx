"use client";

import { SingleBlogTopSection } from "./SingleBlogTopSection";
import { BlogDescription } from "./BlogDescription";
import { SingleBlogLastSection } from "./SingleBlogLastSection";
import { type Blog } from "@/sanity/lib/getBlogs";

interface SingleBlogProps {
  blog: Blog | null;
  moreBlogs: Blog[];
}

export const SingleBlog = ({ blog, moreBlogs }: SingleBlogProps) => {
  return (
    <section className="pt-35 h-full">
      <div>
        <SingleBlogTopSection blog={blog} />
      </div>
      <div className="border border-blue-500">
        <BlogDescription blog={blog} />
      </div>
      <div className="border-[10px] border-yellow-500">
        <SingleBlogLastSection blogs={moreBlogs} />
      </div>
    </section>
  );
};
