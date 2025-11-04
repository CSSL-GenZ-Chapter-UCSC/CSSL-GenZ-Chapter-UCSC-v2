"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";

// Gallery configuration - easy to modify
const GALLERY_CONFIG = {
  slides: [
    {
      image: {
        src: "/galery/image 5.png",
        alt: "CSSL GenZ Chapter Team",
      },
      text: {
        line1: "An initiative dedicated to",
        line2: "empowering ",
        line2Highlight: "the next generation of IT professionals",
      }
    },
    {
      image: {
        src: "/galery/images.jpg",
        alt: "CSSL GenZ Chapter Event",
      },
      text: {
        line1: "Building a community of",
        line2: "innovative ",
        line2Highlight: "tech leaders and problem solvers",
      }
    },
    {
      image: {
        src: "/galery/img_5terre.jpg",
        alt: "CSSL Learning Sessions",
      },
      text: {
        line1: "Fostering growth through",
        line2: "collaborative ",
        line2Highlight: "projects and mentorship programs",
      }
    },
    {
      image: {
        src: "/galery/img_forest.jpg",
        alt: "CSSL Team Building",
      },
      text: {
        line1: "Creating opportunities for",
        line2: "aspiring ",
        line2Highlight: "developers to thrive and excel",
      }
    },
  ]
};

export const Gallery = () => {
  const containerRef = useRef(null);
  
  // Calculate total height needed for all slides - each slide needs scroll distance
  const totalSlides = GALLERY_CONFIG.slides.length;
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
              {GALLERY_CONFIG.slides.map((slide, slideIndex) => (
                <GalleryImage
                  key={slideIndex}
                  image={slide.image}
                  slideIndex={slideIndex}
                  totalSlides={totalSlides}
                  scrollYProgress={scrollYProgress}
                />
              ))}
            </div>
          </div>

          {/* Right Side - Stacked Text */}
          <div className="absolute right-0 top-0 w-[45%] h-full">
            <div className="relative w-full h-full">
              {GALLERY_CONFIG.slides.map((slide, slideIndex) => (
                <GalleryText
                  key={slideIndex}
                  slide={slide}
                  slideIndex={slideIndex}
                  totalSlides={totalSlides}
                  scrollYProgress={scrollYProgress}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Text component for each slide
const GalleryText = ({ slide, slideIndex, totalSlides, scrollYProgress }) => {
  // Calculate progress range for this slide
  const slideStart = slideIndex / totalSlides;
  const slideEnd = (slideIndex + 1) / totalSlides;
  
  // Text visibility
  const textOpacity = useTransform(
    scrollYProgress,
    [slideStart - 0.05, slideStart + 0.05, slideEnd - 0.05, slideEnd + 0.05],
    slideIndex === 0 ? [1, 1, 1, 0] : [0, 1, 1, 0]
  );
  
  const textY = useTransform(
    scrollYProgress,
    [slideStart, slideEnd],
    ["0%", "-10%"]
  );
  
  // Split text into words
  const line1Words = slide.text.line1.split(" ");
  const line2Words = slide.text.line2.split(" ");
  const highlightWords = slide.text.line2Highlight.split(" ");
  const allWords = [...line1Words, ...line2Words, ...highlightWords];

  return (
    <motion.div
      style={{ 
        opacity: textOpacity,
        y: textY,
      }}
      className="absolute inset-0 flex flex-col justify-center items-start px-12 lg:px-20"
    >
      <div className="relative z-20">
        <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
          {/* Line 1 */}
          <div className="mb-2">
            {line1Words.map((word, index) => (
              <WordReveal
                key={`line1-${index}`}
                word={word}
                index={index}
                total={allWords.length}
                slideStart={slideStart}
                scrollYProgress={scrollYProgress}
                isHighlighted={false}
              />
            ))}
          </div>
          
          {/* Line 2 */}
          <div className="mb-2">
            {line2Words.map((word, index) => (
              <WordReveal
                key={`line2-${index}`}
                word={word}
                index={line1Words.length + index}
                total={allWords.length}
                slideStart={slideStart}
                scrollYProgress={scrollYProgress}
                isHighlighted={false}
              />
            ))}
            {/* Highlighted text */}
            {highlightWords.map((word, index) => (
              <WordReveal
                key={`highlight-${index}`}
                word={word}
                index={line1Words.length + line2Words.length + index}
                total={allWords.length}
                slideStart={slideStart}
                scrollYProgress={scrollYProgress}
                isHighlighted={true}
              />
            ))}
          </div>
        </h2>
      </div>
    </motion.div>
  );
};

// Word reveal component with gradual animation
const WordReveal = ({ 
  word, 
  index, 
  total, 
  slideStart,
  scrollYProgress,
  isHighlighted 
}) => {
  // Calculate reveal progress for each word within the slide
  const wordStart = slideStart + 0.05 + (index / total) * 0.15;
  const wordEnd = wordStart + 0.05;
  
  // For first slide (slideStart = 0), show immediately
  const isFirstSlide = slideStart < 0.1;
  
  const opacity = useTransform(
    scrollYProgress,
    [wordStart - 0.02, wordStart, wordEnd],
    isFirstSlide ? [1, 1, 1] : [0, 0.3, 1]
  );
  
  const y = useTransform(
    scrollYProgress,
    [wordStart, wordEnd],
    isFirstSlide ? [0, 0] : [20, 0]
  );
  
  return (
    <motion.span
      style={{ 
        opacity,
        y,
      }}
      className={`inline-block mr-2 md:mr-3 ${
        isHighlighted ? "text-[#4C9DFE]" : "text-white"
      }`}
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
