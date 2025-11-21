"use client";

import { useState, useEffect } from "react";
import { Container } from "../shared/Container";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
};

interface Testimonial {
  quote: string;
  author: string;
  position: string;
  image: string;
}

export const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials: Testimonial[] = [
    {
      quote:
        "The future of computing in Sri Lanka is bright. And it's being built right here.",
      author: "Dr. Ajantha Athukorala",
      position: "Director, Computer Society of Sri Lanka (CSSL)",
      image: "/Images/About/testimonial-1.jpg",
    },
    {
      quote:
        "Innovation and technology are the driving forces behind our success and growth in the industry.",
      author: "Prof. Sanduni Perera",
      position: "Head of Research, Tech Institute",
      image: "/Images/About/testimonial-2.jpg",
    },
    {
      quote:
        "The next generation of tech leaders is emerging from this vibrant community of learners and innovators.",
      author: "Eng. Kasun Silva",
      position: "CTO, Tech Solutions Lanka",
      image: "/Images/About/testimonial-3.jpg",
    },
  ];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden py-20 md:py-32">
      {/* /* Background Gradient  */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "#000000",
        }}
      />

      {/* Decorative Left Boxes - 2 columns, 3 rows */}
      <motion.div
        className="absolute left-0  top-0 h-full w-1/3 hidden lg:grid grid-cols-2 grid-rows-3 gap-3 p-2 z-10"
        style={{ transform: "translateX(-80px)" }}
      >
        {/* First Column - Top Box */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="rounded-3xl"
          style={{
            background: "linear-gradient(135deg, #285C97, #000000)",
          }}
        />

        {/* Second Column - Top Box */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="rounded-3xl"
          style={{
            background: "linear-gradient(135deg, #285C97, #000000)",
          }}
        />

        {/* First Column - Middle Box */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="rounded-3xl"
          style={{
            background: "linear-gradient(135deg, #285C97, #000000)",
          }}
        />

        {/* Second Column - Middle Box with Image and Glow */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #285C97, #000000)",
            boxShadow:
              "0 0 40px rgba(40, 92, 151, 0.6), 0 0 80px rgba(40, 92, 151, 0.3)",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center justify-center p-1"
            >
              <div className="relative w-full h-full rounded-3xl overflow-hidden">
                <Image
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].author}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src =
                      "https://via.placeholder.com/200x200?text=Avatar";
                  }}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* First Column - Bottom Box */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="rounded-3xl"
          style={{
            background: "linear-gradient(135deg, #285C97, #000000)",
          }}
        />

        {/* Second Column - Bottom Box */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="rounded-3xl"
          style={{
            background: "linear-gradient(135deg, #285C97, #000000)",
          }}
        />
      </motion.div>

      <Container>
        <div className="relative z-20 flex flex-col items-center justify-center min-h-[60vh]">
          {/* Header - Centered to whole section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 w-full"
          >
            <p className="text-sm md:text-base uppercase tracking-widest text-blue-300 mb-2">
              TESTIMONIALS
            </p>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium text-white">
              Trusted Industry Voices
            </h2>
          </motion.div>

          {/* Mobile Image - Only visible on mobile */}
          <div className="lg:hidden mb-8 w-full flex justify-center relative h-48">
            <AnimatePresence mode="wait">
              <motion.div
                key={`mobile-${currentIndex}`}
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -100, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute w-40 h-40 sm:w-48 sm:h-48 rounded-2xl overflow-hidden border-4 border-white/20"
              >
                <Image
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].author}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src =
                      "https://via.placeholder.com/200x200?text=Avatar";
                  }}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Testimonial Content - Right side */}
          <div className="w-full lg:pl-[35%] px-4 lg:pr-12">
            <div className="min-h-[300px] flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-8"
                >
                  <motion.p
                    className="text-xl md:text-2xl lg:text-3xl text-white font-light leading-relaxed text-center lg:text-left"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    &ldquo;{testimonials[currentIndex].quote}&rdquo;
                  </motion.p>

                  <motion.div
                    className="pt-6 text-center lg:text-right"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <p className="text-base md:text-lg text-white/90">
                      – {testimonials[currentIndex].author}
                    </p>
                    <p className="text-sm md:text-base text-blue-300 mt-1">
                      {testimonials[currentIndex].position}
                    </p>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation Dots - Fixed position */}
          <div className="flex items-center justify-center gap-3 mt-12 w-full">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? "w-12 h-3 bg-blue-500"
                    : "w-3 h-3 bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation Arrows - Fixed position */}
          <div className="hidden md:flex items-center justify-center gap-4 mt-8 w-full">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full border-2 border-white/30 hover:border-white/60 hover:bg-white/10 transition-all duration-300 flex items-center justify-center text-white"
              aria-label="Previous testimonial"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full border-2 border-white/30 hover:border-white/60 hover:bg-white/10 transition-all duration-300 flex items-center justify-center text-white"
              aria-label="Next testimonial"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
};
