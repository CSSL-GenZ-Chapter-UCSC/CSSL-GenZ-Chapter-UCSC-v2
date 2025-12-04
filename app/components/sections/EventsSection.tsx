"use client";

import { Container } from "../shared/Container";
import { useRef, useState, useMemo } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import type { Event } from "../../types/event";

// Props interface - receives events from server component
interface EventsSectionProps {
  events: Event[];
}

// 🎯 THRESHOLD: Scroll amount required to trigger a jump
const SCROLL_PER_EVENT = 50; // 100vh per event

export function EventsSection({ events }: EventsSectionProps) {
  const [activeEventIndex, setActiveEventIndex] = useState(0);

  const sectionWrapperRef = useRef<HTMLDivElement>(null);
  const blueContainerRef = useRef<HTMLDivElement>(null);
  const scrollableContentRef = useRef<HTMLDivElement>(null);
  const eventCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Transform Sanity events to component format
  const EVENTS_DATA = useMemo(
    () =>
      events.map((event, index) => {
        // Always return exactly four slots in a fixed order
        const images = [
          {
            id: `${event._id}-sub`,
            url: event.subMainImage?.url ?? null,
            alt: event.subMainImage?.alt || event.title,
          },
          {
            id: `${event._id}-main`,
            url: event.mainImage?.url ?? null,
            alt: event.mainImage?.alt || event.title,
          },
          {
            id: `${event._id}-other1`,
            url: event.otherImage1?.url ?? null,
            alt: event.otherImage1?.alt || event.title,
          },
          {
            id: `${event._id}-other2`,
            url: event.otherImage2?.url ?? null,
            alt: event.otherImage2?.alt || event.title,
          },
        ];

        return {
          id: event._id,
          date: new Date(event.startDate).toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          }),
          title: event.title,
          logo: event.logo?.url,
          shortSummary: event.shortSummary || "",
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
      <Container className="relative z-10 py-16 lg:py-20">
        <div className="bg-black h-screen flex items-center justify-center rounded-lg overflow-hidden">
          <div className="text-center text-white">
            <h3 className="text-2xl font-semibold mb-2">No Events Available</h3>
            <p className="text-white/60">
              Please add events in Sanity Studio to display them here.
            </p>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <main
      ref={sectionWrapperRef}
      className="relative"
      style={{ height: `${EVENTS_DATA.length * SCROLL_PER_EVENT + 100}vh` }}
    >
      <div
        className="bg-black sticky top-0 h-screen flex rounded-lg overflow-hidden"
        ref={blueContainerRef}
      >
        {/* LEFT SECTION: Event cards */}
        <div
          className="w-[53%] flex flex-col h-screen overflow-hidden relative"
          ref={scrollableContentRef}
          id="scrollable-container"
        >
          <motion.div
            animate={{
              y: `calc(50vh - ${activeEventIndex * 55}vh - 27.5vh)`, // Center the active card (55vh height / 2 = 27.5vh)
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute w-full"
          >
            {EVENTS_DATA.map((event, index) => (
              <motion.div
                key={event.id}
                ref={(el) => {
                  eventCardRefs.current[index] = el;
                }}
                className={`${event.className} flex items-center justify-start h-[55vh] shrink-0 transition-all duration-300`}
                id={`event-${index}`}
                animate={{
                  opacity: activeEventIndex === index ? 1 : 0.5,
                }}
              >
                {/* Date section */}
                <div
                  className={`date-section flex items-center justify-center w-[13%] h-[18vh] transition-all duration-300 ${
                    activeEventIndex === index
                      ? " text-white"
                      : "text-base text-white/70"
                  }`}
                >
                  {event.date}
                </div>

                {/* Event details container */}
                <div
                  className={`event-details-container w-[80%] min-h-[18vh] max-h-[30vh] flex flex-col transition-all duration-300`}
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
                      />
                    </div>
                  )}

                  {/* Title section */}
                  <motion.div
                    className="title-section min-h-[6vh] flex items-center font-poppins px-3 shrink-0 uppercase text-[45px] font-semibold leading-normal"
                    animate={{
                      color: activeEventIndex === index ? "#ffffff" : "#318AFF",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="leading-tight">{event.title}</span>
                  </motion.div>

                  {/* Short Summary section */}
                  <div
                    className={`shortSummary-section flex-1 flex items-center font-poppins px-4 text-[17px] font-normal leading-[23px] ${
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
        <div
          className="grid grid-rows-4 grid-cols-2 gap-1.5 h-screen w-[47%] p-3"
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
                  className={`
                                  photo-item
                                  bg-gray-200
                                  overflow-hidden
                                  relative
                                  ${getImageLayoutClass(index, filteredArray.length)}
                              `}
                >
                  <Image
                    src={image.url!}
                    alt={image.alt || "Event image"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
