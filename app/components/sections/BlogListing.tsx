"use client";

import { motion } from "motion/react";
import { PageTitle } from "../shared/PageTitle";
import { DisplayBlogs } from "./DisplayBlogs";
import { type Blog } from "@/sanity/lib/getBlogs";

interface BlogListingProps {
  initialBlogs: Blog[];
}

export const BlogListing = ({ initialBlogs }: BlogListingProps) => {
  return (
    <section className="pt-35 lg:px-23 relative h-full w-full bg-black flex flex-col gap-0">
      <div className="w-full flex flex-col sm:items-stretch mb-10">
        <PageTitle
          text="BLOGS"
          className="lg:text-[213px] md:text-[125px] sm:text-[100px] text-[60px]"
        />
        <div className="flex px-2.5 justify-between items-start self-stretch">
          <motion.p
            initial={{ opacity: 0, filter: "blur(8px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.3, ease: "easeOut", delay: 0.15 }}
            className="text-[#afafaf] font-[Poppins] sm:text-[16px]  text-[12px] not-italic font-medium sm:leading-[23px] leading-4 sm:w-[474px] w-[200px]"
          >
            Exploring trends, ideas, and success stories that shape the future
            of community and connection.
          </motion.p>
        </div>
      </div>

      <DisplayBlogs initialBlogs={initialBlogs} />
    </section>
  );
};
