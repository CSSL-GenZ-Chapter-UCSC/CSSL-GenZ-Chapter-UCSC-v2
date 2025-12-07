"use client";

import { Container } from "../shared/Container";
import { motion } from "motion/react";
import dynamic from "next/dynamic";
import { Button } from "../shared/Button";

import { AnnouncementBar, Announcement } from "../shared/AnnouncementBar";

// Dynamically import DarkVeil to avoid SSR issues with WebGL
const DarkVeil = dynamic(() => import("../shared/DarkVeil"), {
  ssr: false,
});

interface HeroProps {
  announcements?: Announcement[];
}

export const Hero = ({ announcements = [] }: HeroProps) => {
  return (
    <section className="relative min-h-screen flex flex-col">
      <div className="relative flex-1 flex items-center justify-center overflow-hidden bg-black">
        {/* DarkVeil Background */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute inset-0 z-0 w-full h-full"
        >
          <DarkVeil
            hueShift={30}
            noiseIntensity={0.0}
            scanlineIntensity={0.0}
            speed={1.9}
            scanlineFrequency={4.3}
            warpAmount={5.0}
            resolutionScale={1}
          />
        </motion.div>

        {/* Gradient Overlays */}
        <div className="absolute inset-0 z-1 bg-linear-to-b from-black/30 via-transparent to-black/50 pointer-events-none" />

        {/* Content */}
        <Container className="relative z-10 py-32 lg:py-40">
          <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
            {/* Decorative Pattern - Top Left */}
            <div className="absolute top-20 left-0 w-32 h-32 opacity-20 pointer-events-none">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full text-blue-500"
              >
                <pattern
                  id="grid"
                  width="10"
                  height="10"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 10 0 L 0 0 0 10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                  />
                </pattern>
                <rect width="100" height="100" fill="url(#grid)" />
              </svg>
            </div>

            {/* Decorative Pattern - Bottom Right */}
            <div className="absolute bottom-20 right-0 w-48 h-48 opacity-20 pointer-events-none">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full text-blue-500"
              >
                <pattern
                  id="grid2"
                  width="10"
                  height="10"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 10 0 L 0 0 0 10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                  />
                </pattern>
                <rect width="100" height="100" fill="url(#grid2)" />
              </svg>
            </div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, filter: "blur(8px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.3, ease: "easeOut", delay: 0.15 }}
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 tracking-normal select-none"
            >
              CSSL Gen
              <span className="text-blue-500 font-(family-name:--font-la-belle-aurore) text-6xl md:text-7xl lg:text-7xl xl:text-8xl mr-2">
                Z
              </span>{" "}
              Chapter
              <br />
              of UCSC
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, filter: "blur(8px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.3, ease: "easeOut", delay: 0.3 }}
              className="text-lg md:text-xl lg:text-2xl text-white/80 mb-12 max-w-3xl leading-relaxed select-none"
            >
              Where GenZ minds at UCSC turn ideas into legacies
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, filter: "blur(8px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.3, ease: "easeOut", delay: 0.45 }}
            >
              <Button text="Explore chapter" isSvg href="/whatWeDo" />
            </motion.div>
          </div>
        </Container>
      </div>

      {/* Announcement Bar */}
      <div className="relative z-20">
        <AnnouncementBar announcements={announcements} />
      </div>
    </section>
  );
};
