"use client";

import { motion, useScroll } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

export const Work = () => {
  // 5 7 letter words 4 transitions (one per 100vh)
  const WORDS = useMemo(
    () => ["CONNECT", "CONTACT", "DEVELOP", "SUPPORT", "ADVANCE"],
    []
  );

  const totalTransitions = WORDS.length - 1;
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Active segment index [0..4] and progress within that segment [0..1]
  const [segmentIndex, setSegmentIndex] = useState(0);
  const [t, setT] = useState(0); // normalized progress [0..1] within current segment

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      const segFloat = v * totalTransitions;
      const seg = Math.min(totalTransitions - 1, Math.floor(segFloat));
      const tWithin = Math.min(1, Math.max(0, segFloat - seg));
      setSegmentIndex(seg);
      setT(tWithin);
    });
    return () => unsub();
  }, [scrollYProgress, totalTransitions]);

  const current = WORDS[segmentIndex];
  const next = WORDS[segmentIndex + 1] ?? WORDS[segmentIndex];

  // Ensure 7 characters by padding/truncating defensively
  const toSeven = (w: string) =>
    w.length >= 7 ? w.slice(0, 7) : (w + "       ").slice(0, 7);
  const currentLetters = useMemo(() => toSeven(current).split(""), [current]);
  const nextLetters = useMemo(() => toSeven(next).split(""), [next]);

  // Per-letter staggered progress derived from the segment progress
  const letterCount = 7;
  const stagger = 0.08; // normalized stagger per letter
  const effectiveSpan = Math.max(0.0001, 1 - stagger * (letterCount - 1));

  return (
    <div
      ref={containerRef}
      className="relative h-[500vh] w-full bg-black flex items-start justify-center"
    >
      <WorkActivities />
      <div className="h-screen sticky top-0 flex items-center justify-center overflow-hidden w-full">
        <motion.h2 className="text-(--lightBlue,#318AFF) font-poppins text-[179px] font-[550] leading-none flex items-center justify-center gap-[8.95px]">
          {currentLetters.map((char, i) => {
            const p = Math.max(
              0,
              Math.min(1, (t - i * stagger) / effectiveSpan)
            );
            const oldTranslate = `${-p * 100}%`;
            const newTranslate = `${(1 - p) * 100}%`;
            return (
              <span
                key={`slot-${i}`}
                className="relative block overflow-hidden items-end"
                style={{ width: "1em", height: "1em" }}
              >
                <motion.span
                  aria-hidden
                  className="block"
                  style={{ translateY: oldTranslate }}
                >
                  {char}
                </motion.span>
                <motion.span
                  className="block absolute left-0 top-0"
                  style={{ translateY: newTranslate }}
                >
                  {nextLetters[i]}
                </motion.span>
              </span>
            );
          })}
        </motion.h2>
      </div>
    </div>
  );
};

