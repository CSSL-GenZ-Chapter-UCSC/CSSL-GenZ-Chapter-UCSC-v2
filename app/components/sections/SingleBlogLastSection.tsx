"use client";

import Link from "next/link";
import Image from "next/image";
import { type Blog } from "@/sanity/lib/getBlogs";
import { urlFor } from "@/sanity/lib/image";

interface SingleBlogLastSectionProps {
  blogs: Blog[];
}

export const SingleBlogLastSection = ({ blogs }: SingleBlogLastSectionProps) => {
  
  return (
    <div className="py-12 px-4 md:px-8 lg:px-16">
      <h2 className="text-white text-3xl font-bold mb-8">More Blogs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <Link href={`/blogs/${blog._id}`} key={blog._id} className="group">
            <div className="bg-[#1a1a1a] rounded-lg overflow-hidden transition-transform duration-300 group-hover:-translate-y-2">
              <div className="relative h-48 w-full">
                {blog.mainImage?.asset && (
                  <Image
                    src={urlFor(blog.mainImage).width(600).height(400).url()}
                    alt={blog.title}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {blog.title}
                </h3>
                <p className="text-gray-400 text-sm line-clamp-2">
                  {blog.excerpt}
                </p>
                <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                  <span>{new Date(blog.publishedAt).toLocaleDateString()}</span>
                  <span className="text-blue-400">{blog.category}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};


  if (!blogs || blogs.length === 0) return <p className="text-gray-400 py-12">No other blogs.</p>;

  return (
    <div className="bg-black text-white p-1 pt-1 relative z-10">
      <div className="flex items-center justify-between mt-8 mb-6 px-2">
        <h2 className="text-2xl text-blue-400">Read Next</h2>

        {/* 🔧 MODIFIED: Link without button inside */}
        <Link
          href="/blogs"
          className="flex items-center gap-2 text-blue-400 hover:text-blue-300"
        >
          <span className="text-5xl">&lt;</span>
          <span className="text-lg">Back to All Blogs</span>
        </Link>
      </div>

      {/* Blog Posts Grid */}
      <div className="flex flex-row gap-3">
        {blogs.map(blog => (
          <Link href={`/blogs/${blog._id}`} key={blog._id} className="group cursor:pointer w-[980px]">
            <div>
              {/* Blog image */}
              <div className="bg-gray-700 aspect-video mb-4 overflow-hidden">
                {blog.mainImage ? (
                  <Image
                    src={urlFor(blog.mainImage).width(1200).url()}
                    alt={blog.title}
                    width={1200}  // required
                    height={800}
                    className="w-full h-full font-[500] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}
              </div>
              {/* Blog title and date */}
              <h3 className="text-2xl font-medium [@media(max-width:400px)]:text-xl mb-2 group-hover:text-blue-400 transition-colors">
                {blog.title}
              </h3>
              <p className="text-xl text-[#4C9DFE] text-sm">
                {blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }) : ""}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )    
}


