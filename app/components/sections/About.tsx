"use client";

import { useState } from "react";
import { Container } from "../shared/Container";
import Image from "next/image";

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
          <h2 className="flex items-center justify-start text-(--lightBlue,#3774CB) font-[Poppins] text-[213px] not-italic font-medium leading-none tracking-[10.65px] flex-1">
            ABOUT
          </h2>
          <div className="flex px-2.5 justify-between items-start self-stretch flex-1">
            <p className="text-[#E0E0E0] font-[Poppins] text-[16px] not-italic font-medium leading-[23px] w-[274px]">
              An initiative dedicated to empowering the next generation of IT
              professionals
            </p>
            <p className="text-[#E0E0E0] font-[Poppins] text-[16px] not-italic font-medium leading-[23px] w-[274px]">
              Founded in 2025
            </p>
            <p className="text-[#E0E0E0] font-[Poppins] text-[16px] not-italic font-medium leading-[23px] w-[274px]">
              CSSL GenZ Chapter of UCSC
            </p>
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
                  <div
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
                  </div>
                ) : null}
                <div
                  className={`absolute inset-0 bg-[#3774CB] mix-blend-color z-10 ${
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
