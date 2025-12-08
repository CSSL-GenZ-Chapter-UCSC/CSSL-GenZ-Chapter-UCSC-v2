"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getBlogs, type Blog } from "@/sanity/lib/getBlogs";
import { DynamicButtons } from "./DynamicButtons";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { motion } from "motion/react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const BlogSkeleton = () => (
  <div className="overflow-hidden rounded-lg h-full flex flex-col bg-[#1a1a1a] animate-pulse">
    <div className="w-full h-48 bg-gray-800" />
    <div className="p-4 flex flex-col justify-between flex-1 space-y-4">
      <div>
        <div className="h-6 bg-gray-800 rounded w-3/4 mb-2" />
        <div className="h-4 bg-gray-800 rounded w-full mb-2" />
        <div className="h-4 bg-gray-800 rounded w-2/3" />
      </div>
      <div className="flex justify-between mt-auto">
        <div className="h-4 bg-gray-800 rounded w-1/4" />
        <div className="h-4 bg-gray-800 rounded w-1/4" />
      </div>
    </div>
  </div>
);

export const DisplayBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(0); // page index
  const blogsPerPage = 9; // number of blogs per page

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
            return (
              new Date(b.publishedAt).getTime() -
              new Date(a.publishedAt).getTime()
            );
          })
        );

        setCurrentPage(0);
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

  // --- ADDED: calculate start and end index for current page
  const start = currentPage * blogsPerPage;
  const end = start + blogsPerPage;

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <DynamicButtons
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <BlogSkeleton key={i} />
          ))}
        </div>
      ) : error ? (
        <div className="text-red-500 text-center py-12">Error: {error}</div>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {blogs.length === 0 ? (
            <div className="col-span-full text-center py-12 text-gray-500">
              No blogs found for this category.
            </div>
          ) : (
            // --- MODIFIED: slice blogs to show only current page
            blogs.slice(start, end).map((blog) => (
              <motion.div key={blog._id} variants={item}>
                <Link href={`/blogs/${blog._id}`}>
                  <motion.div
                    whileHover={{ y: -10, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="overflow-hidden shadow-md cursor-pointer flex flex-col h-full bg-[#1a1a1a] rounded-lg"
                  >
                    {blog.mainImage?.asset && (
                      <Image
                        src={urlFor(blog.mainImage)
                          .width(600)
                          .height(400)
                          .url()}
                        alt={blog.title}
                        width={1200} // required
                        height={800}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-4 flex flex-col justify-between flex-1">
                      <div>
                        <h3 className="text-[#9AA0A6] text-xl font-bold mb-2">
                          {blog.title}
                        </h3>
                        {blog.excerpt && (
                          <p className="text-[#9AA0A6] font-medium mb-4">
                            {blog.excerpt}
                          </p>
                        )}
                      </div>
                      <div className="flex justify-between mt-auto text-[#4C9DFE]">
                        {blog.publishedAt && (
                          <p>
                            {new Date(blog.publishedAt).toLocaleDateString()}
                          </p>
                        )}
                        {blog.category && (
                          <p className="-mt-1">{blog.category}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))
          )}
        </motion.div>
      )}

      {/* --- ADDED: Pagination buttons */}
      {!loading && !error && blogs.length > 0 && (
        <div className="flex justify-center mt-6 gap-4">
          {/* Previous button */}
          {currentPage > 0 && (
            <button
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="cursor-pointer bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition"
            >
              Previous
            </button>
          )}

          {/* Next button */}
          {(currentPage + 1) * blogsPerPage < blogs.length && (
            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="cursor-pointer bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
            >
              Next
            </button>
          )}
        </div>
      )}
    </div>
  );
};
