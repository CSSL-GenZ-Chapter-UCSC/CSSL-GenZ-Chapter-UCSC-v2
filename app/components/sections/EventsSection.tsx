"use client";

import { Container } from "../shared/Container";
import { useEffect, useRef, useState } from "react";
import type { Event } from "../../types/event";

// Props interface - receives events from server component
interface EventsSectionProps {
  events: Event[];
}

// Dummy data for events with images (fallback)
const DUMMY_EVENTS_DATA = [
    {
        id: "1",
        date: "Sep 2025",
        title: "INFINITELOOP 3.0",
        logo: "https://via.placeholder.com/200x80/8B5CF6/FFFFFF?text=LOGO",
        excerpt: "Annual coding competition for developers. Join us for an exciting challenge!",
        className: "event-card-0",
        images: [
            { id: "1-sub", url: "https://via.placeholder.com/800x600/3B82F6/FFFFFF?text=INFINITELOOP+Main", alt: "INFINITELOOP Main" },
            { id: "1-main", url: "https://via.placeholder.com/1600x800/8B5CF6/FFFFFF?text=INFINITELOOP+Wide", alt: "INFINITELOOP Wide" },
            { id: "1-other1", url: "https://via.placeholder.com/800x800/EC4899/FFFFFF?text=INFINITELOOP+1", alt: "INFINITELOOP 1" },
            { id: "1-other2", url: "https://via.placeholder.com/800x800/EF4444/FFFFFF?text=INFINITELOOP+2", alt: "INFINITELOOP 2" },
        ],
    },
    {
        id: "2",
        date: "Oct 2025",
        title: "IEEEXTREME 19.0",
        logo: "https://via.placeholder.com/200x80/14B8A6/FFFFFF?text=LOGO",
        excerpt: "24-hour global programming competition. Test your skills against the world!",
        className: "event-card-1",
        images: [
            { id: "2-sub", url: "https://via.placeholder.com/800x600/10B981/FFFFFF?text=IEEEXTREME+Main", alt: "IEEEXTREME Main" },
            { id: "2-main", url: "https://via.placeholder.com/1600x800/14B8A6/FFFFFF?text=IEEEXTREME+Wide", alt: "IEEEXTREME Wide" },
            { id: "2-other1", url: "https://via.placeholder.com/800x800/06B6D4/FFFFFF?text=IEEEXTREME+1", alt: "IEEEXTREME 1" },
            { id: "2-other2", url: "https://via.placeholder.com/800x800/3B82F6/FFFFFF?text=IEEEXTREME+2", alt: "IEEEXTREME 2" },
        ],
    },
    {
        id: "3",
        date: "Nov 2025",
        title: "PROJECT SHIELD",
        logo: "https://via.placeholder.com/200x80/F97316/FFFFFF?text=LOGO",
        excerpt: "Cybersecurity awareness and workshop. Learn to protect your digital assets!",
        className: "event-card-2",
        images: [
            { id: "3-sub", url: "https://via.placeholder.com/800x600/EAB308/FFFFFF?text=PROJECT+SHIELD+Main", alt: "PROJECT SHIELD Main" },
            { id: "3-main", url: "https://via.placeholder.com/1600x800/F97316/FFFFFF?text=PROJECT+SHIELD+Wide", alt: "PROJECT SHIELD Wide" },
            { id: "3-other1", url: "https://via.placeholder.com/800x800/EF4444/FFFFFF?text=PROJECT+SHIELD+1", alt: "PROJECT SHIELD 1" },
            { id: "3-other2", url: "https://via.placeholder.com/800x800/EC4899/FFFFFF?text=PROJECT+SHIELD+2", alt: "PROJECT SHIELD 2" },
        ],
    },
];

// 🎯 THRESHOLD: Change active element when its top is 350px from viewport top
const ACTIVATION_THRESHOLD = 350;

export default function EventsSection({ events }: EventsSectionProps) {
    const [activeEventIndex, setActiveEventIndex] = useState(0);

    const blueContainerRef = useRef<HTMLDivElement>(null);
    const scrollableContentRef = useRef<HTMLDivElement>(null);
    const eventCardRefs = useRef<(HTMLDivElement | null)[]>([]);

    // Transform Sanity events to component format
    const transformedEvents = events.map((event, index) => {
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
            excerpt: event.excerpt || "",
            className: `event-card-${index}`,
            images,
        };
    });

    // Use transformed events or fallback to dummy data
    const EVENTS_DATA = transformedEvents.length > 0 ? transformedEvents : DUMMY_EVENTS_DATA;

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
        <Container className="relative z-10 py-16 lg:py-20">
            <div
                className="bg-gradient-to-br from-[#000000] via-[#0F2248] to-[#1E448F] h-[80vh] flex rounded-lg overflow-hidden"
                ref={blueContainerRef}
            >
                {/* LEFT SECTION: Event cards */}
                <div
                    className="w-[53%] flex flex-col h-[80vh] overflow-y-auto scrollbar-hide"
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
                                className={`event-details-container w-[80%] h-[18vh] flex flex-col transition-all duration-300 ${
                                    activeEventIndex === index ? "scale-105" : "scale-100"
                                }`}
                            >
                                {/* Logo section - 80px height */}
                                <div className="logo-section h-[6vh] flex items-center overflow-hidden py-2 px-2">
                                    {event.logo ? (
                                        <img
                                            src={event.logo}
                                            alt={`${event.title} logo`}
                                            className="h-full w-auto object-contain"
                                        />
                                    ) : (
                                        <div className="text-white text-xs">No Logo</div>
                                    )}
                                </div>

                                {/* Title section */}
                                <div className="title-section h-[4vh] flex items-center text-white font-bold text-[45px] font-poppins px-3 py-2 overflow-hidden">
                                    <span className="truncate">{event.title}</span>
                                </div>

                                {/* Excerpt section - Remaining height (215px - 80px - 35px = 100px) */}
                                <div className="excerpt-section flex-1 flex items-center text-white text-[15px] font-poppins px-4 py-2 overflow-hidden">
                                    <p className="line-clamp-4 text-left">
                                        {event.excerpt}
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
                    className="grid grid-rows-4 grid-cols-2 gap-1.5 h-[80vh] w-[47%] p-3"
                    id="photos-section"
                >
                    {getActiveImages().map((image, index) => (
                        <div
                            key={image.id}
                            className={`
                                photo-item
                                rounded-lg
                                overflow-hidden
                                ${index === 0 ? "col-span-2" : ""}
                                ${index === 1 ? "col-span-2 row-span-2" : ""}
                            `}
                        >
                            {image.url ? (
                                <img
                                    src={image.url}
                                    alt={image.alt || "Event image"}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-white/20 rounded-lg"></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </Container>
    );
}