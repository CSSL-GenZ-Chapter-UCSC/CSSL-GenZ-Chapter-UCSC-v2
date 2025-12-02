"use client";

import { Container } from "../shared/Container";
import { useEffect, useRef, useState } from "react";
import type { Event } from "../../types/event";

// Props interface - receives events from server component
interface EventsSectionProps {
  events: Event[];
}

// 🎯 THRESHOLD: Change active element when its top is 350px from viewport top
const ACTIVATION_THRESHOLD = 350;

export function EventsSection({ events }: EventsSectionProps) {
    const [activeEventIndex, setActiveEventIndex] = useState(0);
    const [pinHeight, setPinHeight] = useState<number>(0);

    const sectionWrapperRef = useRef<HTMLDivElement>(null);
    const blueContainerRef = useRef<HTMLDivElement>(null);
    const scrollableContentRef = useRef<HTMLDivElement>(null);
    const eventCardRefs = useRef<(HTMLDivElement | null)[]>([]);

    // Transform Sanity events to component format
    const EVENTS_DATA = events.map((event, index) => {
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
    });

    // Measure scrollable content height so sticky container can release naturally when done
    useEffect(() => {
        const measure = () => {
            const sc = scrollableContentRef.current;
            if (!sc) return;
            setPinHeight(sc.scrollHeight);
        };

        const raf = requestAnimationFrame(measure);

        const sc = scrollableContentRef.current;
        let ro: ResizeObserver | undefined;
        if (sc && 'ResizeObserver' in window) {
            ro = new ResizeObserver(() => measure());
            ro.observe(sc);
        }
        window.addEventListener('resize', measure);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('resize', measure);
            ro?.disconnect();
        };
    }, [events.length]);

    useEffect(() => {
        function handleWheel(e: WheelEvent) {
            const scrollable = scrollableContentRef.current;
            if (!scrollable) return;

            const currentScroll = scrollable.scrollTop;
            const maxScroll = scrollable.scrollHeight - scrollable.clientHeight;
            const newScroll = currentScroll + e.deltaY;

            // Check if at bottom and trying to scroll down further
            const isAtBottom = currentScroll >= maxScroll - 1; // -1 for floating point tolerance
            const isScrollingDown = e.deltaY > 0;

            // Check if at top and trying to scroll up further
            const isAtTop = currentScroll <= 1; // 1px tolerance
            const isScrollingUp = e.deltaY < 0;

            // Allow default scroll behavior when:
            // 1. At bottom and scrolling down (user wants to scroll page below)
            // 2. At top and scrolling up (user wants to scroll page above)
            if ((isAtBottom && isScrollingDown) || (isAtTop && isScrollingUp)) {
                // Don't prevent default - allow normal page scroll
                return;
            }

            // Prevent default for custom scroll within container
            e.preventDefault();

            // Update scroll position
            if (newScroll >= 0 && newScroll <= maxScroll) {
                scrollable.scrollTop = newScroll;
            } else if (newScroll < 0) {
                scrollable.scrollTop = 0;
            } else {
                scrollable.scrollTop = maxScroll;
            }

            // Find which element should be active
            const viewportTop = scrollable.scrollTop;
            let newActiveIndex = 0;

            // Loop through all event cards
            for (let i = 0; i < eventCardRefs.current.length; i++) {
                const card = eventCardRefs.current[i];
                if (!card) continue;

                const elementTop = card.offsetTop;

                if (elementTop <= viewportTop + ACTIVATION_THRESHOLD) {
                    newActiveIndex = i;
                } else {
                    break;
                }
            }

            // Update state if changed
            if (newActiveIndex !== activeEventIndex) {
                setActiveEventIndex(newActiveIndex);
            }
        }

        const container = blueContainerRef.current;
        if (!container) return;

        container.addEventListener("wheel", handleWheel, { passive: false });

        return () => {
            container.removeEventListener("wheel", handleWheel);
        };
    }, [activeEventIndex]);

    function getActiveImages() {
        return EVENTS_DATA[activeEventIndex].images;
    }

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
                <div className="bg-linear-to-br from-[#000000] via-[#0F2248] to-[#1E448F] h-screen flex items-center justify-center rounded-lg overflow-hidden">
                    <div className="text-center text-white">
                        <h3 className="text-2xl font-semibold mb-2">No Events Available</h3>
                        <p className="text-white/60">Please add events in Sanity Studio to display them here.</p>
                    </div>
                </div>
            </Container>
        );
    }

    return (
        <main 
            ref={sectionWrapperRef}
            className="relative"
            style={{ height: pinHeight ? `${pinHeight}px` : '100vh' }}
        >
            <div
                className="bg-linear-to-br from-[#000000] via-[#0F2248] to-[#1E448F] sticky top-0 h-screen flex rounded-lg overflow-hidden"
                ref={blueContainerRef}
            >
                {/* LEFT SECTION: Event cards */}
                <div
                    className="w-[53%] flex flex-col h-screen overflow-y-auto scrollbar-hide"
                    ref={scrollableContentRef}
                    id="scrollable-container"
                >
                    {EVENTS_DATA.map((event, index) => (
                        <div
                            key={event.id}
                            ref={(el) => {
                                eventCardRefs.current[index] = el;
                            }}
                            className={`${event.className} flex items-center justify-between h-[55vh] shrink-0 transition-all duration-300`}
                            id={`event-${index}`}
                        >
                            {/* Date section */}
                            <div
                                className={`date-section text-white flex items-center justify-center w-[18%] h-[18vh] transition-all duration-300 ${
                                    activeEventIndex === index
                                        ? "font-bold text-xl"
                                        : "text-base opacity-70"
                                }`}
                            >
                                {event.date}
                            </div>

                            {/* Event details container (replaces old title section) */}
                            <div
                                className={`event-details-container w-[80%] min-h-[18vh] max-h-[30vh] flex flex-col transition-all duration-300 ${
                                    activeEventIndex === index ? "scale-105" : "scale-100"
                                }`}
                            >
                                {/* Logo section - 80px height */}
                                {event.logo && (
                                    <div className="logo-section h-[6vh] flex items-center overflow-hidden py-2 px-2 shrink-0">
                                        <img
                                            src={event.logo}
                                            alt={`${event.title} logo`}
                                            className="h-full w-auto object-contain"
                                        />
                                    </div>
                                )}

                                {/* Title section */}
                                <div className="title-section min-h-[6vh] flex items-center text-white font-bold text-[45px] font-poppins px-3 py-2 shrink-0">
                                    <span className="leading-tight">{event.title}</span>
                                </div>

                                {/* Short Summary section - Remaining height (215px - 80px - 35px = 100px) */}
                                <div className="shortSummary-section flex-1 flex items-center text-white text-[15px] font-poppins px-4 py-4 overflow-hidden">
                                    <p className="line-clamp-4 text-left">
                                        {event.shortSummary}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Spacer div - allows last element to be centered */}
                    <div
                        className="w-full h-[15vh] shrink-0"
                        id="bottom-spacer"
                    >
                        {/* Empty spacer */}
                    </div>
                </div>

                {/* RIGHT SECTION: Event photos */}
                <div
                    className="grid grid-rows-4 grid-cols-2 gap-1.5 h-screen w-[47%] p-3"
                    id="photos-section"
                >
                    {getActiveImages()
                        .filter(image => image.url) // Only show images with URLs
                        .map((image, index, filteredArray) => (
                        <div
                            key={image.id}
                            className={`
                                photo-item
                                rounded-lg
                                overflow-hidden
                                ${getImageLayoutClass(index, filteredArray.length)}
                            `}
                        >
                            <img
                                src={image.url!}
                                alt={image.alt || "Event image"}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}