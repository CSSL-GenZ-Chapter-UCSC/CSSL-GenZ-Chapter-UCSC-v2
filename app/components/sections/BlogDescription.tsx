"use client";

import { useState } from "react";
import { type Blog } from "@/sanity/lib/getBlogs";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { PortableText, PortableTextComponents } from "next-sanity";

interface BlogDescriptionProps {
  blog: Blog | null;
}

interface PortableTextImage {
  asset: {
    _ref: string;
  };
  alt?: string;
}

const components: PortableTextComponents = {
  types: {
    image: ({ value }: { value: PortableTextImage }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <div className="relative w-full my-8 flex justify-center">
          <Image
            src={urlFor(value).width(1200).url()}
            alt={value.alt || "Blog Image"}
            width={1200}
            height={800}
            className="object-cover w-full max-w-4xl h-auto"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          />
        </div>
      );
    },
  },
  block: {
    h1: ({ children }) => (
      <h1 className="text-3xl md:text-4xl text-white mt-8 mb-4">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl md:text-3xl text-white mt-8 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl md:text-2xl text-white mt-6 mb-3">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg md:text-xl text-white mt-6 mb-3">{children}</h4>
    ),
    normal: ({ children }) => (
      <p className="text-[#9AA0A6] mb-4 leading-relaxed text-base md:text-lg">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[#3462B3] pl-4 italic text-gray-400 my-6">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside text-[#9AA0A6] mb-4 ml-4 space-y-2">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside text-[#9AA0A6] mb-4 ml-4 space-y-2">
        {children}
      </ol>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith("/")
        ? "noreferrer noopener"
        : undefined;
      return (
        <a
          href={value.href}
          rel={rel}
          className="text-[#3462B3] hover:underline"
        >
          {children}
        </a>
      );
    },
  },
};

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

  if (!blog) return <p className="text-white text-center py-10">Loading...</p>;

  return (
    <div className="py-8 px-4 md:px-12 lg:px-24 max-w-7xl mx-auto">
      {/* Share icon */}
      <div
        className="bg-[#3462B3] fixed left-0 top-1/2 -translate-y-1/2 w-12 h-12 hover:w-32 transition-all duration-300 flex items-center shadow-lg cursor-pointer z-50 rounded-r-full group overflow-hidden"
        onClick={handleShare}
        title="Share"
      >
        <div className="flex items-center ml-3">
          <svg
            className="w-6 h-6 text-[#CCCCCC] shrink-0"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M18 16a3 3 0 0 0-2.24 1.02l-6.27-3.13a3.1 3.1 0 0 0 0-1.78l6.27-3.13A3 3 0 1 0 15 6a2.9 2.9 0 0 0 .09.71L8.8 9.84a3 3 0 1 0 0 4.32l6.29 3.13A2.9 2.9 0 0 0 15 18a3 3 0 1 0 3-2Z" />
          </svg>
          <span className="ml-3 text-white font-poppins font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Share
          </span>
        </div>
      </div>

      {/* Beautiful popup toast */}
      <div
        className={`fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-5 py-2 rounded-lg shadow-lg transition-all duration-300 z-60
        ${copied ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"}`}
      >
        Link copied!
      </div>

      <div className="mt-8">
        {/* Portable Text Content */}
        {blog.body ? (
          <div className="prose prose-invert max-w-none">
            <PortableText value={blog.body} components={components} />
          </div>
        ) : (
          <p className="text-white">No content available.</p>
        )}

        <div className="border-t border-gray-700 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
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
              <span className="text-blue-500 font-medium">
                {blog.category.title}
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
