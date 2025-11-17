"use client";

import { motion, useScroll } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

export const Work = () => {
  // Six 7-letter words → 5 transitions (one per 100vh)
  const WORDS = useMemo(
    () => ["CONNECT", "NETWORK", "GROWING", "SUPPORT", "IMPACT", "ADVANCE"],
    []
  );

  const totalTransitions = WORDS.length - 1; // 5
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Scroll progress across the 500vh wrapper
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
    <div ref={containerRef} className="relative h-[500vh] w-full bg-black">
      <div className="h-screen sticky top-0 flex items-center justify-center overflow-hidden">
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
                className="relative block overflow-hidden align-middle text-center bg-red-400"
                style={{ width: "1em", height: "1em" }}
              >
                <motion.span
                  aria-hidden
                  className="block align-middle text-center"
                  style={{ translateY: oldTranslate }}
                >
                  {char}
                </motion.span>
                <motion.span
                  className="block absolute left-0 top-0 align-middle text-center"
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
