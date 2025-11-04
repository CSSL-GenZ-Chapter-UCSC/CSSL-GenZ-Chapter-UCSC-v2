"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export const Logo = () => {
  const gradient = `linear-gradient(
  80deg,
  rgba(30,68,143,0) 30%,       /* transparent start */
  #1E448F 40%,                 /* base color begins */
  #4C9DFE 45%,                 /* highlight */
  #1E448F 50%,                 /* base again */
  rgba(30,68,143,0) 65%        /* fade out */
)`;

  return (
    <section className="relative bg-black">
      <LogoScroll gradient={gradient} />
    </section>
  );
};

const LogoScroll = ({ gradient }: { gradient: string }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const bgPosition = useTransform(
    scrollYProgress,
    [0, 1],
    ["-50% 50%", "170% 50%"]
  );

  return (
    <div ref={containerRef} className="relative h-[300vh] w-full">
      <div className="h-screen sticky top-0 flex items-center justify-center overflow-hidden">
        <motion.h2
          className="text-center font-[Poppins] 2xl:text-[750px] xl:text-[650px] lg:text-[550px] md:text-[450px] sm:text-[350px] text-[150px] font-semibold leading-[700px] bg-clip-text text-transparent select-none"
          style={{
            backgroundImage: gradient,
            backgroundSize: "300% 100%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: bgPosition,
            WebkitBackgroundClip: "text",
          }}
        >
          CSSL
        </motion.h2>
      </div>
    </div>
  );
};
