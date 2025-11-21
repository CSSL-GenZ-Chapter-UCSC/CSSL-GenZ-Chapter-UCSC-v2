'use client';

import { getFeaturedEvent, getUpcomingEvents, getPastEvents } from "@/sanity/lib/api";
import type { Event } from "../../app/types/event";
import Link from "next/link";
import { Container } from "../components/shared/Container";
import { useState, useEffect } from "react";

export default function EventsPage() {
  const [featuredEvent, setFeaturedEvent] = useState<Event | null>(null);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [pastEvents, setPastEvents] = useState<Event[]>([]);
  const [currentPastPage, setCurrentPastPage] = useState(0);
  
  useEffect(() => {
    // Fetch all event data
    Promise.all([
      getFeaturedEvent(),
      getUpcomingEvents(),
      getPastEvents()
    ]).then(([featured, upcoming, past]) => {
      setFeaturedEvent(featured);
      // Remove featured event from upcoming if it exists
      setUpcomingEvents(featured ? upcoming.filter(e => e._id !== featured._id) : upcoming);
      setPastEvents(past);
    });
  }, []);

  const pastEventsPerPage = 4;
  const totalPastPages = Math.ceil(pastEvents.length / pastEventsPerPage);
  const displayedPastEvents = pastEvents.slice(
    currentPastPage * pastEventsPerPage,
    (currentPastPage + 1) * pastEventsPerPage
  );

  // Use featured event or first upcoming event for the featured card
  const featuredCard = featuredEvent || (upcomingEvents.length > 0 ? upcomingEvents[0] : null);
  const remainingUpcoming = featuredEvent ? upcomingEvents : upcomingEvents.slice(1);

  return (
    <main className="min-h-screen bg-black text-white font-poppins">
      {/* Hero Section */}
      <section className="relative py-32 lg:py-40">
        <Container>
          <div className="relative">
            {/* Gradient blur circle near E */}
            <div className="absolute -left-40 -top-10 w-75 h-100 bg-black rounded-full blur-[80px] pointer-events-none z-10" />
            <div className="absolute left-80 -top-20 w-60 h-60 bg-black rounded-full blur-[120px] pointer-events-none z-10" />
            
            <h1 className="text-[120px] lg:text-[180px] font-bold leading-none tracking-tight text-blue-500 relative">
              EVENTS
            </h1>
          </div>
          <div className="z-20">
            <p className="mt-10 text-1rem text-white/80 max-w-2xl relative z-20">
              Join us for events that inspire growth, spark creativity, and connect changemakers.
            </p>
          </div>
        </Container>
      </section>

      {/* Featured Event Card */}
      {featuredCard && (
        <section className="pb-20">
          <Container>
            <div className="relative overflow-hidden h-[600px] -mt-15 rounded-lg">
              {/* Background image from bannerImage or mainImage */}
              {(featuredCard.bannerImage?.url || featuredCard.mainImage?.url) ? (
                <div className="absolute inset-0">
                  <img
                    src={featuredCard.bannerImage?.url || featuredCard.mainImage?.url}
                    alt={featuredCard.bannerImage?.alt || featuredCard.mainImage?.alt || featuredCard.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="absolute inset-0 bg-linear-to-br from-blue-900 to-black" />
              )}
              
              <div className="absolute inset-0 bg-black/40" />
              
              <div className="relative h-full flex flex-col justify-end p-12 lg:p-12">
                <span className="inline-block px-8 py-2 bg-blue-600 text-white text-sm font-medium rounded-full w-fit mb-4">
                  Featured
                </span>
                
                <h2 className="text-3rem lg:text-5xl mb-4">
                  {featuredCard.title}
                </h2>
                
                <div className="flex flex-wrap gap-6 text-1.1rem text-white/90 mb-4">
                  <div className="flex items-center gap-2">
                    <span>📅</span>
                    <span>
                      {new Date(featuredCard.startDate).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  {featuredCard.endDate && (
                    <div className="flex items-center gap-2">
                      <span>🕐</span>
                      <span>
                        {new Date(featuredCard.startDate).toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true
                        })} - {new Date(featuredCard.endDate).toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true
                        })}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <span>📍</span>
                    <span>{featuredCard.venue || "New Arts Theater, University of Colombo"}</span>
                  </div>
                </div>
                
                {(featuredCard.bannerText || featuredCard.shortSummary) && (
                  <p className="text-white/80 max-w-3xl mb-6 line-clamp-3 text-1.5rem">
                    {featuredCard.bannerText || featuredCard.shortSummary}
                  </p>
                )}
                
                <Link
                  href={`/posts/${featuredCard.slug.current}`}
                  className="text-blue-400 hover:text-blue-300 flex items-center gap-2 justify-end transition-colors"
                >
                  See More <span>→</span>
                </Link>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Upcoming Events Section */}
      {remainingUpcoming.length > 0 && (
        <section className="pb-20">
          <Container>
            <h2 className="text-3xl mb-10 font-normal">Upcoming Events</h2>
            
            <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4">
              {remainingUpcoming.map((event, index) => {
                const eventDate = new Date(event.startDate);
                const day = eventDate.getDate().toString().padStart(2, '0');
                const month = eventDate.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
                const isFirst = index === 0;
                
                // Date display logic
                let dateDisplay = day;
                let monthDisplay = month;
                
                if (event.endDate) {
                  const endEventDate = new Date(event.endDate);
                  const endDay = endEventDate.getDate().toString().padStart(2, '0');
                  const endMonth = endEventDate.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
                  
                  // Check if same month
                  if (month === endMonth) {
                    dateDisplay = `${day}-${endDay}`;
                    monthDisplay = month;
                  } else {
                    dateDisplay = `${day} ${month.slice(0, 3)} - ${endDay} ${endMonth.slice(0, 3)}`;
                    monthDisplay = "";
                  }
                }
                
                // Calculate time display
                let timeDisplay = "TBA";
                if (event.endDate) {
                  const startTime = new Date(event.startDate).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true
                  });
                  const endTime = new Date(event.endDate).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true
                  });
                  timeDisplay = `${startTime} - ${endTime}`;
                }
                
                return (
                  <Link
                    key={event._id}
                    href={`/posts/${event.slug.current}`}
                    className="group shrink-0"
                    style={{ width: 'calc(25% * 0.75 - 18px)' }}
                  >
                    <div className={`${
                      isFirst 
                        ? "bg-linear-to-b from-[#1a4d8f] via-[#0d2847] to-[#030712]" 
                        : "bg-gray-900/50 border border-gray-800"
                    } p-6 hover:border-blue-500/50 transition-all h-full rounded-lg`}>
                      {/* Date Badge */}
                      <div className="flex items-start justify-between mb-8">
                        <div>
                          <div className={`text-3xl font-normal ${isFirst ? "text-white" : "text-white"}`}>
                            {dateDisplay}
                          </div>
                          {monthDisplay && (
                            <div className={`text-sm font-normal ${isFirst ? "text-white/80" : "text-gray-500"}`}>
                              {monthDisplay}
                            </div>
                          )}
                        </div>
                        <span className={`${isFirst ? "text-white/80" : "text-gray-500"} group-hover:text-white transition-colors`}>
                          →
                        </span>
                      </div>
                      
                      {/* Event Info */}
                      <h3 className={`text-xl font-normal mb-3 ${
                        isFirst ? "text-white" : "text-white"
                      } group-hover:text-blue-400 transition-colors`}>
                        {event.title}
                      </h3>
                      
                      <div className="space-y-2 text-sm font-normal">
                        <div className={`flex items-center gap-2 ${isFirst ? "text-white/80" : "text-blue-400"}`}>
                          <span>🕐</span>
                          <span>{timeDisplay}</span>
                        </div>
                        <div className={`flex items-center gap-2 ${isFirst ? "text-white/80" : "text-blue-400"}`}>
                          <span>📍</span>
                          <span>{event.venue || "New Arts Theater"}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </Container>
        </section>
      )}

      {/* Past Events Section */}
      {pastEvents.length > 0 && (
        <section className="pb-20">
          <Container>
            <h2 className="text-3xl font-normal mb-10">Past Events</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {displayedPastEvents.map((event) => (
                <Link
                  key={event._id}
                  href={`/posts/${event.slug.current}`}
                  className="group"
                >
                  <div className="overflow-hidden bg-transparent">
                    {/* Event Image */}
                    {event.mainImage?.url ? (
                      <div className="aspect-video bg-gray-700 mb-4 rounded-lg overflow-hidden">
                        <img
                          src={event.mainImage.url}
                          alt={event.mainImage.alt || event.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ) : (
                      <div className="aspect-video bg-gray-700 mb-4 rounded-lg" />
                    )}
                    
                    <div>
                      <h3 className="text-lg font-normal mb-2 group-hover:text-blue-400 transition-colors">
                        {event.title}
                      </h3>
                      
                      <p className="text-sm text-white/40 mb-3 font-normal">
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
                        <p className="text-sm text-white/60 line-clamp-2 mb-3 font-normal">
                          {event.shortSummary}
                        </p>
                      )}
                      
                      <span className="text-sm text-blue-400 group-hover:text-blue-300 font-normal">
                        Learn More
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            {/* Navigation Buttons */}
            {totalPastPages > 1 && (
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setCurrentPastPage(prev => Math.max(0, prev - 1))}
                  disabled={currentPastPage === 0}
                  className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                  aria-label="Previous page"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button
                  onClick={() => setCurrentPastPage(prev => Math.min(totalPastPages - 1, prev + 1))}
                  disabled={currentPastPage === totalPastPages - 1}
                  className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                  aria-label="Next page"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            )}
          </Container>
        </section>
      )}
    </main>
  );
}