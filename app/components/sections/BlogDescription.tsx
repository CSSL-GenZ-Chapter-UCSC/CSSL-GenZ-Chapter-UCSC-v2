"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { getBlogById, type Blog } from "@/sanity/lib/getBlogs";
import { urlFor } from "@/sanity/lib/image";

export const BlogDescription = () => {

  const pathname = usePathname();

  const [blogId, setBlogId] = useState<string | null>(null);
  const [blog, setBlog] = useState<Blog | null>(null);

  
  useEffect(() => {
    if (pathname) {
      const segments = pathname.split("/"); 
      const id = segments[2];
      setBlogId(id);
    }
  }, [pathname]);

  useEffect(() => {
    if (blogId) {
      getBlogById(blogId)
        .then((data) => setBlog(data))
        .catch((err) => console.error(err));
    }
  }, [blogId]);

  if (!blog) return <p>Loading...</p>;

  const contentParagraphs = blog.content
    ? blog.content.split("\n").filter(Boolean)
    : [];

  const subtopicParagraphs = blog.subtopicDescription
    ? blog.subtopicDescription.split("\n").filter(Boolean)
    : [];

  return (
    <div className="py-8 pl-23 border border-red-500">
  {/* Content paragraphs */}
  {contentParagraphs.length > 0 ? (
    contentParagraphs.map((p, i) => (
      <p
        key={i}
        className={`my-2 ${
          i === 0 ? "text-orange-500 font-semibold" : "text-[#9AA0A6]"
        }`}
      >
        {p}
      </p>
    ))
  ) : (
    <p className="text-white">No content</p>
  )}

  {/* Subtopic section */}
  {subtopicParagraphs.length > 0 ? (
    <div>
      <h5 className="text-[#84B5FF] mt-6 mb-2">Sub Topic</h5>

      {/* First subtopic */}
      <p className="text-[#9AA0A6] my-1">{subtopicParagraphs[0]}</p>

      {/* Image if exists */}
      {blog?.mainImage?.asset && (
        <img
          src={urlFor(blog.mainImage).width(1200).url()}
          alt={blog.title}
          className="w-[693px] h-[490px] object-cover lg:-left-[33px] lg:-top-[35px] lg:relative"
        />
      )}

      {/* Rest of subtopics (optional) */}
      {subtopicParagraphs.slice(1).map((sub, i) => (
        <p key={i} className="text-[#9AA0A6] my-1">
          {sub}
        </p>
      ))}

        <div className="flex flex-col md:flex-row justify-between items-center gap-0 text-sm text-gray-400 mt-6">
          {/* Last Updated */}
          <p>
            Last Updated{" "}
            <span className="text-blue-500 font-medium">
              {new Date(blog.publishedAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>
          </p>

          {/* Category */}
          {blog.category && (
            <p>
              Category{" "}
              <span className="text-blue-500 font-medium -ml-30">{blog.category}</span>
            </p>
          )}
        </div>
    </div>
  ) : (
    <p className="text-white">No subtopic description</p>
  )}





</div>




  );
};
