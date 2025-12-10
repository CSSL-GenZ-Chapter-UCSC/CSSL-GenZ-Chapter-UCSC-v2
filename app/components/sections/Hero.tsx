"use client";

import { Container } from "../shared/Container";
import { motion } from "motion/react";
import dynamic from "next/dynamic";
import { Button } from "../shared/Button";
import { useEffect, useRef, useState } from "react";

import { AnnouncementBar, Announcement } from "../shared/AnnouncementBar";

// Dynamically import DarkVeil to avoid SSR issues with WebGL
const DarkVeil = dynamic(() => import("../shared/DarkVeil"), {
  ssr: false,
});

interface HeroProps {
  announcements?: Announcement[];
}

export const Hero = ({ announcements = [] }: HeroProps) => {
  const heroRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0,
      }
    );

    const currentHeroRef = heroRef.current;

    if (currentHeroRef) {
      observer.observe(currentHeroRef);
    }

    return () => {
      if (currentHeroRef) {
        observer.unobserve(currentHeroRef);
      }
    };
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex flex-col">
      <div className="relative flex-1 flex items-center justify-center overflow-hidden bg-black">
        {/* DarkVeil Background */}
        {isInView && (
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
        )}

        {/* Gradient Overlays */}
        <div className="absolute inset-0 z-1 bg-linear-to-b from-black/30 via-transparent to-black/50 pointer-events-none" />

        {/* Content */}
        <Container className="relative z-10 py-32 lg:py-40">
          <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, filter: "blur(8px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.3, ease: "easeOut", delay: 0.15 }}
              className="text-3xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 tracking-normal select-none"
            >
              CSSL Gen
              <span className="text-blue-500 font-(family-name:--font-la-belle-aurore) text-4xl md:text-7xl lg:text-7xl xl:text-8xl mr-2">
                Z
              </span>{" "}
              Chapter of UCSC
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, filter: "blur(8px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.3, ease: "easeOut", delay: 0.3 }}
              className="text-sm md:text-xl lg:text-2xl text-white/80 mb-12 sm:max-w-3xl w-3/4 leading-relaxed select-none"
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
