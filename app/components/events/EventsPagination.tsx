"use client";

import { useState } from "react";
import Link from "next/link";
import type { Event } from "../../types/event";

interface EventsPaginationProps {
  events: Event[];
}

export default function EventsPagination({ events }: EventsPaginationProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const eventsPerPage = 4;
  const totalPages = Math.ceil(events.length / eventsPerPage);
  
  const displayedEvents = events.slice(
    currentPage * eventsPerPage,
    (currentPage + 1) * eventsPerPage
  );

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        {displayedEvents.map((event) => (
          <Link
            key={event._id}
            href={`/posts/${event.slug.current}`}
            className="group"
          >
            <div className="overflow-hidden bg-transparent">
              {/* Event Image */}
              {event.mainImage?.url ? (
                <div className="aspect-video bg-gray-700 mb-3 md:mb-4 rounded-lg overflow-hidden">
                  <img
                    src={event.mainImage.url}
                    alt={event.mainImage.alt || event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ) : (
                <div className="aspect-video bg-gray-700 mb-3 md:mb-4 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500 text-xs md:text-sm">No Image</span>
                </div>
              )}
              
              <div>
                <h3 className="text-base md:text-lg font-normal mb-1.5 md:mb-2 group-hover:text-blue-400 transition-colors">
                  {event.title}
                </h3>
                
                <p className="text-xs md:text-sm text-white/40 mb-2 md:mb-3 font-normal">
                  {event.endDate ? (
                    // Show date range if endDate exists
                    <>
                      {new Date(event.startDate).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                      {" - "}
                      {new Date(event.endDate).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </>
                  ) : (
                    // Show only start date if no endDate
                    new Date(event.startDate).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })
                  )}
                </p>
                
                {event.shortSummary && (
                  <p className="text-xs md:text-sm text-white/60 line-clamp-2 mb-2 md:mb-3 font-normal">
                    {event.shortSummary}
                  </p>
                )}
                
                <span className="text-xs md:text-sm text-blue-400 group-hover:text-blue-300 font-normal">
                  Learn More
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {/* Navigation Buttons */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
            disabled={currentPage === 0}
            className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
            aria-label="Previous page"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
            disabled={currentPage === totalPages - 1}
            className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
            aria-label="Next page"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
