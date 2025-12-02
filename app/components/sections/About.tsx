"use client";

import { useState } from "react";
import { Container } from "../shared/Container";
import Image from "next/image";
import { motion } from "motion/react";
import { PageTitle } from "../shared/PageTitle";

export const About = () => {
  const aboutImages: { src?: string; className?: string; alt?: string }[] = [
    {
      src: "/Images/About/img1.jpg",
      className: "object-cover scale-[1.6] sm:block hidden",
      alt: "About image 1",
    },
    {
      src: "/Images/About/img2.jpg",
      className: "object-cover scale-[1.6] sm:block hidden",
      alt: "About image 2",
    },
    {
      src: "/Images/About/img3.jpg",
      className: "object-cover scale-[1.6]",
      alt: "About image 3",
    },
    {
      src: "/Images/About/img4.jpg",
      className: "object-cover scale-[1.6]",
      alt: "About image 4",
    },
    {
      src: "/Images/About/img1.jpg",
      className: "object-cover [transform:scaleX(-1)_scale(1.6)]",
      alt: "About image 1",
    },
    {
      src: "/Images/About/img2.jpg",
      className: "object-cover [transform:scaleX(-1)_scale(1.6)]",
      alt: "About image 2",
    },
    {
      src: "/Images/About/img3.jpg",
      className:
        "object-cover [transform:scaleX(-1)_scale(1.6)] sm:block hidden",
      alt: "About image 3",
    },
    {
      src: "/Images/About/img4.jpg",
      className:
        "object-cover [transform:scaleX(-1)_scale(1.6)] sm:block hidden",
      alt: "About image 4",
    },
    {
      src: "/Images/About/img4.jpg",
      className:
        "object-cover [transform:scaleX(-1)_scale(1.6)] sm:block hidden",
      alt: "About image 4",
    },
    {
      src: "/Images/About/img4.jpg",
      className:
        "object-cover [transform:scaleX(-1)_scale(1.6)] sm:block hidden",
      alt: "About image 4",
    },
  ];

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  return (
    <section className="h-screen flex items-start justify-center bg-black text-white sm:pt-30 pt-20">
      <Container className="h-full pb-20">
        <div className="w-full h-full flex flex-col sm:items-stretch ">
          <PageTitle
            text="ABOUT"
            className="lg:text-[213px] md:text-[125px] sm:text-[100px] text-[60px]"
          />
          <div className="flex px-2.5 justify-between items-start self-stretch flex-1">
            <motion.p
              initial={{ opacity: 0, filter: "blur(8px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.3, ease: "easeOut", delay: 0.15 }}
              className="text-[#afafaf] font-[Poppins] sm:text-[16px] text-[12px] not-italic font-medium sm:leading-[23px] leading-4 sm:w-[274px] w-[200px]"
            >
              NextGen Tech, Today’s Chapter - CSSL Genz UCSC
            </motion.p>
            <motion.p
              initial={{ opacity: 0, filter: "blur(8px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.3, ease: "easeOut", delay: 0.25 }}
              className="text-[#afafaf] font-[Poppins] sm:text-[16px] text-[12px] not-italic font-medium sm:leading-[23px] leading-4 sm:w-[274px] w-[200px]"
            >
              CSSL GenZ - UCSC Chapter is the official representation of the
              Computer Society of Sri Lanka at the University of Colombo School
              of Computing.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, filter: "blur(8px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.3, ease: "easeOut", delay: 0.35 }}
              className="text-[#afafaf] font-[Poppins] text-[16px] not-italic font-medium leading-[23px] sm:w-[274px] w-[200px] sm:block hidden"
            >
              We strive to empower undergraduates through technology,
              innovation, and collaboration bridging the gap between academia
              and the ICT industry to shape future-ready professionals.
            </motion.p>
          </div>
          <div className="grid grid-cols-2 gap-4 w-full mx-auto sm:max-w-none sm:flex sm:justify-between sm:items-end sm:self-stretch sm:flex-1">
            {aboutImages.map((img, i) => (
              <div
                key={i}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`relative bg-gray-500 overflow-hidden transition-all duration-300 ease-out aspect-square ${
                  // Show only the middle 4 images (indices 2, 3, 4, 5) on mobile
                  i < 2 || i > 5 ? "hidden sm:block" : "block"
                } ${
                  // Only change wrapper size on hover for sm and up; mobile uses the grid cell size
                  hoveredIndex === i ? "sm:w-[180px]" : "sm:w-[150px]"
                }`}
              >
                {img.src ? (
                  <motion.div
                    initial={{ opacity: 0, filter: "blur(8px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{
                      duration: 0.35,
                      ease: "easeOut",
                      delay: 0.3 + i * 0.06,
                    }}
                    className="absolute inset-0 transition-transform duration-300 ease-out"
                    style={{
                      transform:
                        hoveredIndex === i ? "scale(0.625)" : "scale(1)",
                    }}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt ?? `About image ${i + 1}`}
                      fill
                      className={`w-full h-full object-cover ${
                        hoveredIndex === i ? "grayscale-0" : "grayscale"
                      } transition-all duration-200 ${img.className ?? ""}`}
                      sizes="(max-width: 640px) 50vw, 150px"
                      priority={i < 2}
                    />
                  </motion.div>
                ) : null}
                <div
                  className={`absolute inset-0 bg-[#133769] mix-blend-color z-10 ${
                    hoveredIndex === i ? "opacity-0" : "opacity-100"
                  }`}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
