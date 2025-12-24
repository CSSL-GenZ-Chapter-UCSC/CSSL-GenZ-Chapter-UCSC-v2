"use client";

import { Container } from "../shared/Container";
import { useRef, useState, useMemo, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";
import type { Event } from "../../types/event";

// Props interface - receives events from server component
interface EventsSectionProps {
  events: Event[];
}

// scroll amount required to trigger a jump
const SCROLL_PER_EVENT = 50;

export function EventsSection({ events }: EventsSectionProps) {
  const [activeEventIndex, setActiveEventIndex] = useState(0);
  const [hoveredImageIndex, setHoveredImageIndex] = useState<number | null>(
    null
  );
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const sectionWrapperRef = useRef<HTMLDivElement>(null);
  const blueContainerRef = useRef<HTMLDivElement>(null);
  const scrollableContentRef = useRef<HTMLDivElement>(null);
  const eventCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Transform Sanity events to component format
  const EVENTS_DATA = useMemo(
    () =>
      events.map((event, index) => {
        // Build images array from mainImage + photos (first 3 photos)
        const images = [
          // Main image in slot 1
          {
            id: `${event._id}-main`,
            url: event.mainImage?.url ?? null,
            alt: event.mainImage?.alt || event.title,
          },
          // Photos from array fill remaining slots
          ...(event.photos || []).slice(0, 3).map((photo, i) => ({
            id: `${event._id}-photo-${i}`,
            url: photo?.url ?? null,
            alt: photo?.alt || event.title,
          })),
        ];

        const truncateText = (text: string, limit: number) => {
          if (!text) return "";
          const words = text.split(" ");
          if (words.length <= limit) return text;
          return words.slice(0, limit).join(" ") + "...";
        };

        return {
          id: event._id,
          date: new Date(event.startDate).toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          }),
          title: event.title,
          logo: event.logo?.url,
          shortSummary: truncateText(event.shortSummary || "", 24),
          className: `event-card-${index}`,
          images,
        };
      }),
    [events]
  );

  const { scrollYProgress } = useScroll({
    target: sectionWrapperRef,
    offset: ["start start", "end end"],
  });

  const { scrollYProgress: enterProgress } = useScroll({
    target: sectionWrapperRef,
    offset: ["start end", "start start"],
  });

  const { scrollYProgress: exitProgress } = useScroll({
    target: sectionWrapperRef,
    offset: ["end end", "end start"],
  });

  const dimension = useTransform(
    [enterProgress, exitProgress],
    ([enter, exit]: number[]) => `${100 - 50 * enter + 50 * exit}%`
  );

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Map 0-1 to 0-(n-1)
    const newIndex = Math.min(
      Math.floor(latest * EVENTS_DATA.length),
      EVENTS_DATA.length - 1
    );
    setActiveEventIndex(newIndex);
  });

  const activeImages = useMemo(() => {
    if (!EVENTS_DATA[activeEventIndex]) return [];
    return EVENTS_DATA[activeEventIndex].images;
  }, [EVENTS_DATA, activeEventIndex]);

  function getImageLayoutClass(index: number, totalImages: number) {
    if (isMobile) {
      // Mobile Layout (2 rows)
      if (totalImages === 4) {
        // Hide first image (sub), show Main (row 1), show Others (row 2)
        if (index === 0) return "hidden";
        if (index === 1) return "col-span-2";
        return "";
      }
      if (totalImages === 3) {
        // If we have 3 images, assume Main + 2 Others or Sub + Main + Other
        // Try to fill 2 rows
        if (index === 0) return "col-span-2"; // Row 1
        return ""; // Row 2 (split)
      }
      if (totalImages === 2) {
        return "col-span-2"; // Stacked
      }
      if (totalImages === 1) {
        return "col-span-2 row-span-2";
      }
    }

    // 4 images: original layout
    if (totalImages === 4) {
      if (index === 0) return "col-span-2";
      if (index === 1) return "col-span-2 row-span-2";
      return "";
    }

    // 3 images: image 2 spans bottom row
    if (totalImages === 3) {
      if (index === 0) return "col-span-2";
      if (index === 1) return "col-span-2 row-span-2";
      if (index === 2) return "col-span-2";
      return "";
    }

    // 2 images: split vertically 50/50
    if (totalImages === 2) {
      return "col-span-2 row-span-2";
    }

    // 1 image: full area
    if (totalImages === 1) {
      return "col-span-2 row-span-4";
    }

    return "";
  }

  // Show "no events" message if no events are provided
  if (EVENTS_DATA.length === 0) {
    return (
      <div ref={sectionWrapperRef}>
        <Container className="relative z-10 py-16 lg:py-20">
          <div className="h-screen flex items-center justify-center rounded-lg overflow-hidden">
            <div className="text-center text-white">
              <h3 className="text-2xl font-semibold mb-2">
                No Events Available
              </h3>
              <p className="text-white/60">
                Please add events in Sanity Studio to display them here.
              </p>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <main
      ref={sectionWrapperRef}
      className="relative"
      style={{ height: `${EVENTS_DATA.length * SCROLL_PER_EVENT + 100}vh` }}
    >
      <motion.div
        className="bg-black sticky top-0 h-screen flex md:items-stretch items-end rounded-lg overflow-hidden"
        ref={blueContainerRef}
      >
        {/* LEFT SECTION: Event cards */}
        <div
          className="md:w-[50%] w-full flex flex-col md:h-screen h-1/2 overflow-hidden relative"
          ref={scrollableContentRef}
          id="scrollable-container"
        >
          <motion.div
            animate={{
              y: `calc(${
                isMobile ? 25 : 50
              }vh - ${activeEventIndex * 55}vh - 27.5vh)`, // Center the active card (55vh height / 2 = 27.5vh)
            }}
            transition={{ type: "tween", duration: 0.6, ease: "easeOut" }}
            style={{
              // Safari optimization
              transform: "translate3d(0,0,0)",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
            className="absolute w-full will-change-transform"
          >
            {EVENTS_DATA.map((event, index) => (
              <motion.div
                key={event.id}
                ref={(el) => {
                  eventCardRefs.current[index] = el;
                }}
                className={`${event.className} flex items-center justify-start h-[55vh] shrink-0 will-change-[opacity,filter]`}
                id={`event-${index}`}
                animate={{
                  opacity: activeEventIndex === index ? 1 : 0.7,
                  filter:
                    activeEventIndex === index ? "blur(0px)" : "blur(8px)",
                }}
                style={{
                  // Safari optimization
                  transform: "translate3d(0,0,0)",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {/* Date section */}
                <div
                  className={`date-section text-sm md:text-base flex items-center ml-5 md:ml-0 justify-center w-[13%] h-[18vh] transition-all duration-300 ${
                    activeEventIndex === index
                      ? " text-white"
                      : "text-base text-white/70"
                  }`}
                >
                  {event.date}
                </div>

                {/* Event details container */}
                <div
                  className={`event-details-container lg:w-[60%] md:w-[70%] w-[80%] min-h-[18vh] max-h-[30vh] flex flex-col transition-all duration-300`}
                >
                  {/* Logo section - 80px height */}
                  {event.logo && (
                    <div className="logo-section h-[6vh] flex items-center overflow-hidden px-2 shrink-0">
                      <Image
                        src={event.logo}
                        alt={`${event.title} logo`}
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="h-full w-auto object-contain brightness-0 invert"
                        loading="lazy"
                      />
                    </div>
                  )}

                  {/* Title section */}
                  <motion.div
                    className="title-section min-h-[6vh] flex items-center font-poppins px-3 shrink-0 uppercase md:text-[40px] text-[28px] font-semibold leading-normal"
                    animate={{
                      color: activeEventIndex === index ? "#ffffff" : "#318AFF",
                    }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <span className="leading-tight">{event.title}</span>
                  </motion.div>

                  {/* Short Summary section */}
                  <div
                    className={`shortSummary-section flex-1 flex items-center font-poppins px-4 md:text-[17px] text-xs font-normal md:leading-[23px] leading-4 ${
                      activeEventIndex === index
                        ? "text-[#acacac]"
                        : "text-[#318AFF]/70"
                    }`}
                  >
                    <p className="line-clamp-4 text-left">
                      {event.shortSummary}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT SECTION: Event photos */}
        <motion.div
          style={{
            width: isMobile ? "100%" : dimension,
            height: isMobile ? dimension : "100%",
            // Safari optimization
            transform: "translate3d(0,0,0)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
          className={`absolute right-0 top-0 md:h-full bg-black grid ${
            isMobile ? "grid-rows-2 px-3 py-0" : "grid-rows-4"
          } grid-cols-2 gap-3 py-3 z-20`}
          id="photos-section"
        >
          <AnimatePresence mode="popLayout">
            {activeImages
              .filter((image) => image.url) // Only show images with URLs
              .map((image, index, filteredArray) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, filter: "blur(8px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(8px)" }}
                  transition={{
                    duration: 0.5,
                    ease: "easeOut",
                    delay: index * 0.15,
                  }}
                  style={{
                    // Safari optimization
                    transform: "translate3d(0,0,0)",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                  className={` photo-item   bg-gray-200   overflow-hidden  relative will-change-[opacity,filter] ${getImageLayoutClass(index, filteredArray.length)}
                              `}
                  onMouseEnter={() => setHoveredImageIndex(index)}
                  onMouseLeave={() => setHoveredImageIndex(null)}
                >
                  <Image
                    src={image.url!}
                    alt={image.alt || "Event image"}
                    fill
                    className={`object-cover transition-all duration-200 brightness-80 ${
                      hoveredImageIndex === index ? "grayscale-0" : "grayscale"
                    }`}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    loading={activeEventIndex === 0 ? "eager" : "lazy"}
                    priority={activeEventIndex === 0}
                  />
                  <div
                    className={`absolute w-full h-full bg-[#133769] mix-blend-color z-10 transition-opacity duration-200 ${
                      hoveredImageIndex === index ? "opacity-0" : "opacity-100"
                    }`}
                  ></div>
                </motion.div>
              ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </main>
  );
}
