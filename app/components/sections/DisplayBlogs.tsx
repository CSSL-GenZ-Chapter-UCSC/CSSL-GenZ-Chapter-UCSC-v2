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

const useIsLargeScreen = () => {
  const [isLarge, setIsLarge] = useState(false);

  useEffect(() => {
    const check = () => setIsLarge(window.innerWidth >= 1024); // Tailwind lg = 1024px
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isLarge;
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

  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  const isLargeScreen = useIsLargeScreen();

  useEffect(() => {
    if (isFirstLoad.current && selectedCategory === "All") {
      isFirstLoad.current = false;
      return;
    }

    const fetchBlogs = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchBlogsAction(selectedCategory);
        if (!data || !Array.isArray(data)) {
          setBlogs([]);
          setCurrentPage(0);
          return;
        }

        // Sort data by publishedAt date (newest first)
        const sortedData = [...data].sort((a, b) => {
          if (!a.publishedAt || !b.publishedAt) return 0;
          return (
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime()
          );
        });
        setBlogs(sortedData);
        setCurrentPage(0); // Reset to first page when category changes
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
        setBlogs([]);
        setCurrentPage(0);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [selectedCategory]);

  /*useEffect(() => {
    if (currentPage >= totalPages && totalPages > 0) {
      setCurrentPage(0);
    }
  }, [currentPage, totalPages]);*/

  // --------------------------------------------
  // Pagination logic (desktop only)
  // --------------------------------------------
  const start = currentPage * blogsPerPage;
  const end = start + blogsPerPage;
  const paginatedBlogs = blogs.slice(start, end);

  // --------------------------------------------
  // ✅ Mobile shows ALL blogs
  //    Desktop shows paginated blogs
  // --------------------------------------------
  const blogsToShow = isLargeScreen ? paginatedBlogs : blogs;

  console.log(
    "currentPage:",
    currentPage,
    "start:",
    start,
    "end:",
    end,
    "blogs length:",
    blogs.length
  );

  return (
    <div className="px-4 pb-3 lg:pb-1 ">
      <div className="max-h-[740px] mx-auto">
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
          key={isLargeScreen ? currentPage : "mobile"}
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 lg:grid-cols-3 gap-8 gap-x-3 lg:gap-x-1 lg:mt-20"
        >
          {blogsToShow.length === 0 ? (
            <div className="col-span-full text-center py-12 text-gray-500">
              No blogs found for this category.
            </div>
          ) : (
            // --- MODIFIED: slice blogs to show only current page
            blogsToShow.map((blog) => (
              <motion.div key={blog._id} variants={item}>
                <Link href={`/blogs/${blog._id}`}>
                  <motion.div
                    whileHover={{ y: -10, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="h-[310px] lg:h-[546px] w-99/100 lg:w-95/100 flex flex-col overflow-hidden shadow-md cursor-pointer bg-[#000000]"
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
                        <h3 className="text-white min-h-1.4 text-base lg:text-[20px] font-poppins font-medium leading-snug">
                          <span className="inline-block text-center">
                            {(() => {
                              const title = blog?.title || "";
                              const splitAt = blog?.titleSplitCharCount || 7;
                              const firstLine = title.slice(0, splitAt);
                              const secondLine = title.slice(splitAt);

                              return (
                                <>
                                  <span className="inline-block md:mb-1">
                                    {firstLine}
                                  </span>
                                  {secondLine && (
                                    <span className="inline-block">
                                      {secondLine}
                                    </span>
                                  )}
                                </>
                              );
                            })()}
                          </span>
                        </h3>
                        {blog.excerpt && (
                          <p className="text-[#9AA0A6] text-justify whitespace-normal wrap-break-word text-[10px] lg:text-[14px] lg:text-lg font-normal font-poppins">
                            {blog.excerpt}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-row gap-2 lg:gap-12 font-normal lg:font-light font-poppins mt-auto text-[#4C9DFE]">
                        {blog.publishedAt && (
                          <p className="text-[9px] lg:text-[14px] lg:float-left">
                            {new Date(blog.publishedAt).toLocaleDateString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "short", // short = Jan, Feb, Mar
                                year: "numeric",
                              }
                            )}
                          </p>
                        )}

                        {blog.category && (
                          <p className="font-poppins text-[9px] lg:text-[14px] lg:float-left">
                            {blog.category}
                          </p>
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

      {/* --------------------------------------------
          ✅ Pagination dots ONLY on desktop
      -------------------------------------------- */}
      {!loading && !error && blogs.length > 0 && isLargeScreen && (
        <div className="w-full flex justify-center items-center gap-2 mt-8">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button key={i} onClick={() => setCurrentPage(i)}>
              <motion.div
                initial={false}
                animate={{
                  width: i === currentPage ? 16 : 10,
                  height: i === currentPage ? 16 : 10,
                }}
                transition={{ duration: 0.3 }}
                className={`rounded-full ${
                  i === currentPage
                    ? "bg-[linear-gradient(90deg,#3474F5,#4C9DFE)]"
                    : "bg-[#666]"
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

{
  /* Mobile Dots 
          <div className="w-full md:hidden flex justify-center items-center mt-4 gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button key={`mobile-${i}`} onClick={() => setCurrentPage(i)} className="p-0 m-0 bg-transparent border-0 cursor-pointer">
                <motion.div
                  initial={false}
                  animate={{
                    width: i === currentPage ? 24 : 10,
                    height: i === currentPage ? 8 : 10,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className={`rounded-full ${
                    i === currentPage
                      ? "bg-[linear-gradient(90deg,#3474F5_0%,#4C9DFE_100%)] border-none"
                      : "border border-[#9AA0A6] bg-transparent"
                  }`}
                />
              </button>
            ))}
          </div>*/
}
