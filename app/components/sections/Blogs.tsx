"use client";
import Image from "next/image";
import { Button } from "../shared/Button";
import { Container } from "../shared/Container";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const blogs = [
  {
    image: "/Images/blogImg1.png",
    title: "GenZ Launch Event",
    description:
      "The launch event of the CSSL GenZ chapter of University of Colombo School of Computing",
    readTime: "5 min Read",
    date: "Sept 2025",
  },
  {
    image: "/Images/blogImg2.png",
    title: "Second Blog Post",
    description: "Description for the second blog post.",
    readTime: "3 min Read",
    date: "Oct 2025",
  },
  {
    image: "/Images/blogImg3.png",
    title: "Third Blog Post",
    description: "Description for the third blog post.",
    readTime: "7 min Read",
    date: "Nov 2025",
  },
];

export const Blogs = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % blogs.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getStyle = (index: number) => {
    const relativeIndex = (index - activeIndex + blogs.length) % blogs.length;

    if (relativeIndex === 0) {
      // Active slide
      return {
        width: "50%",
        height: "100%",
        opacity: 1,
        scale: 1,
        x: 0,
        zIndex: 30,
      };
    } else if (relativeIndex === blogs.length - 1) {
      // Previous slide, moving out
      return {
        x: "-100%",
        scale: 1.2,
        opacity: 0,
        zIndex: 0,
        width: "50%",
        height: "100%",
      };
    } else if (relativeIndex === 1) {
      // Next slide
      return {
        width: "33.33%",
        height: "66.66%",
        opacity: 0.2,
        scale: 0.8,
        x: "125%",
        zIndex: 20,
      };
    } else if (relativeIndex === 2) {
      // even more next slide
      return {
        width: "33.33%",
        height: "50%",
        opacity: 0.15,
        scale: 0.6,
        x: "175%",
        zIndex: 10,
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
      };
    }
  };

  return (
    <section className="w-full h-screen flex flex-col bg-black pt-30 pb-10 overflow-hidden">
      <Container className="w-full h-full flex flex-col justify-center items-center gap-15">
        <div className="w-full h-[30%] flex flex-col justify-start items-start">
          <h2 className="text-white text-center font-poppins text-[48px] font-medium leading-normal">
            Blogs
          </h2>
          <p className="text-[#9AA0A6] font-poppins text-[24px] font-normal leading-normal w-1/2">
            Exploring trends, ideas, and success stories that shape the future
            of community and connection.
          </p>
          <Button className="mt-auto" isSvg text="All blogs" />
        </div>
        <div className="w-full flex flex-row justify-start items-center h-[70%] relative">
          {blogs.map((blog, index) => (
            <motion.div
              key={index}
              className="absolute h-full"
              initial={false}
              animate={getStyle(index)}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              <div className="w-full h-full relative">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover rounded-3xl"
                />
                <AnimatePresence mode="wait">
                  {activeIndex === index && (
                    <motion.div
                      key={blog.title}
                      className="absolute w-full h-full flex flex-col justify-center items-start pl-20 right-0 top-1/2 -translate-y-1/2 translate-x-full z-10"
                      initial={{ opacity: 0, filter: "blur(10px)" }}
                      animate={{ opacity: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, filter: "blur(10px)" }}
                      transition={{ duration: 0.5 }}
                    >
                      <h2 className="text-white font-poppins text-[24px] font-medium leading-normal">
                        {blog.title}
                      </h2>
                      <p className="text-[#9AA0A6] font-poppins text-[18px] font-normal leading-normal">
                        {blog.description}
                      </p>
                      <p className="text-[#9AA0A6] font-poppins text-[15px] font-normal leading-normal mt-10">
                        {blog.readTime} . {blog.date}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};
