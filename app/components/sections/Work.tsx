"use client";

import { motion, useScroll } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

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
  return (
    <div className="absolute w-[95%] h-[95%] z-20">
      <div className="relative w-full h-full">
        <div className="absolute w-[500px] h-80 bg-gray-400 top-0 left-0"></div>

        <h2
          className="absolute w-[366px] text-white font-poppins text-[22px] font-normal 
      leading-[26.2px] tracking-[1.1px] top-15 left-[45%]"
        >
          Connecting with Industry Professionals and Investors through the main
          body of CSSL
        </h2>
        <div className="absolute w-[106px] h-[106px] bg-gray-400 top-30 right-0"></div>
      </div>
      <p className="flex absolute left-[60%] top-[13%] w-[310px] h-60 flex-col justify-center shrink-0 text-white font-poppins text-[16px] font-light leading-[20.2px] tracking-[0.8px]">
        Through our affiliation with the main Computer Society of Sri Lanka
        (CSSL), students gain exclusive access to industry leaders, experts, and
        potential investors. We create opportunities for undergraduates to
        explore real-world insights, understand current market needs, and build
        valuable professional relationships that can shape their future careers.
      </p>
      <div className="absolute w-[171px] h-[171px] bg-gray-400 left-[15%] top-[17%]"></div>
    </div>
  );
};
