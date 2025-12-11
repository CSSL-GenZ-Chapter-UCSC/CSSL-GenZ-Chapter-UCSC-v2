"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Event } from "@/app/types/event";

interface SimilarEventsCarouselProps {
  events: Event[];
}

export default function SimilarEventsCarousel({
  events,
}: SimilarEventsCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(events.length > 1);

  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth;
      const newScrollLeft =
        direction === "left"
          ? scrollContainerRef.current.scrollLeft - scrollAmount
          : scrollContainerRef.current.scrollLeft + scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });

      setTimeout(checkScrollPosition, 300);
    }
  };

  return (
    <div className="relative">
      <div
        ref={scrollContainerRef}
        onScroll={checkScrollPosition}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-3 gap-6 md:gap-8"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {events.map((similarEvent) => (
          <Link
            key={similarEvent._id}
            href={`/events/${similarEvent.slug.current}`}
            className="group shrink-0 w-full snap-center md:w-auto md:shrink"
          >
            <div className="overflow-hidden">
              {/* Event Image */}
              {similarEvent.mainImage?.url || similarEvent.subMainImage?.url ? (
                <div className="aspect-video bg-gray-700 mb-4 rounded-lg overflow-hidden relative">
                  <Image
                    src={
                      similarEvent.mainImage?.url ||
                      similarEvent.subMainImage?.url ||
                      ""
                    }
                    alt={similarEvent.mainImage?.alt || similarEvent.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ) : (
                <div className="aspect-video bg-gray-700 mb-4 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500 text-sm">No Image</span>
                </div>
              )}

              <h3 className="text-lg md:text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                {similarEvent.title}
              </h3>

              <span className="text-sm text-blue-400 group-hover:text-blue-300 inline-flex items-center gap-1">
                Learn More
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-2 mt-6">
        <button
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
            canScrollLeft
              ? "border-white/20 text-white hover:border-white/40 hover:bg-white/5"
              : "border-white/10 text-white/30 cursor-not-allowed"
          }`}
          aria-label="Previous events"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.5 15L7.5 10L12.5 5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <button
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
            canScrollRight
              ? "border-white/20 text-white hover:border-white/40 hover:bg-white/5"
              : "border-white/10 text-white/30 cursor-not-allowed"
          }`}
          aria-label="Next events"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.5 15L12.5 10L7.5 5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
