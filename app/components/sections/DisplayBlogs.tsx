"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getBlogs, type Blog } from "@/sanity/lib/getBlogs";
import { DynamicButtons } from "./DynamicButtons";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

export const DisplayBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const data = await getBlogs(selectedCategory);
        if (!data || !Array.isArray(data)) {
          setBlogs([]);
          return;
        }
        setBlogs(
          data.sort((a, b) => {
            if (!a.publishedAt || !b.publishedAt) return 0;
            return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
          })
        );
      } catch (err: unknown) {
        // Narrow the error type
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [selectedCategory]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <DynamicButtons
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <div className="text-center py-12">Loading blogs...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <DynamicButtons
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <div className="text-red-500 text-center py-12">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <DynamicButtons
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500">
            No blogs found for this category.
          </div>
        ) : (
          blogs.map((blog) => (
            <Link href={`/blogs/${blog._id}`} key={blog._id} className="">
              <div className="overflow-hidden shadow-md hover:-translate-y-2 hover:shadow-xl cursor-pointer flex flex-col h-full">
                {blog.mainImage?.asset && (
                  <Image
                    src={urlFor(blog.mainImage).width(600).height(400).url()}
                    alt={blog.title}
                    width={1200}  // required
                    height={800}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-[#9AA0A6] text-xl font-bold mb-2 font-thin">{blog.title}</h3>
                    {blog.excerpt && (
                      <p className="text-[#9AA0A6] font-medium mb-4">
                        {blog.excerpt}
                      </p>
                    )}
                  </div>
                  <div className="flex justify-between mt-auto text-[#4C9DFE]">
                    {blog.publishedAt && (
                      <p>{new Date(blog.publishedAt).toLocaleDateString()}</p>
                    )}
                    {blog.category && (
                      <p className="-mt-1">{blog.category}</p>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};