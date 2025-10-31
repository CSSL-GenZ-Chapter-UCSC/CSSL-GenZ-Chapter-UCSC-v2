"use client";

import { Container } from "../shared/Container";
import dynamic from "next/dynamic";
import Link from "next/link";

// Dynamically import DarkVeil to avoid SSR issues with WebGL
const DarkVeil = dynamic(() => import("../shared/DarkVeil"), {
  ssr: false,
});

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* DarkVeil Background */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <DarkVeil
          hueShift={30}
          noiseIntensity={0.00}
          scanlineIntensity={0.00}
          speed={1.9}
          scanlineFrequency={4.3}
          warpAmount={5.0}
          resolutionScale={1}
        />
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 z-1 bg-linear-to-b from-black/30 via-transparent to-black/50 pointer-events-none" />
      
      {/* Content */}
      <Container className="relative z-10 py-32 lg:py-40">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          {/* Decorative Pattern - Top Left */}
          <div className="absolute top-20 left-0 w-32 h-32 opacity-20 pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-full h-full text-blue-500">
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
              <rect width="100" height="100" fill="url(#grid)" />
            </svg>
          </div>

          {/* Decorative Pattern - Bottom Right */}
          <div className="absolute bottom-20 right-0 w-48 h-48 opacity-20 pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-full h-full text-blue-500">
              <pattern id="grid2" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
              <rect width="100" height="100" fill="url(#grid2)" />
            </svg>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 tracking-normal">
            CSSL Gen
            <span className="text-blue-500 font-(family-name:--font-la-belle-aurore) text-6xl md:text-7xl lg:text-7xl xl:text-8xl mr-2">Z</span>{" "}
            Chapter
            <br />
            of UCSC
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl lg:text-2xl text-white/80 mb-12 max-w-3xl leading-relaxed">
            Where GenZ minds at UCSC turn ideas into legacies
          </p>

          {/* CTA Button */}
          <Link
            href="/about"
            className="group relative inline-flex items-center gap-3 bg-linear-to-r from-[#1E448F] to-[#4C9DFE] hover:opacity-90 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50"
          >
            <span>Explore Chapter</span>
            <svg 
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </Container>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <svg 
          className="w-6 h-6 text-white/60" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};
