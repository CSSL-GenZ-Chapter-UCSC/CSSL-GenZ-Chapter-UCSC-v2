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
  if (!blogs || blogs.length === 0)
    return <p className="text-gray-400 py-12">No other blogs.</p>;

  return (
    <div className="bg-black text-white overflow-hidden p-1 pt-1 relative z-10">
      <div className="flex items-center justify-between text-[14px] md:ml-20 md:mr-12 lg:mr-27 md:text-[20px] mt-8 mb-6 px-2">
        <h2 className=" text-blue-400">Read Next</h2>

        {/* 🔧 MODIFIED: Link without button inside */}
        <Link
          href="/blogs"
          className="flex items-center gap-2 text-blue-400 hover:text-blue-300"
        >
          <span className="text-[14px] md:text-[20px]">&lt;</span>
          <span className="text-[14px] md:text-[20px]">Back to All Blogs</span>
        </Link>
      </div>

      {/* Blog Posts Grid */}
      <div className="bg-black grid grid-cols-3 gap-1 mx-auto lg:gap-1 md:ml-20">
        {blogs.map((blog) => (
          <Link
            href={`/blogs/${blog._id}`}
            key={blog._id}
            className="bg-black group cursor:pointer"
          >
            <div className="bg-black min-h-[130px] lg:min-h-[250px] w-99/100 md:w-80/100 flex flex-col h-full  bg-gray-900 transition-transform duration-300 hover:-translate-y-2.5">
              {/* Blog image */}
              <div className="overflow-hidden">
                {blog.mainImage ? (
                  <Image
                    src={urlFor(blog.mainImage).width(1200).url()}
                    alt={blog.title}
                    width={1200} // required
                    height={800}
                    className="w-[190px] h-[80px] lg:min-w-[450px] lg:min-h-[250px] font-medium object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}
              </div>
              {/* Blog title and date */}
              <h3 className="font-poppins mt-2 font-medium text-[8px] md:text-[13px]">
                {blog.title}
              </h3>
              <p className="text-[#4C9DFE] mt-auto text-[6px] md:text-[13px]">
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
  );
};
