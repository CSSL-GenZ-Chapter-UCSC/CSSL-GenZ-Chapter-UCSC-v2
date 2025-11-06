"use client";

import { Container } from "../shared/Container";
import { useEffect, useRef, useState } from "react";

// Dummy data for events with images
const EVENTS_DATA = [
    {
        id: 1,
        date: "Sep 2025",
        title: "INFINITELOOP 3.0",
        className: "event-card-0",
        images: [
            { id: 1, color: "bg-gradient-to-br from-blue-500 to-blue-700" },
            { id: 2, color: "bg-gradient-to-br from-purple-500 to-purple-700" },
            { id: 3, color: "bg-gradient-to-br from-pink-500 to-pink-700" },
            { id: 4, color: "bg-gradient-to-br from-red-500 to-red-700" },
        ],
    },
    {
        id: 2,
        date: "Oct 2025",
        title: "IEEEXTREME 19.0",
        className: "event-card-1",
        images: [
            { id: 5, color: "bg-gradient-to-br from-green-500 to-green-700" },
            { id: 6, color: "bg-gradient-to-br from-teal-500 to-teal-700" },
            { id: 7, color: "bg-gradient-to-br from-cyan-500 to-cyan-700" },
            { id: 8, color: "bg-gradient-to-br from-blue-500 to-blue-700" },
        ],
    },
    {
        id: 3,
        date: "Nov 2025",
        title: "PROJECT SHIELD",
        className: "event-card-2",
        images: [
            { id: 9, color: "bg-gradient-to-br from-yellow-500 to-yellow-700" },
            { id: 10, color: "bg-gradient-to-br from-orange-500 to-orange-700" },
            { id: 11, color: "bg-gradient-to-br from-red-500 to-red-700" },
            { id: 12, color: "bg-gradient-to-br from-pink-500 to-pink-700" },
        ],
    },
];

// 🎯 THRESHOLD: Change active element when its top is 350px from viewport top
const ACTIVATION_THRESHOLD = 350;

export default function EventsSection() {
    const [activeEventIndex, setActiveEventIndex] = useState(0);

    const blueContainerRef = useRef<HTMLDivElement>(null);
    const scrollableContentRef = useRef<HTMLDivElement>(null);
    const eventCardRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        function handleWheel(e: WheelEvent) {
            const scrollable = scrollableContentRef.current;
            if (!scrollable) return;

            e.preventDefault();

            const currentScroll = scrollable.scrollTop;
            const maxScroll = scrollable.scrollHeight - scrollable.clientHeight;
            const newScroll = currentScroll + e.deltaY;

            // Update scroll position
            if (newScroll >= 0 && newScroll <= maxScroll) {
                scrollable.scrollTop = newScroll;
            } else if (newScroll < 0) {
                scrollable.scrollTop = 0;
            } else {
                scrollable.scrollTop = maxScroll;
            }

            // 📍 Current scroll position (viewportTop)
            const viewportTop = scrollable.scrollTop;

            console.log("📍 Scroll position (viewportTop):", viewportTop);
            console.log("🎯 Activation threshold:", ACTIVATION_THRESHOLD);

            // Find which element should be active
            let newActiveIndex = 0;

            // Loop through all event cards
            for (let i = 0; i < eventCardRefs.current.length; i++) {
                const card = eventCardRefs.current[i];
                if (!card) continue;

                // Get element's position from top of scrollable container
                const elementTop = card.offsetTop;

                console.log(`  Event ${i}: elementTop = ${elementTop}px`);

                // Calculate: How far is this element's top from viewport top?
                const distanceFromViewportTop = elementTop - viewportTop;

                console.log(`    Distance from viewport top: ${distanceFromViewportTop}px`);

                // Rule: Element becomes active when its top reaches 350px from viewport top
                // In other words: elementTop - viewportTop <= 350
                // Rearranged: elementTop <= viewportTop + 350
                if (elementTop <= viewportTop + ACTIVATION_THRESHOLD) {
                    newActiveIndex = i;
                    console.log(`    ✓ Element ${i} is active (top at or above threshold)`);
                } else {
                    console.log(`    ✗ Element ${i} is below threshold, stopping`);
                    break;
                }
            }

            console.log(`🎯 Active index: ${newActiveIndex}\n`);

            // Update state if changed
            if (newActiveIndex !== activeEventIndex) {
                console.log(`🔄 Active changed: ${activeEventIndex} → ${newActiveIndex}`);
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

    return (
        <Container className="relative z-10 py-32 lg:py-40">
            <div
                className="bg-blue-700 min-h-[920px] flex rounded-lg overflow-hidden"
                ref={blueContainerRef}
            >
                {/* LEFT SECTION: Event cards */}
                <div
                    className="w-[53%] flex flex-col h-[920px] overflow-y-auto scrollbar-hide"
                    ref={scrollableContentRef}
                    id="scrollable-container"
                >
                    {EVENTS_DATA.map((event, index) => (
                        <div
                            key={event.id}
                            ref={(el) => {
                                eventCardRefs.current[index] = el;
                            }}
                            className={`${event.className} flex items-center justify-between h-[705px] shrink-0 transition-all duration-300 ${
                                activeEventIndex === index
                                    ? "bg-green-400"
                                    : "bg-green-400/50"
                            }`}
                            id={`event-${index}`}
                        >
                            {/* Date section */}
                            <div
                                className={`date-section bg-amber-300 text-black flex items-center justify-center w-[18%] h-[215px] transition-all duration-300 ${
                                    activeEventIndex === index
                                        ? "font-bold text-xl"
                                        : "text-base opacity-70"
                                }`}
                            >
                                {event.date}
                            </div>

                            {/* Event title section */}
                            <div
                                className={`title-section bg-red-500 min-h-[215px] w-[80%] h-[215px] flex items-center justify-center text-white text-2xl font-bold transition-all duration-300 ${
                                    activeEventIndex === index ? "scale-105" : "scale-100"
                                }`}
                            >
                                {event.title}
                            </div>
                        </div>
                    ))}

                    {/* Spacer div - allows last element to be centered */}
                    <div
                        className="w-full h-[200px] shrink-0"
                        id="bottom-spacer"
                    >
                        {/* Empty spacer */}
                    </div>
                </div>

                {/* RIGHT SECTION: Event photos */}
                <div
                    className="grid grid-rows-4 grid-cols-2 gap-2 h-[920px] w-[47%] bg-black p-3"
                    id="photos-section"
                >
                    {getActiveImages().map((image, index) => (
                        <div
                            key={image.id}
                            className={`
                                photo-item
                                ${image.color}
                                rounded-lg
                                flex items-center justify-center
                                text-white font-bold text-5xl
                                shadow-lg
                                ${index === 0 ? "col-span-2" : ""}
                                ${index === 1 ? "col-span-2 row-span-2" : ""}
                            `}
                        >
                            {image.id}
                        </div>
                    ))}
                </div>
            </div>
        </Container>
    );
}