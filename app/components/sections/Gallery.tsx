"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import Image from "next/image";

// Gallery configuration - easy to modify
const GALLERY_CONFIG = {
  // Two separate texts
  text1: "An initiative dedicated to empowering the next generation of IT professionals",
  text2: "An initiative dedicated to empowering the next generation of IT professionals",
  // Images array
  images: [
    {
      src: "/galery/image 5.png",
      alt: "CSSL GenZ Chapter Team",
    },
    {
      src: "/galery/images.jpg",
      alt: "CSSL GenZ Chapter Event",
    },
    {
      src: "/galery/img_5terre.jpg",
      alt: "CSSL Learning Sessions",
    },
    {
      src: "/galery/img_forest.jpg",
      alt: "CSSL Team Building",
    },
  ]
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

  return (
    <section 
      ref={containerRef}
      style={{ height: `${heightMultiplier * 100}vh` }}
      className="relative bg-[#0a0e1a]"
    >
      {/* Sticky container that stays in place */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="relative h-full flex items-center">
          {/* Left Side - Stacked Images */}
          <div className="absolute left-0 top-0 w-[55%] h-full">
            <div className="relative w-full h-full">
              {GALLERY_CONFIG.images.map((image, slideIndex) => (
                <GalleryImage
                  key={slideIndex}
                  image={image}
                  slideIndex={slideIndex}
                  totalSlides={totalSlides}
                  scrollYProgress={scrollYProgress}
                />
              ))}
            </div>
          </div>

          {/* Right Side - Gradient Background with Two Texts */}
          <div className="absolute right-0 top-0 w-[45%] h-full bg-gradient-to-b from-[#0F2248] to-[#000000]">
            <div className="relative w-full h-full">
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
const GalleryTexts = ({ 
  text1, 
  text2, 
  scrollYProgress 
}: {
  text1: string;
  text2: string;
  scrollYProgress: any;
}) => {
  const text1Words = text1.split(" ");
  const text2Words = text2.split(" ");
  const totalWords = text1Words.length + text2Words.length;

  return (
    <div className="absolute inset-0 flex flex-col justify-between p-8 lg:p-12">
      {/* Text 1 - Top Left */}
      <div className="relative z-20 max-w-xl mt-16 lg:mt-20">
        <h2 className="font-bold leading-tight" style={{ fontSize: '31px' }}>
          {text1Words.map((word: string, index: number) => (
            <WordReveal
              key={`text1-${index}`}
              word={word}
              index={index}
              totalText1Words={text1Words.length}
              totalWords={totalWords}
              scrollYProgress={scrollYProgress}
              isText2={false}
            />
          ))}
        </h2>
      </div>
      
      {/* Text 2 - Bottom Right */}
      <div className="relative z-20 max-w-xl self-end text-right">
        <h2 className="font-bold leading-tight" style={{ fontSize: '22px' }}>
          {text2Words.map((word: string, index: number) => (
            <WordReveal
              key={`text2-${index}`}
              word={word}
              index={index}
              totalText1Words={text1Words.length}
              totalWords={totalWords}
              scrollYProgress={scrollYProgress}
              isText2={true}
            />
          ))}
        </h2>
      </div>
    </div>
  );
};

// Word reveal component with gradual color change
const WordReveal = ({ 
  word, 
  index, 
  totalText1Words,
  totalWords,
  scrollYProgress,
  isText2
}: {
  word: string;
  index: number;
  totalText1Words: number;
  totalWords: number;
  scrollYProgress: any;
  isText2: boolean;
}) => {
  // Calculate the scroll range for color transition
  // Text 1 animates in the first half of the scroll
  // Text 2 animates in the second half
  
  let colorStart, colorEnd;
  
  if (isText2) {
    // Text 2: starts after text 1 is complete
    const wordProgress = index / (totalWords - totalText1Words);
    colorStart = 0.5 + (wordProgress * 0.4);
    colorEnd = colorStart + 0.05;
  } else {
    // Text 1: animates first
    const wordProgress = index / totalText1Words;
    colorStart = 0.1 + (wordProgress * 0.4);
    colorEnd = colorStart + 0.05;
  }
  
  // Color transition from #1B56A3 to white
  const colorProgress = useTransform(
    scrollYProgress,
    [colorStart, colorEnd],
    [0, 1]
  );

  return (
    <motion.span
      style={{
        color: useTransform(colorProgress, (progress) => {
          // Interpolate between #1B56A3 and #FFFFFF
          const r = Math.round(27 + (255 - 27) * progress);
          const g = Math.round(86 + (255 - 86) * progress);
          const b = Math.round(163 + (255 - 163) * progress);
          return `rgb(${r}, ${g}, ${b})`;
        }),
      }}
      className="inline-block mr-2 md:mr-3"
    >
      {word}
    </motion.span>
  );
};

// Gallery Image Component - Cards that slide up and stack
const GalleryImage = ({
  image,
  slideIndex,
  totalSlides,
  scrollYProgress
}: {
  image: { src: string; alt: string };
  slideIndex: number;
  totalSlides: number;
  scrollYProgress: any;
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
  
  // Opacity - fade in current, fade out when next comes
  const opacity = useTransform(
    scrollYProgress,
    [slideStart - 0.05, slideStart, slideEnd - 0.05, slideEnd + 0.05],
    slideIndex === 0 ? [1, 1, 1, 0] : [0, 1, 1, 0]
  );
  
  // Scale effect - scales up slightly when visible
  const scale = useTransform(
    scrollYProgress,
    [slideStart, slideStart + 0.1, slideEnd],
    [0.95, 1, 1.02]
  );

  return (
    <motion.div
      style={{
        y: cardY,
        opacity,
        zIndex: slideIndex,
      }}
      className="absolute inset-0 w-full h-full"
    >
      <motion.div
        style={{
          scale,
        }}
        className="relative w-full h-full"
      >
        <div className="relative w-full h-full">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
            sizes="55vw"
            priority={slideIndex === 0}
          />
        </div>
      </motion.div>
      
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-linear-to-r from-transparent via-transparent to-[#0a0e1a]/30 pointer-events-none" />
    </motion.div>
  );
};
