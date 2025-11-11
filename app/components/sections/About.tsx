"use client";

import { useState } from "react";
import { Container } from "../shared/Container";
import Image from "next/image";
import { motion } from "motion/react";

export const About = () => {
  const aboutImages: { src?: string; className?: string; alt?: string }[] = [
    {
      src: "/Images/About/img1.jpg",
      className: "object-cover scale-[1.6]",
      alt: "About image 1",
    },
    {
      src: "/Images/About/img2.jpg",
      className: "object-cover scale-[1.6]",
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
      className: "object-cover [transform:scaleX(-1)_scale(1.6)]",
      alt: "About image 3",
    },
    {
      src: "/Images/About/img4.jpg",
      className: "object-cover [transform:scaleX(-1)_scale(1.6)]",
      alt: "About image 4",
    },
  ];

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  return (
    <section className="h-screen flex items-start justify-center bg-black text-white pt-30">
      <Container className="h-full pb-20">
        <div className="w-full h-full flex flex-col items-stretch">
          <motion.h2
            initial={{ opacity: 0, filter: "blur(8px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex items-center justify-start bg-[linear-gradient(87deg,rgba(0,0,0,0)_-1.81%,#0F52B4_15.92%,rgba(17,105,234,0.58)_35.57%,rgba(68,140,246,0.82)_52.17%,rgba(49,138,255,0.82)_77.28%,rgba(25,69,128,0.41)_97.86%,rgba(0,0,0,0)_97.87%)] bg-clip-text text-transparent font-[Poppins] text-[213px] not-italic font-semibold leading-none tracking-[12.65px] flex-1"
          >
            ABOUT US
          </motion.h2>
          <div className="flex px-2.5 justify-between items-start self-stretch flex-1">
            <motion.p
              initial={{ opacity: 0, filter: "blur(8px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.3, ease: "easeOut", delay: 0.15 }}
              className="text-[#afafaf] font-[Poppins] text-[16px] not-italic font-medium leading-[23px] w-[274px]"
            >
              NextGen Tech, Today’s Chapter - CSSL Genz UCSC
            </motion.p>
            <motion.p
              initial={{ opacity: 0, filter: "blur(8px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.3, ease: "easeOut", delay: 0.25 }}
              className="text-[#afafaf] font-[Poppins] text-[16px] not-italic font-medium leading-[23px] w-[274px]"
            >
              CSSL GenZ - UCSC Chapter is the official representation of the
              Computer Society of Sri Lanka at the University of Colombo School
              of Computing.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, filter: "blur(8px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.3, ease: "easeOut", delay: 0.35 }}
              className="text-[#afafaf] font-[Poppins] text-[16px] not-italic font-medium leading-[23px] w-[274px]"
            >
              We strive to empower undergraduates through technology,
              innovation, and collaboration bridging the gap between academia
              and the ICT industry to shape future-ready professionals.
            </motion.p>
          </div>
          <div className="flex justify-between items-end self-stretch flex-1">
            {aboutImages.map((img, i) => (
              <div
                key={i}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`relative bg-gray-500 overflow-hidden transition-all duration-300 ease-out ${
                  hoveredIndex === i
                    ? "w-[180px] h-[180px]"
                    : "w-[150px] h-[150px]"
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
                      sizes="(max-width: 1024px) 25vw, 150px"
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
