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
    <div className="w-full max-w-full overflow-x-hidden max-h-[505px] md:max-h-[360px] lg:max-h-[650px] lg:max-w-[1685px] bg-[linear-gradient(75.37deg,#000000_-4.05%,#0F2248_74.48%,#1E448F_107.82%)] relative z-10 flex -mt-[36px]">


      <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-[#0F2248] to-[#000000]" />
      
      <div className="lg:inset-0 lg:z-0 lg:pointer-events-none hidden md:inline md:h-max md:ml-80 md:-mt-80">
          <LogoScroll gradient={gradient} />
      </div>

        <div className="z-10 md:mt-9 md:grid md:grid-cols-2 md:gap-15 md:mb-28 md:-ml-207 lg:relative lg:-left-[840px] lg:mt-32 lg:gap-200">
          {/*for blog image */}
          <div className="px-2">
            {blog?.mainImage?.asset ? (
              <Image
                src={urlFor(blog.mainImage).width(1200).url()} // high-res image
                alt={blog.title}
                width={1200} // required
                height={800}
                className="max-w-[333px] h-[200px] min-[430px]:ml-9 min-[480px]:ml-13 ml-2 mt-6
                          shadow-[0px_4px_4px_6px_rgba(0,0,0,0.79)] md:shadow-none lg:min-h-[368px] lg:min-w-[607px]"
              />
            ) : (
              <p className="text-white">Loading...</p>
            )}
          </div>

          {/*for Blog details */}
          <div className="text-center w-screen  md:max-h-[130px] md:w-max md:mt-14 lg:min-w-[500px] lg:min-h-[250px]">
            <h1 className="mt-3 md:-ml-23 text-center font-[Poppins] font-medium  text-[22px] md:text-[50px] lg:text-[52px] tracking-normal text-white  lg:relative ">
                <span className="inline-block text-center">
                  {(() => {
                    const title = blog?.title || "";
                    const splitAt = blog?.titleSplitCharCount || 7; 
                    const firstLine = title.slice(0, splitAt);
                    const secondLine = title.slice(splitAt);

                    return (
                      <>
                        <span className="block md:mb-3">{firstLine}</span>
                        {secondLine && (
                          <span className="block max-w-[75%] mx-auto md:mx-0 lg:mt-3">{secondLine}</span>
                        )}
                      </>
                    );
                  })()}
                </span>
            </h1>

            <div className="mt-3 md:mt-7 flex flex-row gap-5 lg:mt-19 lg:-ml-1 lg:gap-17 w-max mx-auto text-center text-xs md:text-[24px]">
              <svg
                className="w-9 h-9 text-[#318AFF]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              <h5 className="text-[#318AFF]">
                {blog?.publishedAt
                ? new Date(blog.publishedAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                : ""}
              </h5>
              <h5 className="text-[#84B5FF]">.{blog?.category}</h5>
              <h5 className="text-[#318AFF]">
                By {String(blog?.author || "Unknown")}
              </h5>
            </div>
          </div>
        </div>
    </div>
  );
};













const LogoScroll = ({ gradient }: { gradient: string }) => {
  return (
    <div className="md:mt-100 lg:mt-120 md:-ml-82 relative w-screen overflow-hidden">
      <div className="md:mb-0 max-h-[200px] top-0 flex md:gap-10 items-center justify-center overflow-hidden">
        <h2
          className="text-center font-[Poppins] 2xl:text-[180px] xl:text-[120px] lg:text-[95px] md:text-[95px] sm:text-[10px] text-[80px] font-semibold  bg-clip-text text-transparent select-none"
          style={{
            backgroundImage: gradient,
            backgroundSize: "300% 100%",
            backgroundRepeat: "no-repeat",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          CSSL
        </h2>
        <h2
          className="text-center font-[Poppins] 2xl:text-[180px] xl:text-[120px] lg:text-[95px] md:text-[95px] sm:text-[10px] text-[80px] font-semibold  bg-clip-text text-transparent select-none"
          style={{
            backgroundImage: gradient,
            backgroundSize: "300% 100%",
            backgroundRepeat: "no-repeat",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          BLOG
        </h2>
        <h2
          className="text-center font-[Poppins] 2xl:text-[180px] xl:text-[120px] lg:text-[95px] md:text-[95px] sm:text-[10px] text-[80px] font-semibold  bg-clip-text text-transparent select-none"
          style={{
            backgroundImage: gradient,
            backgroundSize: "300% 100%",
            backgroundRepeat: "no-repeat",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          CSSL
        </h2>
      </div>
      <div className="md:mt-3 lg:mt-0 max-h-[2200px] lg:max-h-[310px]  top-0 flex md:gap-5 lg:gap-39 items-center justify-center overflow-hidden">
        <h2
          className="text-center font-[Poppins] 2xl:text-[280px] xl:text-[250px] lg:text-[150px] md:text-[170px] sm:text-[20px] text-[150px] font-semibold  bg-clip-text text-transparent select-none"
          style={{
            backgroundImage: gradient,
            backgroundSize: "300% 100%",
            backgroundRepeat: "no-repeat",
            
            WebkitBackgroundClip: "text",
          }}
        >
          CSSL
        </h2>
        <h2
          className="text-center font-[Poppins] 2xl:text-[280px] xl:text-[250px] lg:text-[150px] md:text-[170px] sm:text-[20px] text-[150px] font-semibold bg-clip-text text-transparent select-none"
          style={{
            backgroundImage: gradient,
            backgroundSize: "300% 100%",
            backgroundRepeat: "no-repeat",

            WebkitBackgroundClip: "text",
          }}
        >
          BLOG
        </h2>
        <h2
          className="text-center font-[Poppins] 2xl:text-[280px] xl:text-[250px] lg:text-[150px] md:text-[170px] sm:text-[20px] text-[150px] font-semibold bg-clip-text text-transparent select-none"
          style={{
            backgroundImage: gradient,
            backgroundSize: "300% 100%",
            backgroundRepeat: "no-repeat",

            WebkitBackgroundClip: "text",
          }}
        >
          CSSL
        </h2>
      </div>
    </div>
  );
};