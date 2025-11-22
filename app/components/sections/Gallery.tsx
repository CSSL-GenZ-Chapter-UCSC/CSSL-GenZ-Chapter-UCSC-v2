"use client";

import { useRef, memo, useMemo } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "motion/react";
import Image from "next/image";

// Gallery configuration - easy to modify
const GALLERY_CONFIG = {
  // Two separate texts
  text1:
    "Sri Lanka’s leading ICT body empowering innovation, professionalism, and future talent",
  text2:
    "The CSSL GenZ Chapter at UCSC is a student-driven initiative under the Computer Society of Sri Lanka, dedicated to empowering the next generation of IT innovators and leaders. Guided by Dr. Roshan Rajapaksha and supported by Dr. Manjusri Wickramasinghe, the chapter provides UCSC undergraduates with a platform to explore technology, develop practical skills, and unleash their creativity",
  // Images array
  images: [
    {
      src: "/Images/About/vision1.jpg",
      alt: "CSSL GenZ Chapter Team",
    },
    {
      src: "/Images/About/vision2.jpg",
      alt: "CSSL GenZ Chapter Event",
    },
    {
      src: "/Images/About/vision4.jpg",
      alt: "CSSL Learning Sessions",
    },
  ],
};

export const Gallery = () => {
  const containerRef = useRef(null);

  // Calculate total height needed for all slides - each slide needs scroll distance
  const totalSlides = GALLERY_CONFIG.images.length;
  const heightMultiplier = totalSlides + 1; // Extra space for smooth transitions

  // Scroll progress for the entire section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const { scrollYProgress: enterProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"],
  });

  const smoothedEnterProgress = useSpring(enterProgress, {
    stiffness: 100,
    damping: 20,
    restDelta: 0.001,
  });

  const width = useTransform(smoothedEnterProgress, [0, 1], ["100%", "50%"]);

  return (
    <section
      ref={containerRef}
      style={{
        height: `${heightMultiplier * 100}vh`,
      }}
      className="relative bg-black"
    >
      {/* Sticky container that stays in place */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="relative h-full flex items-center">
          {/* Left Side - Stacked Images */}
          <motion.div
            style={{ width: width }}
            className="absolute left-0 top-0 h-full z-50"
          >
            <motion.div className="relative w-full h-full">
              {GALLERY_CONFIG.images.map((image, slideIndex) => (
                <GalleryImage
                  key={slideIndex}
                  image={image}
                  slideIndex={slideIndex}
                  totalSlides={totalSlides}
                  scrollYProgress={scrollYProgress}
                />
              ))}
              {/* Inner shadow overlay to simulate right side casting shadow */}
              <div className="absolute inset-0 z-10 pointer-events-none shadow-[inset_-50px_0_50px_-10px_rgba(0,0,0,0.2)]" />
            </motion.div>
          </motion.div>

          {/* Right Side - Gradient Background with Two Texts */}
          <div className="absolute right-0 top-0 w-1/2 h-full z-0">
            {/* <div className="absolute inset-0 z-0">
              <Image
                fill
                src="/Images/bgImg.jpg"
                alt="bgImage"
                className="object-fill"
              />
            </div> */}
            <div className="relative w-full h-full z-50">
              <GalleryTexts
                text1={GALLERY_CONFIG.text1}
                text2={GALLERY_CONFIG.text2}
                scrollYProgress={scrollYProgress}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Two texts component - one at top-left, one at bottom-right
const GalleryTexts = memo(
  ({
    text1,
    text2,
    scrollYProgress,
  }: {
    text1: string;
    text2: string;
    scrollYProgress: MotionValue<number>;
  }) => {
    const text1Words = useMemo(() => text1.split(" "), [text1]);
    const text2Words = useMemo(() => text2.split(" "), [text2]);

    return (
      <div className="absolute inset-0 flex flex-col justify-between p-8">
        {/* Text 1 - Top Left */}
        <div className="relative z-20 w-1/2">
          <h2 className="font-poppins text-[31px] font-medium leading-[37px]">
            {text1Words.map((word: string, index: number) => {
              const start = 0.1 + (index / text1Words.length) * 0.4;
              return (
                <WordReveal
                  key={`text1-${index}`}
                  word={word}
                  start={start}
                  scrollYProgress={scrollYProgress}
                />
              );
            })}
          </h2>
        </div>

        {/* Text 2 - Bottom Right */}
        <div className="relative z-20 w-2/3 self-end text-right">
          <h2 className="text-right font-poppins text-[18px] font-medium leading-[26px] text-gray-300">
            {text2Words.map((word: string, index: number) => {
              const start = 0.5 + (index / text2Words.length) * 0.4;
              return (
                <WordReveal
                  key={`text2-${index}`}
                  word={word}
                  start={start}
                  scrollYProgress={scrollYProgress}
                />
              );
            })}
          </h2>
        </div>
      </div>
    );
  }
);

GalleryTexts.displayName = "GalleryTexts";

// Word reveal component with CSS variable based opacity
const WordReveal = memo(
  ({
    word,
    start,
    scrollYProgress,
  }: {
    word: string;
    start: number;
    scrollYProgress: MotionValue<number>;
  }) => {
    const opacity = useTransform(
      scrollYProgress,
      [start, start + 0.05],
      [0.2, 1]
    );

    return (
      <motion.span style={{ opacity }} className="inline-block mr-2 md:mr-3">
        {word}
      </motion.span>
    );
  }
);

WordReveal.displayName = "WordReveal";

// Gallery Image Component - Cards that slide up and stack
const GalleryImage = memo(
  ({
    image,
    slideIndex,
    totalSlides,
    scrollYProgress,
  }: {
    image: { src: string; alt: string };
    slideIndex: number;
    totalSlides: number;
    scrollYProgress: MotionValue<number>;
  }) => {
    // Calculate progress range for this slide
    const slideStart = slideIndex / totalSlides;
    const slideEnd = (slideIndex + 1) / totalSlides;

    // Card slides up from bottom
    const cardY = useTransform(
      scrollYProgress,
      [slideStart - 0.05, slideStart + 0.1],
      slideIndex === 0 ? ["0%", "0%"] : ["100%", "0%"]
    );

    // Scale effect - scales down from 1.1 to 1 as it goes out
    const scale = useTransform(
      scrollYProgress,
      [slideEnd - 0.05, slideEnd + 0.1],
      [1.1, 1]
    );

    // Determine visibility based on scroll progress to optimize rendering
    const display = useTransform(scrollYProgress, (progress) => {
      const currentSlide = Math.round(progress * totalSlides);
      // Only show the current slide and the one immediately before it
      if (slideIndex >= currentSlide - 1) {
        return "block";
      }
      return "none";
    });

    return (
      <motion.div
        style={{
          y: cardY,
          zIndex: slideIndex,
          display,
        }}
        className="absolute inset-0 w-full h-full overflow-hidden group will-change-transform"
      >
        <motion.div
          style={{ scale: slideIndex === totalSlides - 1 ? 1.1 : scale }}
          className="relative w-full h-full will-change-transform"
        >
          <div className="relative w-full h-full">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-200 brightness-80"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={slideIndex === 0}
            />
            <div className="absolute w-full h-full bg-[#133769] mix-blend-color z-10 opacity-100 group-hover:opacity-0 transition-opacity duration-200"></div>
          </div>
        </motion.div>
      </motion.div>
    );
  }
);

GalleryImage.displayName = "GalleryImage";
