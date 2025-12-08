"use client";

import { useRef, memo, useMemo, useState, useEffect } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import Image from "next/image";

// Gallery configuration - easy to modify
const GALLERY_CONFIG = {
  // Two separate texts
  text1:
    "Sri Lanka’s leading ICT body empowering innovation, professionalism, and future talent",
  text2:
    "The CSSL GenZ Chapter at UCSC is a student-led initiative that empowers future IT innovators. Guided by Dr. Roshan Rajapaksha and supported by Dr. Manjusri Wickramasinghe, it gives undergraduates a platform to explore tech, build skills, and be creative",
  text2Mobile:
    "A student-led initiative at UCSC empowering future IT innovators to explore tech, build skills, and be creative.",
  images: [
    {
      src: "/Images/gallery4.jpg",
      alt: "CSSL GenZ Chapter Team",
    },
    {
      src: "/Images/gallery5.jpg",
      alt: "CSSL GenZ Chapter Event",
    },
    {
      src: "/Images/gallery6.jpg",
      alt: "CSSL Learning Sessions",
    },
  ],
};

export const Gallery = () => {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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

  const { scrollYProgress: exitProgress } = useScroll({
    target: containerRef,
    offset: ["end end", "end start"],
  });

  // Optimization: Use scaleX instead of width to avoid layout thrashing (GPU friendly)
  const widthScale = useTransform(
    [enterProgress, exitProgress],
    ([enter, exit]: number[]) => 1 - 0.5 * enter + 0.5 * exit
  );

  // Inverse scale for children to maintain aspect ratio
  const inverseScale = useTransform(widthScale, (s) => 1 / s);
  const staticOne = useTransform(widthScale, () => 1);

  return (
    <section
      ref={containerRef}
      style={{
        height: `${heightMultiplier * 100}vh`,
      }}
      className="relative bg-black"
    >
      {/* Sticky container that stays in place */}
      <motion.div className="sticky top-0 h-screen overflow-hidden">
        <div className="relative h-full flex items-center">
          {/* Left Side - Stacked Images */}
          <motion.div
            style={{
              scaleX: isMobile ? 1 : widthScale,
              scaleY: isMobile ? widthScale : 1,
              originX: isMobile ? 0.5 : 0,
              originY: isMobile ? 0 : 0.5,
            }}
            className="absolute left-0 top-0 md:h-full z-50 md:w-full w-full h-full overflow-hidden will-change-transform"
          >
            <motion.div className="relative w-full h-full">
              {GALLERY_CONFIG.images.map((image, slideIndex) => (
                <GalleryImage
                  key={slideIndex}
                  image={image}
                  slideIndex={slideIndex}
                  totalSlides={totalSlides}
                  scrollYProgress={scrollYProgress}
                  inverseScaleX={isMobile ? staticOne : inverseScale}
                  inverseScaleY={isMobile ? inverseScale : staticOne}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Gradient Background with Two Texts */}
          <div className="absolute right-0 md:top-0 bottom-0 md:w-1/2 w-full md:h-full h-1/2 z-0">
            {/* <div className="absolute inset-0 mb-20 z-0">
              <Image
                fill
                src="/Images/bgImg.jpg"
                alt="bgImage"
                className="object-fill"
                loading="lazy"
              />
            </div> */}
            <div className="relative w-full h-full z-50">
              <GalleryTexts
                text1={GALLERY_CONFIG.text1}
                text2={
                  isMobile ? GALLERY_CONFIG.text2Mobile : GALLERY_CONFIG.text2
                }
                images={GALLERY_CONFIG.images}
                scrollYProgress={scrollYProgress}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

// Two texts component - one at top-left, one at bottom-right
const GalleryTexts = memo(
  ({
    text1,
    text2,
    images,
    scrollYProgress,
  }: {
    text1: string;
    text2: string;
    images: { src: string; alt: string }[];
    scrollYProgress: MotionValue<number>;
  }) => {
    const text1Words = useMemo(() => text1.split(" "), [text1]);
    const text2Words = useMemo(() => text2.split(" "), [text2]);

    return (
      <div className="absolute inset-0 flex flex-col justify-between md:p-8 p-2">
        {/* Text 1 - Top Left */}
        <div className="relative z-20 md:w-1/2 w-full">
          <h2 className="font-poppins md:text-[31px] text-2xl font-medium md:leading-[37px] leading-[30px]">
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

        <div className="relative z-20 bg-gray-600 w-[350px] h-[250px] self-center overflow-hidden md:block hidden">
          {images.map((image, index) => (
            <RightImage
              key={index}
              image={image}
              index={index}
              totalSlides={images.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

        {/* Text 2 - Bottom Right */}
        <div className="relative z-20 md:w-1/2 w-full self-end">
          <h2 className="md:text-left text-right font-poppins md:text-[18px] text-[18px] font-medium md:leading-[23px] leading-[21px] text-gray-400">
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
      <motion.span
        style={{ opacity }}
        className="inline-block mr-2 md:mr-3 will-change-[opacity]"
      >
        {word}
      </motion.span>
    );
  }
);

WordReveal.displayName = "WordReveal";

// Right Side Image Component - Fades in with blur
const RightImage = memo(
  ({
    image,
    index,
    totalSlides,
    scrollYProgress,
  }: {
    image: { src: string; alt: string };
    index: number;
    totalSlides: number;
    scrollYProgress: MotionValue<number>;
  }) => {
    const slideStart = index / totalSlides;

    const opacity = useTransform(
      scrollYProgress,
      [slideStart - 0.05, slideStart + 0.1],
      index === 0 ? [1, 1] : [0, 1]
    );

    const filter = useTransform(
      scrollYProgress,
      [slideStart - 0.05, slideStart + 0.1],
      index === 0 ? ["blur(0px)", "blur(0px)"] : ["blur(8px)", "blur(0px)"]
    );

    return (
      <motion.div
        style={{ opacity, filter, zIndex: index }}
        className="absolute inset-0 w-full h-full"
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover brightness-90"
        />
      </motion.div>
    );
  }
);

RightImage.displayName = "RightImage";

// Gallery Image Component - Cards that slide up and stack
const GalleryImage = memo(
  ({
    image,
    slideIndex,
    totalSlides,
    scrollYProgress,
    inverseScaleX,
    inverseScaleY,
  }: {
    image: { src: string; alt: string };
    slideIndex: number;
    totalSlides: number;
    scrollYProgress: MotionValue<number>;
    inverseScaleX: MotionValue<number>;
    inverseScaleY: MotionValue<number>;
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
    // Optimization: Handle last slide case within the transform to keep it a MotionValue
    const scale = useTransform(
      scrollYProgress,
      [slideEnd - 0.05, slideEnd + 0.1],
      slideIndex === totalSlides - 1 ? [1.1, 1.1] : [1.1, 1]
    );

    // Determine visibility based on scroll progress to optimize rendering
    const display = useTransform(scrollYProgress, (progress) => {
      const currentSlide = Math.round(progress * totalSlides);
      // Optimization: Only show the current slide and immediate neighbors
      if (slideIndex >= currentSlide - 1 && slideIndex <= currentSlide + 1) {
        return "block";
      }
      return "none";
    });

    // Combine scales for X axis to counteract parent container scaling
    const finalScaleX = useTransform(
      [scale, inverseScaleX],
      ([s, inv]: number[]) => s * inv
    );

    // Combine scales for Y axis to counteract parent container scaling
    const finalScaleY = useTransform(
      [scale, inverseScaleY],
      ([s, inv]: number[]) => s * inv
    );

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
          style={{
            scaleX: finalScaleX,
            scaleY: finalScaleY,
          }}
          className="relative w-full h-full will-change-transform"
        >
          <div className="relative w-full h-full">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-200 brightness-80"
              sizes="(max-width: 768px) 100vw, 50vw"
              loading="lazy"
            />
            <div className="absolute w-full h-full bg-[#133769] mix-blend-color z-10 opacity-100 group-hover:opacity-0 transition-opacity duration-200"></div>
          </div>
        </motion.div>
      </motion.div>
    );
  }
);

GalleryImage.displayName = "GalleryImage";
