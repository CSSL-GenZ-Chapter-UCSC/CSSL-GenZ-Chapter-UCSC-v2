"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { type Blog } from "@/sanity/lib/getBlogs";
import { fetchBlogsAction } from "@/app/actions/sanity";
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

interface DisplayBlogsProps {
  initialBlogs: Blog[];
}

export const DisplayBlogs = ({ initialBlogs }: DisplayBlogsProps) => {
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isFirstLoad = useRef(true);

  const [currentPage, setCurrentPage] = useState(0); // page index
  const blogsPerPage = 9; // number of blogs per page

  useEffect(() => {
    if (isFirstLoad.current && selectedCategory === "All") {
      isFirstLoad.current = false;
      return;
    }

    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const data = await fetchBlogsAction(selectedCategory);
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
    <div className="max-w-[2400px] px-4 sm:px-6 md:px-8 lg:px-12 mx-auto border border-green-500">
      <div className="border border-blue-1000 max-h-[740px] max-w-[740px] mx-auto">
        <DynamicButtons
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>

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
          className="border border-red-500 grid grid-cols-2 lg:grid-cols-3 gap-8 gap-x-3 lg:gap-x-1 lg:mt-20"
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
                    className="border border-yellow-400 h-[310px] lg:h-[546px] w-99/100 lg:w-95/100 flex flex-col overflow-hidden shadow-md cursor-pointer bg-[#000000]"
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
                        className="w-full h-28 lg:h-78 object-cover"
                      />
                    )}
                    <div className="p-4 flex flex-col justify-between flex-1">
                      <div>
                        <h3 className="text-white text-base lg:text-[22px] font-poppins font-medium leading-snug min-h-[3.8rem]">
                          {blog.title}
                        </h3>
                        {blog.excerpt && (
                          <p className="text-[#9AA0A6] text-[12px] lg:text-[18px] lg:text-lg font-normal font-poppins mb-4">
                            {blog.excerpt}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-row gap-2 lg:gap-12 font-normal lg:font-light font-poppins mt-auto text-[#4C9DFE]">
                        {blog.publishedAt && (
                          <p className="text-[9px] lg:text-[18px] lg:float-left">
                            {new Date(blog.publishedAt).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short", // short = Jan, Feb, Mar
                              year: "numeric",
                            })}
                          </p>
                        )}

                        {blog.category && (
                          <p className="font-poppins text-[9px] lg:text-[18px] lg:float-left">{blog.category}</p>
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