const WorkActivities = () => {
  const images = useMemo(
    () =>
      [
        { src: "/Images/About/img1.jpg", alt: "Work image 1" },
        { src: "/Images/About/img2.jpg", alt: "Work image 2" },
        { src: "/Images/About/img3.jpg", alt: "Work image 3" },
        { src: "/Images/About/img4.jpg", alt: "Work image 4" },
        { src: "/Images/About/vision1.jpg", alt: "Work image 5" },
        { src: "/Images/About/vision2.jpg", alt: "Work image 6" },
        { src: "/Images/About/vision3.jpg", alt: "Work image 7" },
        { src: "/Images/About/vision4.jpg", alt: "Work image 8" },
        { src: "/Images/blogImg1.png", alt: "Work image 9" },
        { src: "/Images/blogImg2.png", alt: "Work image 10" },
        { src: "/Images/blogImg3.png", alt: "Work image 11" },
      ] as const,
    []
  );

  const imgAt = (i: number) => images[i % images.length];

  // Hover state to apply grayscale removal & overlay fade similar to Vision.tsx
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="absolute w-[95%] h-[95%] z-20">
      <div className="relative w-full h-full">
        {/* 1 */}
        <motion.div
          initial={{ opacity: 0, filter: "blur(8px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.35, ease: "easeOut", delay: 0.3 }}
          className="absolute w-[500px] h-80 top-0 left-0 overflow-hidden"
          onMouseEnter={() => setHoveredIndex(0)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <Image
            src={imgAt(0).src}
            alt={imgAt(0).alt}
            fill
            className={`object-cover transition-all duration-200 brightness-80 ${hoveredIndex === 0 ? "grayscale-0" : "grayscale"}`}
            sizes="(max-width: 768px) 80vw, 500px"
            priority
          />
          <div
            className={`absolute w-full h-full bg-[#133769] mix-blend-color z-10 ${hoveredIndex === 0 ? "opacity-0" : "opacity-100"} transition-opacity duration-200`}
          ></div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, filter: "blur(8px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.35, ease: "easeOut", delay: 0.45 }}
          className="absolute w-[366px] text-white font-poppins text-[22px] font-normal 
      leading-[26.2px] tracking-[1.1px] top-15 left-[45%]"
        >
          Connecting with Industry Professionals and Investors through the main
          body of CSSL
        </motion.h2>
        {/* 2 */}
        <motion.div
          initial={{ opacity: 0, filter: "blur(8px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.35, ease: "easeOut", delay: 0.6 }}
          className="absolute w-[106px] h-[106px] top-40 right-0 overflow-hidden"
          onMouseEnter={() => setHoveredIndex(1)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <Image
            src={imgAt(1).src}
            alt={imgAt(1).alt}
            fill
            className={`object-cover transition-all duration-200 brightness-80 ${hoveredIndex === 1 ? "grayscale-0" : "grayscale"}`}
            sizes="106px"
          />
          <div
            className={`absolute w-full h-full bg-[#133769] mix-blend-color z-10 ${hoveredIndex === 1 ? "opacity-0" : "opacity-100"} transition-opacity duration-200`}
          ></div>
        </motion.div>
      </div>
      <p className="flex absolute left-[65%] top-[13%] w-[310px] h-60 flex-col justify-center shrink-0 text-white font-poppins text-[16px] font-light leading-[22.2px] tracking-[0.8px]">
        Through our affiliation with the main Computer Society of Sri Lanka
        (CSSL), students gain exclusive access to industry leaders, experts, and
        potential investors. We create opportunities for undergraduates to
        explore real-world insights, understand current market needs, and build
        valuable professional relationships that can shape their future careers.
      </p>
      {/* 3 */}
      <div
        className="absolute w-[171px] h-[171px] left-[15%] top-[17%] overflow-hidden"
        onMouseEnter={() => setHoveredIndex(2)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <Image
          src={imgAt(2).src}
          alt={imgAt(2).alt}
          fill
          className={`object-cover transition-all duration-200 brightness-80 ${hoveredIndex === 2 ? "grayscale-0" : "grayscale"}`}
          sizes="171px"
        />
        <div
          className={`absolute w-full h-full bg-[#133769] mix-blend-color z-10 ${hoveredIndex === 2 ? "opacity-0" : "opacity-100"} transition-opacity duration-200`}
        ></div>
      </div>
      {/* 4 */}
      <div
        className="absolute w-[300px] h-60 top-[25%] right-0 overflow-hidden"
        onMouseEnter={() => setHoveredIndex(3)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <Image
          src={imgAt(3).src}
          alt={imgAt(3).alt}
          fill
          className={`object-cover transition-all duration-200 brightness-80 ${hoveredIndex === 3 ? "grayscale-0" : "grayscale"}`}
          sizes="300px"
        />
        <div
          className={`absolute w-full h-full bg-[#133769] mix-blend-color z-10 ${hoveredIndex === 3 ? "opacity-0" : "opacity-100"} transition-opacity duration-200`}
        ></div>
      </div>
      {/* 5 */}
      <div
        className="absolute w-50 h-70 top-[25%] left-10 overflow-hidden"
        onMouseEnter={() => setHoveredIndex(4)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <Image
          src={imgAt(4).src}
          alt={imgAt(4).alt}
          fill
          className={`object-cover transition-all duration-200 brightness-80 ${hoveredIndex === 4 ? "grayscale-0" : "grayscale"}`}
          sizes="200px"
        />
        <div
          className={`absolute w-full h-full bg-[#133769] mix-blend-color z-10 ${hoveredIndex === 4 ? "opacity-0" : "opacity-100"} transition-opacity duration-200`}
        ></div>
      </div>
      {/* 6 */}
      <div
        className="absolute w-[450px] h-70 top-[30%] left-[30%] overflow-hidden"
        onMouseEnter={() => setHoveredIndex(5)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <Image
          src={imgAt(5).src}
          alt={imgAt(5).alt}
          fill
          className={`object-cover transition-all duration-200 brightness-80 ${hoveredIndex === 5 ? "grayscale-0" : "grayscale"}`}
          sizes="450px"
        />
        <div
          className={`absolute w-full h-full bg-[#133769] mix-blend-color z-10 ${hoveredIndex === 5 ? "opacity-0" : "opacity-100"} transition-opacity duration-200`}
        ></div>
      </div>
      <p className="flex absolute left-[70%] top-[35%] w-[310px] h-60 flex-col justify-center shrink-0 text-gray-100 font-poppins text-[16px] font-light leading-[22.2px] tracking-[0.8px]">
        The Genz chapter brings together tech-driven, curious, and ambitious
        students across UCSC. By fostering a collaborative environment, we help
        members form strong peer networks, share ideas, exchange knowledge, and
        grow collectively within an inspiring and supportive community.
      </p>
      <h2
        className="absolute w-[300px] text-white font-poppins text-[22px] font-normal 
      leading-[26.2px] tracking-[1.1px] top-[40%] left-[20%]"
      >
        Engaging and Networking with like minded peers
      </h2>
      {/* 7 */}
      <div
        className="absolute w-[206px] h-[206px] top-[45%] right-30 overflow-hidden"
        onMouseEnter={() => setHoveredIndex(6)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <Image
          src={imgAt(6).src}
          alt={imgAt(6).alt}
          fill
          className={`object-cover transition-all duration-200 brightness-80 ${hoveredIndex === 6 ? "grayscale-0" : "grayscale"}`}
          sizes="206px"
        />
        <div
          className={`absolute w-full h-full bg-[#133769] mix-blend-color z-10 ${hoveredIndex === 6 ? "opacity-0" : "opacity-100"} transition-opacity duration-200`}
        ></div>
      </div>
      {/* 8 */}
      <div
        className="absolute w-[550px] h-90 top-[48%] left-0 overflow-hidden"
        onMouseEnter={() => setHoveredIndex(7)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <Image
          src={imgAt(7).src}
          alt={imgAt(7).alt}
          fill
          className={`object-cover transition-all duration-200 brightness-80 ${hoveredIndex === 7 ? "grayscale-0" : "grayscale"}`}
          sizes="550px"
        />
        <div
          className={`absolute w-full h-full bg-[#133769] mix-blend-color z-10 ${hoveredIndex === 7 ? "opacity-0" : "opacity-100"} transition-opacity duration-200`}
        ></div>
      </div>
      <h2
        className="absolute w-[366px] text-white font-poppins text-[22px] font-normal 
      leading-[26.2px] tracking-[1.1px] top-[55%] left-[60%]"
      >
        Learning & Building through Hackathons, Workshops & Competitions
      </h2>
      <p className="flex absolute left-[60%] top-[57.5%] w-[310px] h-60 flex-col justify-center shrink-0 text-gray-100 font-poppins text-[16px] font-light leading-[22.2px] tracking-[0.8px]">
        We organize hands-on events such as hackathons, technical workshops, and
        student friendly competitions to help undergraduates stay aligned with
        emerging technologies. These experiences allow students to build
        practical skills, experiment with new tools, and gain exposure to
        real-world challenges in a fast-moving industry.
      </p>
      {/* 9 */}
      <div
        className="absolute w-[550px] h-90 top-[57%] left-0 overflow-hidden"
        onMouseEnter={() => setHoveredIndex(8)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <Image
          src={imgAt(8).src}
          alt={imgAt(8).alt}
          fill
          className={`object-cover transition-all duration-200 brightness-80 ${hoveredIndex === 8 ? "grayscale-0" : "grayscale"}`}
          sizes="550px"
        />
        <div
          className={`absolute w-full h-full bg-[#133769] mix-blend-color z-10 ${hoveredIndex === 8 ? "opacity-0" : "opacity-100"} transition-opacity duration-200`}
        ></div>
      </div>
      {/* 10 */}
      <div
        className="absolute w-[200px] h-60 top-[65%] right-0 overflow-hidden"
        onMouseEnter={() => setHoveredIndex(9)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <Image
          src={imgAt(9).src}
          alt={imgAt(9).alt}
          fill
          className={`object-cover transition-all duration-200 brightness-80 ${hoveredIndex === 9 ? "grayscale-0" : "grayscale"}`}
          sizes="200px"
        />
        <div
          className={`absolute w-full h-full bg-[#133769] mix-blend-color z-10 ${hoveredIndex === 9 ? "opacity-0" : "opacity-100"} transition-opacity duration-200`}
        ></div>
      </div>
      {/* 11 */}
      <div
        className="absolute w-[300px] h-60 top-[70%] left-30 overflow-hidden"
        onMouseEnter={() => setHoveredIndex(10)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <Image
          src={imgAt(10).src}
          alt={imgAt(10).alt}
          fill
          className={`object-cover transition-all duration-200 brightness-80 ${hoveredIndex === 10 ? "grayscale-0" : "grayscale"}`}
          sizes="300px"
        />
        <div
          className={`absolute w-full h-full bg-[#133769] mix-blend-color z-10 ${hoveredIndex === 10 ? "opacity-0" : "opacity-100"} transition-opacity duration-200`}
        ></div>
      </div>
      <h2
        className="absolute w-[366px] text-white font-poppins text-[22px] font-normal 
      leading-[26.2px] tracking-[1.1px] top-[75%] left-[40%]"
      >
        Learning & Building through Hackathons, Workshops & Competitions
      </h2>
      <p className="flex absolute left-[15%] top-[78%] w-[310px] h-60 flex-col justify-center shrink-0 text-gray-100 font-poppins text-[16px] font-light leading-[22.2px] tracking-[0.8px]">
        We organize hands-on events such as hackathons, technical workshops, and
        student friendly competitions to help undergraduates stay aligned with
        emerging technologies. These experiences allow students to build
        practical skills, experiment with new tools, and gain exposure to
        real-world challenges in a fast-moving industry.
      </p>
      {/* 12 */}
      <div
        className="absolute w-[550px] h-90 top-[82%] right-0 overflow-hidden"
        onMouseEnter={() => setHoveredIndex(11)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <Image
          src={imgAt(11).src}
          alt={imgAt(11).alt}
          fill
          className={`object-cover transition-all duration-200 brightness-80 ${hoveredIndex === 11 ? "grayscale-0" : "grayscale"}`}
          sizes="550px"
        />
        <div
          className={`absolute w-full h-full bg-[#133769] mix-blend-color z-10 ${hoveredIndex === 11 ? "opacity-0" : "opacity-100"} transition-opacity duration-200`}
        ></div>
      </div>
      {/* 13 */}
      <div
        className="absolute w-[450px] h-60 top-[87%] left-10 overflow-hidden"
        onMouseEnter={() => setHoveredIndex(12)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <Image
          src={imgAt(12).src}
          alt={imgAt(12).alt}
          fill
          className={`object-cover transition-all duration-200 brightness-80 ${hoveredIndex === 12 ? "grayscale-0" : "grayscale"}`}
          sizes="450px"
        />
        <div
          className={`absolute w-full h-full bg-[#133769] mix-blend-color z-10 ${hoveredIndex === 12 ? "opacity-0" : "opacity-100"} transition-opacity duration-200`}
        ></div>
      </div>
      <p className="flex absolute left-[45%] top-[97%] w-[310px] h-60 flex-col justify-center shrink-0 text-gray-100 font-poppins text-[16px] font-light leading-[22.2px] tracking-[0.8px]">
        Our members get the chance to volunteer at flagship CSSL events from the
        National IT Conference to Tech Talks and NSSC. This involvement enables
        them to work directly with Sri Lankan ICT professionals, contribute to
        nationally recognized initiatives, and learn from influential voices
        across the tech ecosystem.
      </p>
      {/* 14 */}
      <div
        className="absolute w-[150px] h-[150px] top-[96%] right-10 overflow-hidden"
        onMouseEnter={() => setHoveredIndex(13)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <Image
          src={imgAt(13).src}
          alt={imgAt(13).alt}
          fill
          className={`object-cover transition-all duration-200 brightness-80 ${hoveredIndex === 13 ? "grayscale-0" : "grayscale"}`}
          sizes="150px"
        />
        <div
          className={`absolute w-full h-full bg-[#133769] mix-blend-color z-10 ${hoveredIndex === 13 ? "opacity-0" : "opacity-100"} transition-opacity duration-200`}
        ></div>
      </div>
      <h2
        className="absolute w-[366px] text-white font-poppins text-[22px] font-normal 
      leading-[26.2px] tracking-[1.1px] top-[99%] left-[10%]"
      >
        Volunteering & Collaborating with National Tech Leaders
      </h2>
    </div>
  );
};
