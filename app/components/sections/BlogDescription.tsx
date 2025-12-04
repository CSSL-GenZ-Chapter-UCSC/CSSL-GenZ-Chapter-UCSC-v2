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
    <div className="py-8 px-25 justify-center">
  {/* Content paragraphs */}
  {contentParagraphs.length > 0 ? (
    contentParagraphs.map((p, i) => (
      <p
        key={i}
        className={`mb-4 md:text-left${
          i === 0 ? "text-white font-bold text-2xl" : "font-semibold md:text-left text-[#9AA0A6]"
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
          className="w-[993px] h-[490px] object-cover lg:left-[120px] lg:top-[30px] lg:relative lg:mb-19"
        />
      )}

      {/* Rest of subtopics (optional) */}
      {subtopicParagraphs.slice(1).map((sub, i) => (
        <p key={i} className="text-[#9AA0A6] my-1">
          {sub}
        </p>
      ))}

        <div className="-ml-10 md:flex md:flex-row md:gap-1 lg:flex lg:flex-row justify-between items-center gap-1 text-sm text-gray-400 mt-6">
          {/* Last Updated */}

          
          <p className="ml-10 -mt-5">
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
            <p className="ml-74 -mt-5">
              Category{" "}
              <span className="text-blue-500 font-medium">{blog.category}</span>
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




















