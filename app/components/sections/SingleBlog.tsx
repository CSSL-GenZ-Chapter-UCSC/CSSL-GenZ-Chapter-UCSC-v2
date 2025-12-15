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
      <div>
        <BlogDescription blog={blog} />
      </div>
      <div>
        <SingleBlogLastSection blogs={moreBlogs} />
      </div>
    </section>
  );
};
