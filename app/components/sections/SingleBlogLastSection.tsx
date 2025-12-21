"use client";

import Link from "next/link";
import Image from "next/image";
import { type Blog } from "@/sanity/lib/getBlogs";
import { urlFor } from "@/sanity/lib/image";

interface SingleBlogLastSectionProps {
  blogs: Blog[];
}

export const SingleBlogLastSection = ({
  blogs,
}: SingleBlogLastSectionProps) => {
  if (!blogs || blogs.length === 0) return null;

  return (
    <div className="bg-black text-white py-12 px-4 md:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-blue-400 text-xl md:text-2xl font-medium font-poppins">
            Read Next
          </h2>

          <Link
            href="/blogs"
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
          >
            <span className="text-xl md:text-2xl">&lt;</span>
            <span className="text-sm md:text-lg font-poppins">
              Back to All Blogs
            </span>
          </Link>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <Link
              href={`/blogs/${blog._id}`}
              key={blog._id}
              className="group flex flex-col h-full"
            >
              <div className="relative aspect-video overflow-hidden mb-4">
                {blog.mainImage ? (
                  <Image
                    src={urlFor(blog.mainImage).width(800).url()}
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}
              </div>

              <div className="flex flex-col flex-1">
                <h3 className="font-poppins font-medium text-lg md:text-xl mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-[#4C9DFE] mt-auto text-sm md:text-base font-poppins">
                  {blog.publishedAt
                    ? new Date(blog.publishedAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    : ""}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
