"use client";

import { Container } from "../shared/Container";
import { useEffect, useRef, useState } from "react";

// Dummy data for events with images
const EVENTS_DATA = [
    {
        id: 1,
        date: "Sep 2025",
        title: "INFINITELOOP 3.0",
        logo: "https://via.placeholder.com/80", // Placeholder logo
        excerpt: "Annual coding competition featuring algorithmic challenges and creative problem-solving.",
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
        logo: "https://via.placeholder.com/80",
        excerpt: "24-hour global programming competition testing coding skills and endurance.",
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
        logo: "https://via.placeholder.com/80",
        excerpt: "Cybersecurity workshop covering ethical hacking and network security fundamentals.",
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

                            {/* Event details container (replaces old title section) */}
                            <div
                                className={`event-details-container w-[80%] h-[215px] flex flex-col transition-all duration-300 ${
                                    activeEventIndex === index ? "scale-105" : "scale-100"
                                }`}
                            >
                                {/* Logo section - 80px height */}
                                <div className="logo-section h-[80px] bg-purple-500 flex items-center overflow-hidden">
                                    <img
                                        src={event.logo}
                                        alt={`${event.title} logo`}
                                        className="h-full w-auto object-contain"
                                    />
                                </div>

                                {/* Title section - 35px height */}
                                <div className="title-section h-[35px] bg-red-500 flex items-center text-white font-bold text-lg px-2 overflow-hidden">
                                    <span className="truncate">{event.title}</span>
                                </div>

                                {/* Excerpt section - Remaining height (215px - 80px - 35px = 100px) */}
                                <div className="excerpt-section flex-1 bg-blue-600 flex items-center text-white text-sm px-4 py-2 overflow-hidden">
                                    <p className="line-clamp-4 text-center">
                                        {event.excerpt}
                                    </p>
                                </div>
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