"use client";
import Image from "next/image";
import { Button } from "../shared/Button";
import { Container } from "../shared/Container";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { getBlogById, getBlogs, type Blog } from "@/sanity/lib/getBlogs";
import { urlFor } from "@/sanity/lib/image";




export const BlogsAnimation = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [blogs, setBlogs] = useState<Blog[]>([]);


    useEffect(() => {
        async function fetchData() {
        try {
            const data = await getBlogs(); // <-- using your function
            setBlogs(data);
        } catch (err) {
            console.error("Failed to fetch blogs:", err);
        }
        }

        fetchData();
    }, []);


    useEffect(() => {
        if (!blogs.length) return;

        const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % blogs.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [blogs]);


    if (!blogs.length) {
    return (
      <section className="w-full h-screen flex justify-center items-center text-white">
        Loading blogs...
      </section>
        );
    }


    


    const getStyle = (index: number) => {
        const relativeIndex = (index - activeIndex + blogs.length) % blogs.length;

        if (relativeIndex === 0) {
        // Active slide
        return {
            width: "50%",
            height: "100%",
            scale: 1,
            x: 0,
            zIndex: 30,
            filter: "brightness(1)",
            opacity: 1,
        };
        } else if (relativeIndex === blogs.length - 1) {
        // Previous slide, moving out
        return {
            x: "-100%",
            scale: 1.2,
            opacity: 0,
            zIndex: 50,
            width: "50%",
            height: "100%",
            filter: "brightness(0)",
        };
        } else if (relativeIndex === 1) {
        // Next slide
        return {
            width: "33.33%",
            height: "66.66%",
            scale: 1.2,
            x: "125%",
            zIndex: 20,
            filter: "brightness(0.15)",
            opacity: 1,
        };
        } else if (relativeIndex === 2) {
        // even more next slide
        return {
            width: "33.33%",
            height: "50%",
            scale: 1,
            x: "175%",
            zIndex: 10,
            filter: "brightness(0.1)",
            opacity: 1,
        };
        } else {
        // Slides that are further away
        return {
            width: "25%",
            height: "40%",
            opacity: 0,
            scale: 0.5,
            x: "300%",
            zIndex: 0,
            filter: "brightness(0)",
        };
        }
    };

  // Mobile (below md)
    const getMobileStyle = (index: number) => {
        const relativeIndex = (index - activeIndex + blogs.length) % blogs.length;

        if (relativeIndex === 0) {
        // Active slide
        return {
            width: "100%",
            height: "100%",
            scale: 1,
            y: 0,
            zIndex: 30,
            filter: "brightness(1)",
            opacity: 1,
        } as const;
        } else if (relativeIndex === blogs.length - 1) {
        // Previous slide, moving out upwards
        return {
            y: "-110%",
            scale: 1.2,
            opacity: 0,
            zIndex: 50,
            width: "100%",
            height: "100%",
            filter: "brightness(0)",
        } as const;
        } else if (relativeIndex === 1) {
        // Next slide (peeking below)
        return {
            width: "100%",
            height: "66.66%",
            scale: 1.1,
            y: "115%",
            zIndex: 20,
            filter: "brightness(0.15) blur(8px)",
            opacity: 1,
        } as const;
        } else if (relativeIndex === 2) {
        // Even more next slide (further below)
        return {
            width: "100%",
            height: "50%",
            scale: 1,
            y: "180%",
            zIndex: 10,
            filter: "brightness(0.1) blur(8px)",
            opacity: 1,
        } as const;
        } else {
        // Slides further away
        return {
            width: "100%",
            height: "40%",
            opacity: 0,
            scale: 0.5,
            y: "300%",
            zIndex: 0,
            filter: "brightness(0)",
        } as const;
        }
    };

    

    return (
        <section className="w-full md:h-screen h-auto flex flex-col bg-black pt-10 pb-10 overflow-hidden">
          <Container className="w-full h-full flex flex-col justify-center items-center gap-15">
            
            {/* Mobile */}
            <div className="w-full md:hidden flex flex-col gap-6">
            <motion.div className="w-full relative overflow-hidden h-[30vh]">
                {blogs.map((blog, index) => (
                <motion.div
                    key={`mobile-slide-${index}`}
                    className="absolute inset-0"
                    initial={false}
                    animate={getMobileStyle(index)}
                    transition={{ duration: 1, ease: [0.4, 0.0, 0.2, 1] }}
                >
                    <div className="w-full h-full relative">
                        {blog.mainImage?.asset && (
                        <Image
                            src={urlFor(blog.mainImage).width(1200).height(800).url()}
                            alt={blog.title}
                            fill
                            className="object-cover rounded-3xl"
                        />
                        )}
                    </div>
                </motion.div>
                ))}
            </motion.div>
            <AnimatePresence mode="wait">
                <motion.div
                key={`mobile-info-${blogs[activeIndex]?._id}`}
                initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
                transition={{ duration: 0.35, ease: [0.4, 0.0, 0.2, 1] }}
                >
                
                <Button className="mt-5" isSvg text="Featured" href="/blogs" />

                <h3 className="mt-8 text-white font-poppins text-[20px] font-medium leading-snug">
                    {blogs[activeIndex].title}
                </h3>
                <p className="mt-5 text-[#9AA0A6] font-poppins text-[15px] font-normal leading-normal mt-1">
                    {blogs[activeIndex]?.excerpt}
                </p>
                <div className="flex flex-row gap-13">
                    <p className="text-[#007FFF] font-poppins text-[18px] font-normal leading-normal">
                        {blogs[activeIndex]?.category}
                    </p>
                    <p className="text-[#9AA0A6] font-poppins text-[15px] font-normal leading-normal">
                        <span className="text-[#9AA0A6]">By </span><span className="text-[#0080FF]">{blogs[activeIndex].author?.name || "Unknown"}</span>
                    </p>
                    <p className="text-[#9AA0A6] font-poppins text-[14px] font-normal leading-normal">
                        {blogs[activeIndex]?.readTime} . {blogs[activeIndex].publishedAt? new Date(blogs[activeIndex].publishedAt).toLocaleDateString(): ""}
                    </p>
                </div>
                </motion.div>
            </AnimatePresence>
            </div>

            {/* Desktop */}
            <motion.div className="w-full hidden md:flex md:flex-row md:justify-start md:items-center h-[70%] relative">
            {blogs.map((blog, index) => (
                <motion.div
                key={blog._id}
                className="absolute h-full"
                initial={false}
                animate={getStyle(index)}
                transition={{ duration: 1, ease: [0.4, 0.0, 0.2, 1] }}
                >
                <div className="w-full h-full relative">
                    {blog.mainImage?.asset ? (
                    <Image
                        src={urlFor(blog.mainImage).width(1200).height(800).url()}
                        alt={blog.title}
                        fill
                        className="object-cover rounded-3xl"
                    />
                    ) : (
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center text-white">
                        No Image
                    </div>
                    )}
                    <AnimatePresence mode="wait">
                    {activeIndex === index && (
                        <motion.div
                        key={blog._id}
                        className="absolute w-full h-full flex flex-col justify-center items-start pl-20 right-0 top-1/2 -translate-y-1/2 translate-x-full z-10"
                        initial={{ opacity: 0, filter: "blur(10px)" }}
                        animate={{ opacity: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, filter: "blur(10px)" }}
                        transition={{ duration: 0.5 }}
                        >
                        <Button className="mt-10" text="Featured" href="/blogs" />
                        
                        <h2 className="mt-7 text-white font-poppins text-[24px] font-medium leading-normal">
                            {blog.title}
                        </h2>
                        <p className="mt-7 text-[#9AA0A6] font-poppins text-[18px] font-normal leading-normal">
                            {blog.excerpt}
                        </p>
                        <p className="mt-7 text-[#007FFF] font-poppins text-[18px] font-normal leading-normal">
                                {blog.category}
                        </p>
                        <div className="mt-7 flex flex-row gap-13">
                            <p className="font-poppins text-[15px] font-normal leading-normal">
                                By <span className="text-[#0080FF] ml-3 mr-1">{String(blog?.author || "Unknown")}</span>
                            </p>
                            <p className="text-[#9AA0A6] font-poppins text-[15px] font-normal leading-normal">
                                {blog.readTime}.
                            
                                {blog.publishedAt
                                ? new Date(blog.publishedAt).toLocaleDateString()
                                : ""}
                            </p>
                        </div>
                        </motion.div>
                    )}
                    </AnimatePresence>
                </div>
                </motion.div>
            ))}
            </motion.div>

            {/* Pagination controls */}
            <div className="w-full hidden md:flex justify-center items-center gap-2 self-start">
            {blogs.map((b, i) => (
                <button
                key={`desktop-pager-${i}`}
                type="button"
                aria-label={`Go to slide ${i + 1}: ${b.title}`}
                onClick={() => setActiveIndex(i)}
                className="p-0 m-0 bg-transparent border-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4C9DFE] rounded"
                >
                {i === activeIndex ? (
                    <div className="rounded-[10px] bg-[linear-gradient(90deg,#3474F5_0%,#4C9DFE_100%)] w-[52px] h-[11px]" />
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <circle cx="6" cy="6" r="5.5" stroke="#9AA0A6" />
                    </svg>
                )}
                </button>
            ))}
            </div>

            <div className="w-full md:hidden flex justify-center items-center mt-4 gap-2">
            {blogs.map((b, i) => (
                <button
                key={`mobile-pager-${i}`}
                type="button"
                aria-label={`Go to slide ${i + 1}: ${b.title}`}
                onClick={() => setActiveIndex(i)}
                className="p-0 m-0 bg-transparent border-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4C9DFE] rounded"
                >
                {i === activeIndex ? (
                    <div className="rounded-[10px] bg-[linear-gradient(90deg,#3474F5_0%,#4C9DFE_100%)] w-9 h-2" />
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <circle cx="6" cy="6" r="5.5" stroke="#9AA0A6" />
                    </svg>
                )}
                </button>
            ))}
            </div>
          </Container>
        </section>
   );
};