"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getBlogs, type Blog } from "@/sanity/lib/getBlogs";
import { DynamicButtons } from "./DynamicButtons";
import { urlFor } from "@/sanity/lib/image";

export const DisplayBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("Fetching blogs for category:", selectedCategory);
    setLoading(true);
    
    getBlogs(selectedCategory)
      .then((data: Blog[] | null) => {
        console.log("Raw data from getBlogs:", data);
        
        if (!data || !Array.isArray(data)) {
          console.log("No data or not an array");
          setBlogs([]);
          return;
        }

        console.log(`Fetched ${data.length} blogs for category:`, selectedCategory);
        console.log("Blog categories:", data.map(b => b.category));

        const sorted = data.sort((a, b) => {
          if (!a.publishedAt || !b.publishedAt) return 0;
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        });

        setBlogs(sorted);
      })
      .catch((err) => {
        console.error("Error fetching blogs:", err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
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
            <Link href={`/blogs/${blog._id}`} key={blog._id}>
              <div className="border overflow-hidden shadow-md hover:-translate-y-2 hover:shadow-xl cursor-pointer">
                {blog.mainImage?.asset && (
                  <img
                    src={urlFor(blog.mainImage).width(600).height(400).url()}
                    alt={blog.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2 font-thin">{blog.title}</h3>
                  {blog.excerpt && (
                      <p className="text-[#9AA0A6] font-medium mb-4">
                          {blog.excerpt}
                      </p>
                  )}
                  {blog.publishedAt && (
                    <p className="text-[#4C9DFE] text-sm text-gray-500 mb-3">
                      {new Date(blog.publishedAt).toLocaleDateString()}
                    </p>
                  )}
              
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};