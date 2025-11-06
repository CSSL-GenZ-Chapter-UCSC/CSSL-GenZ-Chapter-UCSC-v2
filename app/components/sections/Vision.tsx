"use client";

import { useRef, useState } from "react";
import { Container } from "../shared/Container";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
  useMotionValueEvent,
} from "motion/react";

export const Vision = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const xSpring = useSpring(x, { stiffness: 120, damping: 28, mass: 0.6 });

  const [pastHalf, setPastHalf] = useState(false);
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setPastHalf(latest >= 0.5);
  });

  return (
    <section
      ref={sectionRef}
      className="w-full h-[200vh] flex flex-col bg-black pt-30"
    >
      <Container className="h-1/2 flex flex-col gap-5 pb-20 sticky top-30">
        <div className="w-full h-auto flex flex-row">
          <div className="w-1/3 h-full justify-start items-start flex flex-col" />
          <div className="w-2/3 h-full justify-start items-start flex flex-col gap-5">
            <AnimatePresence initial={false} mode="wait">
              {pastHalf ? (
                <motion.p
                  key="desc-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="text-[#E0E0E0] font-[Poppins] text-[45px] not-italic font-normal leading-[54px] tracking-[-0.52px] w-2/3"
                >
                  Shaping future tech leaders through community, curiosity, and
                  real‑world impact
                </motion.p>
              ) : (
                <motion.p
                  key="desc-1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="text-[#E0E0E0] font-[Poppins] text-[45px] not-italic font-normal leading-[54px] tracking-[-0.52px] w-2/3"
                >
                  An initiative dedicated to empowering the next generation of
                  IT professionals
                </motion.p>
              )}
            </AnimatePresence>

            <AnimatePresence initial={false} mode="wait">
              {pastHalf ? (
                <motion.p
                  key="title-2"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="text-[#C4C4C4] font-[Poppins] text-[23px] not-italic font-normal leading-[65px] tracking-[-0.23px]"
                >
                  Our Mission
                </motion.p>
              ) : (
                <motion.p
                  key="title-1"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="text-[#C4C4C4] font-[Poppins] text-[23px] not-italic font-normal leading-[65px] tracking-[-0.23px]"
                >
                  Our Vision
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="w-full h-full overflow-hidden">
          <motion.div
            style={{ x: xSpring }}
            className="w-[200%] h-full flex flex-row gap-5"
          >
            <div className="w-1/6 h-full flex-none bg-[#575757]" />
            <div className="w-1/6 h-full flex-none bg-[#676767]" />
            <div className="w-1/6 h-full flex-none bg-[#787878]" />
            <div className="w-1/6 h-full flex-none bg-[#575757]" />
            <div className="w-1/6 h-full flex-none bg-[#676767]" />
            <div className="w-1/6 h-full flex-none bg-[#787878]" />
          </motion.div>
        </div>
      </Container>
    </section>
  );
};
