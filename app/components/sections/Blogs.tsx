"use client";
import Image from "next/image";
import { Button } from "../shared/Button";
import { Container } from "../shared/Container";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useMemo, useState } from "react";

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
  const heading = "Blogs";
  const description =
    "Exploring trends, ideas, and success stories that shape the future of community and connection.";

  const headingWords = useMemo(() => heading.split(" "), [heading]);
  const descriptionWords = useMemo(() => description.split(" "), [description]);

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
        filter: "brightness(0.15)",
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
        filter: "brightness(0.1)",
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
        <div className="w-full md:h-[30%] h-auto flex flex-col justify-center items-center">
          <h2 className="text-white text-center font-poppins text-[48px] font-medium leading-normal">
            {headingWords.map((word, i) => (
              <motion.span
                key={`heading-word-${i}-${word}`}
                className="inline-block will-change-transform"
                initial={{ y: 10, opacity: 0, filter: "blur(8px)" }}
                whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                viewport={{ amount: 0.01 }}
              >
                {word}
              </motion.span>
            ))}
          </h2>
          <p className="text-[#9AA0A6] font-poppins text-center lg:text-[20px] md:text-[15px] text-[14px] font-normal leading-normal lg:w-1/2 w-full">
            {descriptionWords.map((word, i) => (
              <motion.span
                key={`desc-word-${i}-${word}`}
                className="inline-block will-change-transform"
                initial={{ opacity: 0, filter: "blur(8px)", y: 10 }}
                whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{
                  duration: 0.3,
                  ease: "easeOut",
                  delay: i * 0.025,
                }}
                viewport={{ amount: 0.6 }}
              >
                {word}&nbsp;
              </motion.span>
            ))}
          </p>
          <Button className="mt-10" isSvg text="All blogs" href="/blogs" />
        </div>
        {/* Mobile (below md) */}
        <div className="w-full md:hidden flex flex-col gap-6">
          <motion.div
            className="w-full relative overflow-hidden h-[30vh]"
            initial={{ opacity: 0, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            viewport={{ amount: 0.3 }}
          >
            {blogs.map((blog, index) => (
              <motion.div
                key={`mobile-slide-${index}`}
                className="absolute inset-0"
                initial={false}
                animate={getMobileStyle(index)}
                transition={{ duration: 1, ease: [0.4, 0.0, 0.2, 1] }}
              >
                <div className="w-full h-full relative">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover rounded-3xl"
                    sizes="100vw"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
          <AnimatePresence mode="wait">
            <motion.div
              key={`mobile-info-${blogs[activeIndex]?.title}`}
              initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
              transition={{ duration: 0.35, ease: [0.4, 0.0, 0.2, 1] }}
            >
              <h3 className="text-white font-poppins text-[20px] font-medium leading-snug">
                {blogs[activeIndex]?.title}
              </h3>
              <p className="text-[#9AA0A6] font-poppins text-[15px] font-normal leading-normal mt-1">
                {blogs[activeIndex]?.description}
              </p>
              <p className="text-[#9AA0A6] font-poppins text-[14px] font-normal leading-normal mt-4">
                {blogs[activeIndex]?.readTime} . {blogs[activeIndex]?.date}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Desktop*/}
        <motion.div
          className="w-full hidden md:flex md:flex-row md:justify-start md:items-center h-[70%] relative"
          initial={{ opacity: 0, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          viewport={{ amount: 0.3 }}
        >
          {blogs.map((blog, index) => (
            <motion.div
              key={index}
              className="absolute h-full"
              initial={false}
              animate={getStyle(index)}
              transition={{ duration: 1, ease: [0.4, 0.0, 0.2, 1] }}
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
        </motion.div>
        {/* Desktop pagination controls (moved below cards) */}
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <circle cx="6" cy="6" r="5.5" stroke="#9AA0A6" />
                </svg>
              )}
            </button>
          ))}
        </div>
        {/* Mobile pagination controls */}
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  viewBox="0 0 12 12"
                  fill="none"
                >
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
