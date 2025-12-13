"use client";
import Image from "next/image";
import { Button } from "../shared/Button";
import { Container } from "../shared/Container";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { Blog } from "@/sanity/lib/getBlogs";
import { urlFor } from "@/sanity/lib/image";
import { useRouter } from "next/navigation";

interface BlogsProps {
  blogs?: Blog[];
}

export const Blogs = ({ blogs = [] }: BlogsProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();
  const heading = "Blogs";
  const description =
    "Exploring trends, ideas, and success stories that shape the future of community and connection.";

  const headingWords = useMemo(() => heading.split(" "), [heading]);
  const descriptionWords = useMemo(() => description.split(" "), [description]);

  useEffect(() => {
    if (blogs.length === 0) return;
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % blogs.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [blogs.length]);

  if (!blogs || blogs.length === 0) {
    return null;
  }

  const getImageUrl = (blog: Blog) => {
    return blog.mainImage
      ? urlFor(blog.mainImage).url()
      : "/Images/blogImg1.png";
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  const truncateText = (text: string, wordLimit: number) => {
    if (!text) return "";
    const words = text.split(" ");
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  const handleCardClick = (index: number, blogId: string) => {
    if (index === activeIndex) {
      router.push(`/blogs/${blogId}`);
    } else {
      setActiveIndex(index);
    }
  };

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
        filter: "brightness(1) blur(0px)",
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
        filter: "brightness(0) blur(8px)",
      };
    } else if (relativeIndex === 1) {
      // Next slide
      return {
        width: "33.33%",
        height: "66.66%",
        scale: 1.2,
        x: "125%",
        zIndex: 20,
        filter: "brightness(0.15) blur(8px)",
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
        filter: "brightness(0.1) blur(8px)",
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
        filter: "brightness(0) blur(8px)",
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
        filter: "brightness(1) blur(0px)",
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
        filter: "brightness(0) blur(8px)",
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
        filter: "brightness(0) blur(8px)",
      } as const;
    }
  };

  return (
    <section className="w-full md:h-screen h-auto flex flex-col bg-black pt-10 pb-10 overflow-hidden mb-20 md:mt-50 mt-10">
      <Container className="w-full h-full flex flex-col justify-center items-center gap-15">
        <div className="w-full md:h-[30%] h-auto flex flex-col justify-center items-center">
          <h2 className="text-white text-center font-poppins md:text-[48px] text-3xl font-medium leading-normal">
            {headingWords.map((word, i) => (
              <motion.span
                key={`heading-word-${i}-${word}`}
                className="inline-block will-change-transform"
                initial={{ y: -20, opacity: 0, filter: "blur(8px)" }}
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
                initial={{ opacity: 0, filter: "blur(8px)", y: 25 }}
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
                onClick={() => handleCardClick(index, blog._id)}
              >
                <div className="w-full h-full relative">
                  <Image
                    src={getImageUrl(blog)}
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
                {truncateText(blogs[activeIndex]?.excerpt || "", 10)}
              </p>
              <p className="text-[#9AA0A6] font-poppins text-[14px] font-normal leading-normal mt-4">
                {blogs[activeIndex]?.readTime} .{" "}
                {formatDate(blogs[activeIndex]?.publishedAt)}
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
              className={`absolute h-full ${activeIndex === index ? "cursor-pointer" : ""}`}
              initial={false}
              animate={getStyle(index)}
              transition={{ duration: 1, ease: [0.4, 0.0, 0.2, 1] }}
              onClick={() => handleCardClick(index, blog._id)}
            >
              <motion.div
                className="w-full h-full relative group"
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div
                  className={`absolute -inset-1 rounded-[27px] bg-[linear-gradient(90deg,#1E448F_0%,#4C9DFE_100%)] opacity-0 transition-opacity duration-300 ${activeIndex === index ? "group-hover:opacity-100" : ""}`}
                />
                <div className="relative w-full h-full rounded-3xl overflow-hidden">
                  <Image
                    src={getImageUrl(blog)}
                    alt={blog.title}
                    fill
                    className="object-cover"
                  />
                </div>
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
                        {truncateText(blog.excerpt || "", 10)}
                      </p>
                      <p className="text-[#9AA0A6] font-poppins text-[15px] font-normal leading-normal mt-10">
                        {blog.readTime} . {formatDate(blog.publishedAt)}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
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
              className="p-0 m-0 bg-transparent border-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4C9DFE] rounded flex items-center justify-center"
            >
              <motion.div
                initial={false}
                animate={{
                  width: i === activeIndex ? 52 : 12,
                  height: i === activeIndex ? 11 : 12,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={`rounded-full box-border ${
                  i === activeIndex
                    ? "bg-[linear-gradient(90deg,#3474F5_0%,#4C9DFE_100%)] border-none"
                    : "border border-[#666666] bg-[#666666]"
                }`}
              />
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
              className="p-0 m-0 bg-transparent border-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4C9DFE] rounded flex items-center justify-center"
            >
              <motion.div
                initial={false}
                animate={{
                  width: i === activeIndex ? 36 : 10,
                  height: i === activeIndex ? 8 : 10,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={`rounded-full box-border ${
                  i === activeIndex
                    ? "bg-[linear-gradient(90deg,#3474F5_0%,#4C9DFE_100%)] border-none"
                    : "border border-[#9AA0A6] bg-transparent"
                }`}
              />
            </button>
          ))}
        </div>
      </Container>
    </section>
  );
};
