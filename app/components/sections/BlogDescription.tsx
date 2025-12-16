"use client";

import { useState } from "react";
import { type Blog } from "@/sanity/lib/getBlogs";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface BlogDescriptionProps {
  blog: Blog | null;
}

export const BlogDescription = ({ blog }: BlogDescriptionProps) => {
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true); // show toast
      setTimeout(() => setCopied(false), 2000); // hide after 2s
    }
  };

  // --- Handle share button click
  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";

    if (navigator.share) {
      try {
        await navigator.share({
          title: blog?.title || "Blog",
          text: "Check out this blog!",
          url,
        });
      } catch (error) {
        console.log("Share canceled:", error);
      }
    } else {
      // Fallback: copy link
      copyLink();
    }
  };

  if (!blog) return <p>Loading...</p>;

  const contentParagraphs = blog.content
    ? blog.content.split("\n").filter(Boolean)
    : [];

  const subtopics = blog.subtopics || [];

  return (
    <div className="py-8 justify-center">
      {/* Share icon */}
      <div
        className="bg-[#3462B3] fixed top-100 left-0 w-12 h-10 flex justify-center items-center shadow-lg cursor-pointer z-50"
        onClick={handleShare}
      >
        <svg
          className="w-9 h-9 text-[#CCCCCC]"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M18 16a3 3 0 0 0-2.24 1.02l-6.27-3.13a3.1 3.1 0 0 0 0-1.78l6.27-3.13A3 3 0 1 0 15 6a2.9 2.9 0 0 0 .09.71L8.8 9.84a3 3 0 1 0 0 4.32l6.29 3.13A2.9 2.9 0 0 0 15 18a3 3 0 1 0 3-2Z" />
        </svg>
      </div>

      {/* Beautiful popup toast */}
      <div
        className={`fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-5 py-2 rounded-lg shadow-lg transition-all duration-300 
        ${copied ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"}`}
      >
        Link copied!
      </div>

      <div className="mt-8">
        {/* Content paragraphs */}
        {contentParagraphs.length > 0 ? (
          contentParagraphs.map((p, i) => (
            <p
              key={i}
              className={`mb-4 md:text-left${
                i === 0
                  ? "text-white font-bold text-2xl"
                  : "font-semibold md:text-left text-[#9AA0A6]"
              }`}
            >
              {p}
            </p>
          ))
        ) : (
          <p className="text-white">No content</p>
        )}
        {/* Subtopic section */}
        {subtopics.length > 0 ? (
          <div>
            <h5 className="text-[#84B5FF] mt-6 mb-2">Sub Topics</h5>

            {/* --- Change 1 Start: Display first subtopic only --- */}
            <div className="mb-4">
              <h6 className="text-[#FFFFFF] font-semibold">{subtopics[0].title}</h6>
              <p className="text-[#9AA0A6]">{subtopics[0].description}</p>
            </div>

            {/* Image if exists */}
            {blog?.mainImage?.asset && (
              <Image
                src={urlFor(blog.mainImage).width(1200).url()}
                alt={blog.title}
                width={1200}
                height={800}
                className="w-[993px] h-[490px] object-cover lg:left-1.5 lg:top-[30px] lg:relative lg:mb-19"
              />
            )}

            {/* --- Display rest of subtopics --- */}
            {subtopics.slice(1).map((sub, i) => (
              <div key={i} className="mb-4">
                <h6 className="text-[#FFFFFF] font-semibold">{sub.title}</h6>
                <p className="text-[#9AA0A6]">{sub.description}</p>
              </div>
            ))}
            {/* --- End --- */}

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
                  <span className="text-blue-500 font-medium">
                    {blog.category}
                  </span>
                </p>
              )}
            </div>
          </div>
        ) : (
          <p className="text-white">No subtopics available</p>
        )}
      </div>
    </div>
  );
};