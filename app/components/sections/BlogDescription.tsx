"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { getBlogs, getBlogById, type Blog } from "@/sanity/lib/getBlogs";
import { urlFor } from "@/sanity/lib/image";
import { usePathname } from "next/navigation";
import { SingleBlogTopSection } from './SingleBlogTopSection';






type Props = { blog: Blog };



export const BlogDescription = () => {

  const [blogId, setBlogId] = useState<string | null>(null);
  const [blog, setBlog] = useState<Blog | null>(null);

  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      const segments = pathname.split("/"); 
      const id = segments[2];
      setBlogId(id);
      console.log("blogId from URL:", id);
    }
  }, [pathname]);

  useEffect(() => {
    if (blogId) {
      getBlogById(blogId)
        .then((data) => {
          setBlog(data);
          console.log("Fetched blog:", data);
        })
        .catch((err) => console.error(err));
    }
  }, [blogId]);

  if (!blog) return <p>Loading...</p>;

  const paragraphs = blog.subtopicDescription
    ? blog.subtopicDescription.split("\n").filter(Boolean)
    : [];

  return (
    <div className="py-38 ">
    {/*<h5 className="text-[#84B5FF]">{blog?.category}</h5>*/}
    <p>hi</p>

          {paragraphs.length > 0 ? (
            paragraphs.map((p, i) => (
              <p key={i} className="text-white my-2">
                {p}
              </p>
            ))
          ) : (
            <p className="text-white">No content</p>
          )}
    </div>
  );
}