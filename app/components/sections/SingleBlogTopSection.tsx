import { motion, useScroll, useTransform } from "motion/react";

import { getBlogById, type Blog } from "@/sanity/lib/getBlogs";
import { urlFor } from "@/sanity/lib/image";
import { useRef, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { div, p } from "motion/react-client";



export const SingleBlogTopSection = () => {

  const gradient = `linear-gradient(
    80deg,
    rgba(30,68,143,0) 30%,       /* transparent start */
    #1E448F 40%,                 /* base color begins */
    #4C9DFE 45%,                 /* highlight */
    #1E448F 50%,                 /* base again */
    rgba(30,68,143,0) 65%        /* fade out */
  )`;

  const [blogId, setBlogId] = useState<string | null>(null);
  const [blog, setBlog] = useState<Blog | null>(null);

  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      const segments = pathname.split("/"); 
      const id = segments[2];
      setBlogId(id);
      console.log("blogId from URL:", id);
    }
  }, [pathname]);

  useEffect(() => {
    if (blogId) {
      getBlogById(blogId)
        .then((data) => {
          setBlog(data);
          console.log("Fetched blog:", data);
        })
        .catch((err) => console.error(err));
    }
  }, [blogId]);

 
  return(

    <div className="w-screen ml-0 lg:relative lg:-ml-23 -mt-10 bg-gradient-to-r from-[#000000] to-[#0F2248] bg-gradient-to-b from-[#0F2248] to-[#000008B]relative z-10 flex items-center justify-center h-[690px] [@media(max-width:1300px)]:flex-col [@media(max-width:1300px)]:text-center [@media(max-width:1300px)]:gap-2">
      <div className="absolute inset-0 z-0 pointer-events-none">
          <LogoScroll gradient={gradient} />
      </div>

      <div className="">
        {/*for blog image */}
        <div className="px-2">
          {blog?.mainImage?.asset ? (
            <img
              src={urlFor(blog.mainImage).width(1200).url()} // high-res image
              alt={blog.title}
              className="max-w-[543px] lg:-ml-22 -mt-50 -lg:ml-70 ml-181"
            />
          ) : (
            <p className="text-white">Loading...</p>
          )}
        </div>

        {/*for Blog details */}
        <div className="lg:-mt-90 lg:ml-195 ml-400 -mt-110">
          
            <h1 className="text-5xl  font-[490] text-white lg:-left-[50px] lg:top-[80px] lg:relative [@media(max-width:1300px)]:relative [@media(max-width:1300px)]:top-[480px] [@media(max-width:1300px)]:-left-[800px]">
                {blog?.title}
            </h1>

            <div className="flex flex-row gap-9 lg:-left-[70px] lg:top-[150px] lg:relative [@media(max-width:1300px)]:relative [@media(max-width:1300px)]:top-[490px] [@media(max-width:1300px)]:-left-[800px]">
                <svg
                    className="w-9 h-9 text-[#318AFF]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
                <h5 className="text-[#318AFF]">{blog?.publishedAt ? new Date(blog.publishedAt).toLocaleDateString() : ""}</h5>
                <h5 className="text-[#84B5FF]">{blog?.category}</h5>
                <h5 className="text-[#318AFF]">By {String(blog?.author || "Unknown")}</h5>
            </div>
        </div>
      </div>
    </div>
  );
}



















const LogoScroll = ({ gradient }: { gradient: string }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const bgPosition = useTransform(
    scrollYProgress,
    [0, 1],
    ["0% 50%", "170% 50%"]
  );

  return (
    <div ref={containerRef} className="relative h-[200vh] w-full">
      <div className="h-screen sticky top-0 flex items-center justify-center overflow-hidden">
        <motion.h2
          className="text-center font-[Poppins] 2xl:text-[150px] xl:text-[120px] lg:text-[100px] md:text-[30px] sm:text-[10px] text-[150px] font-semibold leading-[700px] bg-clip-text text-transparent select-none"
          style={{
            backgroundImage: gradient,
            backgroundSize: "300% 100%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: bgPosition,
            WebkitBackgroundClip: "text",
          }}
        >
          CSSL
        </motion.h2>
        <motion.h2
          className="text-center font-[Poppins] 2xl:text-[150px] xl:text-[120px] lg:text-[100px] md:text-[30px] sm:text-[10px] text-[150px] font-semibold leading-[700px] bg-clip-text text-transparent select-none"
          style={{
            backgroundImage: gradient,
            backgroundSize: "300% 100%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: bgPosition,
            WebkitBackgroundClip: "text",
          }}
        >
         BLOG
        </motion.h2>
        <motion.h2
          className="text-center font-[Poppins] 2xl:text-[150px] xl:text-[120px] lg:text-[100px] md:text-[30px] sm:text-[10px] text-[150px] font-semibold leading-[700px] bg-clip-text text-transparent select-none"
          style={{
            backgroundImage: gradient,
            backgroundSize: "300% 100%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: bgPosition,
            WebkitBackgroundClip: "text",
          }}
        >
          CSSL
        </motion.h2>
      </div>
      <div className="-mt-90 h-screen sticky top-0 flex items-center justify-center overflow-hidden">
        <motion.h2
          className="text-center font-[Poppins] 2xl:text-[350px] xl:text-[250px] lg:text-[150px] md:text-[50px] sm:text-[20px] text-[150px] font-semibold leading-[700px] bg-clip-text text-transparent select-none"
          style={{
            backgroundImage: gradient,
            backgroundSize: "300% 100%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: bgPosition,
            WebkitBackgroundClip: "text",
          }}
        >
          CSSL
        </motion.h2>
        <motion.h2
          className="text-center font-[Poppins] 2xl:text-[350px] xl:text-[250px] lg:text-[150px] md:text-[50px] sm:text-[20px] text-[150px] font-semibold leading-[700px] bg-clip-text text-transparent select-none"
          style={{
            backgroundImage: gradient,
            backgroundSize: "300% 100%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: bgPosition,
            WebkitBackgroundClip: "text",
          }}
        >
         BLOG
        </motion.h2>
        <motion.h2
          className="text-center font-[Poppins] 2xl:text-[350px] xl:text-[250px] lg:text-[150px] md:text-[50px] sm:text-[20px] text-[150px] font-semibold leading-[700px] bg-clip-text text-transparent select-none"
          style={{
            backgroundImage: gradient,
            backgroundSize: "300% 100%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: bgPosition,
            WebkitBackgroundClip: "text",
          }}
        >
          CSSL
        </motion.h2>
      </div>
    </div>
  );
};
