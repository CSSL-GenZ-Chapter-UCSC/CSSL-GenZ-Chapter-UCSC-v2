"use client";

import { useRef, useState } from "react";
import { Container } from "../shared/Container";
import Image from "next/image";
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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const visionImages: {
    src?: string;
    className?: string;
    alt?: string;
    containerClassName?: string;
    overlayClassName?: string;
  }[] = [
    {
      src: "/Images/About/vision1.jpg",
      containerClassName: "",
      overlayClassName: "mix-blend-color",
      className: "scale-130",
      alt: "Vision image 1",
    },
    {
      src: "/Images/About/vision2.jpg",
      containerClassName: "",
      overlayClassName: "mix-blend-color",
      className: "scale-130",
      alt: "Vision image 1",
    },
    {
      src: "/Images/About/vision3.jpg",
      containerClassName: "",
      overlayClassName: "mix-blend-color",
      className: "scale-130",
      alt: "Vision image 1",
    },
    {
      src: "/Images/About/vision4.jpg",
      containerClassName: "",
      overlayClassName: "mix-blend-color",
      className: "scale-130",
      alt: "Vision image 1",
    },
    {
      src: "/Images/About/vision1.jpg",
      containerClassName: "",
      overlayClassName: "mix-blend-color",
      className: "scale-130",
      alt: "Vision image 1",
    },
    {
      src: "/Images/About/vision2.jpg",
      containerClassName: "",
      overlayClassName: "mix-blend-color",
      className: "scale-130",
      alt: "Vision image 1",
    },
  ];

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

  const stagger = 0.03;

  const renderSpans = (text: string, blur = 6) =>
    text.split(" ").map((w, i) => (
      <motion.span
        key={i}
        initial={{ opacity: 0, filter: `blur(${blur}px)` }}
        animate={{ opacity: 1, filter: `blur(0px)` }}
        exit={{ opacity: 0, filter: `blur(${blur}px)` }}
        transition={{ duration: 0.1, ease: "easeOut", delay: i * stagger }}
        className="inline-block mr-2"
      >
        {w}
        {"\u00A0"}
      </motion.span>
    ));

  return (
    <section
      ref={sectionRef}
      className="w-full h-[400vh] flex flex-col bg-black pt-30"
    >
      <Container className="h-1/4 flex flex-col gap-5 pb-30 sticky top-30">
        <div className="w-full h-auto flex flex-row">
          <div className="w-1/3 h-full justify-start items-start flex flex-col" />
          <div className="w-2/3 h-full justify-start items-start flex flex-col gap-5">
            <AnimatePresence initial={false} mode="wait">
              {pastHalf ? (
                <motion.p
                  key="desc-2"
                  className="text-[#E0E0E0] font-[Poppins] text-[45px] not-italic font-normal leading-[54px] tracking-[-0.52px] w-2/3"
                >
                  {renderSpans(
                    "Shaping future tech leaders through community, curiosity, and real‑world impact",
                    6
                  )}
                </motion.p>
              ) : (
                <motion.p
                  key="desc-1"
                  className="text-[#E0E0E0] font-[Poppins] text-[45px] not-italic font-normal leading-[54px] tracking-[-0.52px] w-2/3"
                >
                  {renderSpans(
                    "An initiative dedicated to empowering the next generation of IT professionals",
                    6
                  )}
                </motion.p>
              )}
            </AnimatePresence>

            <AnimatePresence initial={false} mode="wait">
              {pastHalf ? (
                <motion.p
                  key="title-2"
                  className="text-[#C4C4C4] font-[Poppins] text-[20px] not-italic font-normal leading-[65px] tracking-[-0.23px]"
                >
                  {renderSpans("Our Mission", 4)}
                </motion.p>
              ) : (
                <motion.p
                  key="title-1"
                  className="text-[#C4C4C4] font-[Poppins] text-[20px] not-italic font-normal leading-[65px] tracking-[-0.23px]"
                >
                  {renderSpans("Our Vision", 4)}
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
            {visionImages.map((item, i) => (
              <div
                key={i}
                className={`w-1/6 h-full flex-none relative overflow-hidden ${
                  item.containerClassName ?? ""
                }`}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {item.src ? (
                  <Image
                    src={item.src}
                    alt={item.alt ?? `Vision image ${i + 1}`}
                    fill
                    className={`w-full h-full object-cover ${
                      hoveredIndex === i ? "grayscale-0" : "grayscale"
                    } transition-all duration-200 brightness-80 ${item.className ?? ""}`}
                    sizes="(max-width: 1024px) 50vw, 33vw"
                    priority={i < 2}
                  />
                ) : null}
                <div
                  className={`absolute w-full h-full bg-[#133769] mix-blend-color z-10 ${
                    item.overlayClassName ?? ""
                  } ${hoveredIndex === i ? "opacity-0" : "opacity-100"}`}
                ></div>
              </div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
};
