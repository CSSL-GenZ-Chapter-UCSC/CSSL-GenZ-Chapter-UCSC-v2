"use client";

import { useState, useEffect, useCallback } from "react";
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
    author: "Dr. Chamath Keppitiyagama",
    position: "Senior Lecturer of UCSC",
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

export const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const handlePrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  const AUTO_SLIDE_DURATION = 3000;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, AUTO_SLIDE_DURATION);

    return () => clearInterval(timer);
  }, [currentIndex]);

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
            background:
              "radial-gradient(circle at bottom right, #285C97, #000000)",
          }}
        />

        {/* Second Column - Top Box */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="rounded-3xl"
          style={{
            background: "radial-gradient(circle at bottom, #285C97, #000000)",
          }}
        />

        {/* First Column - Middle Box */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="rounded-3xl"
          style={{
            background: "radial-gradient(circle at right, #285C97, #000000)",
          }}
        />

        {/* Second Column - Middle Box with Image and Glow */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: "radial-gradient(circle at center, #285C97, #000000)",
            boxShadow:
              "0 0 40px rgba(40, 92, 151, 0.6), 0 0 80px rgba(40, 92, 151, 0.3)",
          }}
        >
          <AnimatePresence>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, filter: "blur(8px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(8px)" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
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
            background:
              "radial-gradient(circle at top right, #285C97, #000000)",
          }}
        />

        {/* Second Column - Bottom Box */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="rounded-3xl"
          style={{
            background: "radial-gradient(circle at top, #285C97, #000000)",
          }}
        />
      </motion.div>

      <Container>
        <motion.div
          className="relative z-20 flex flex-col items-center justify-center min-h-[60vh]"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              handleNext();
            } else if (swipe > swipeConfidenceThreshold) {
              handlePrev();
            }
          }}
        >
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
            <AnimatePresence>
              <motion.div
                key={`mobile-${currentIndex}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
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
                    className="text-xl md:text-2xl lg:text-3xl text-white font-light leading-relaxed mt-20 text-right lg:text-right"
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
          <div className="flex items-center justify-center gap-3 mt-20 w-full lg:pl-[35%]">
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
        </motion.div>
      </Container>
    </section>
  );
};
