"use client";

import { type Blog } from "@/sanity/lib/getBlogs";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

interface SingleBlogTopSectionProps {
  blog: Blog | null;
}

export const SingleBlogTopSection = ({ blog }: SingleBlogTopSectionProps) => {
  const gradient = `linear-gradient(
    80deg,
    #00000000 0%,
    #0D182818 9.42%,
    #437ED380 50%,
    #0C4DAC80 50%,
    #318AFF80 50%,
    #3B489F00 100%
  )`;

  return (
    <div className="relative w-full min-h-[500px] lg:min-h-[650px] bg-[linear-gradient(75.37deg,#000000_-4.05%,#0F2248_74.48%,#1E448F_107.82%)] overflow-hidden flex items-center py-12 lg:py-0">
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-linear-to-l from-[#0F2248] to-[#000000]" />

      {/* Background Logo Text */}
      <div className="absolute inset-0 z-0 pointer-events-none hidden md:block">
        <LogoScroll gradient={gradient} />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center gap-8 lg:gap-16">
        {/* Blog Image */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          {blog?.mainImage?.asset ? (
            <div className="relative w-full max-w-[500px] lg:max-w-[600px] aspect-4/3 md:aspect-square lg:aspect-4/3 overflow-hidden shadow-2xl">
              <Image
                src={urlFor(blog.mainImage).width(1200).url()}
                alt={blog.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          ) : (
            <div className="w-full max-w-[500px] aspect-4/3 bg-gray-800 animate-pulse rounded-lg" />
          )}
        </div>

        {/* Blog Details */}
        <div className="w-full md:w-1/2 text-left">
          <h1 className="font-[Poppins] font-medium text-[28px] md:text-[34px] lg:text-[52px] leading-tight text-white mb-6">
            {blog?.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm md:text-base lg:text-[18px]">
            <div className="flex items-center gap-2 text-[#318AFF]">
              <span className="font-poppins">
                -{" "}
                {blog?.publishedAt
                  ? new Date(blog.publishedAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                  : ""}
              </span>
            </div>

            <span className="text-[#84B5FF] font-poppins">
              - {blog?.category?.title || ""}
            </span>

            <span className="text-[#318AFF] font-poppins">
              - By {blog?.author?.name || "Unknown"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const LogoScroll = ({ gradient }: { gradient: string }) => {
  return (
    <div className="relative w-full h-full overflow-hidden flex flex-col items-center justify-center opacity-30">
      <div className="flex gap-10 items-center whitespace-nowrap">
        <h2
          className="text-center font-[Poppins] lg:text-[125px] md:text-[75px] text-[80px] font-semibold bg-clip-text text-transparent select-none"
          style={{
            backgroundImage: gradient,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          CSSL
        </h2>
        <h2
          className="text-center font-[Poppins] lg:text-[125px] md:text-[75px] text-[80px] font-semibold bg-clip-text text-transparent select-none"
          style={{
            backgroundImage: gradient,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          BLOG
        </h2>
        <h2
          className="text-center font-[Poppins] lg:text-[125px] md:text-[75px] text-[80px] font-semibold bg-clip-text text-transparent select-none"
          style={{
            backgroundImage: gradient,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          CSSL
        </h2>
      </div>
      <div className="flex gap-25">
        <h2
          className="text-center font-[Poppins] lg:text-[295px] md:text-[115px] text-[80px] font-semibold bg-clip-text text-transparent select-none"
          style={{
            backgroundImage: gradient,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          CSSL
        </h2>
        <h2
          className="text-center font-[Poppins] lg:text-[295px] md:text-[115px] text-[80px] font-semibold bg-clip-text text-transparent select-none"
          style={{
            backgroundImage: gradient,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          BLOG
        </h2>
        <h2
          className="text-center font-[Poppins] lg:text-[295px] md:text-[115px] text-[80px] font-semibold bg-clip-text text-transparent select-none"
          style={{
            backgroundImage: gradient,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          CSSL
        </h2>
      </div>
    </div>
  );
};
