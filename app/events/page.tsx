'use client';

import { getAllEvents } from "@/sanity/lib/api";
import type { Event } from "../../app/types/event";
import Link from "next/link";
import { Container } from "../components/shared/Container";
import { useState, useEffect } from "react";

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentPastPage, setCurrentPastPage] = useState(0);
  
  useEffect(() => {
    getAllEvents().then(setEvents);
  }, []);

  // Mock data for development/styling
  const mockEvents: Event[] = events.length === 0 ? [
    {
      _id: "1",
      title: "GenZ Launch Event",
      slug: { _type: "slug", current: "genz-launch-event" },
      excerpt: "We are pleased to announce the launching ceremony of the CSSL GenZ Chapter at the University of Colombo School of Computing (UCSC). This event marks the inauguration of an initiative dedicated to the next generation of tech leaders. The CSSL GenZ Chapter aims to facilitate innovation, leadership, and collaboration among students.",
      shortSummary: "Launching ceremony of CSSL GenZ Chapter",
      startDate: "2025-12-08T16:00:00Z",
      venue: "New Arts Theater, University of Colombo",
      is_shown: true,
      is_highlighted: true,
    },
    {
      _id: "2",
      title: "Colloquium '26",
      slug: { _type: "slug", current: "colloquium-26" },
      excerpt: "Annual tech conference bringing together industry leaders and students",
      shortSummary: "Annual tech conference",
      startDate: "2026-01-04T16:00:00Z",
      venue: "New Arts Theater",
      is_shown: true,
    },
    {
      _id: "3",
      title: "Signature Hack",
      slug: { _type: "slug", current: "signature-hack" },
      excerpt: "24-hour hackathon for innovative solutions",
      shortSummary: "24-hour hackathon",
      startDate: "2026-03-23T16:00:00Z",
      venue: "New Arts Theater",
      is_shown: true,
    },
    {
      _id: "4",
      title: "AGM",
      slug: { _type: "slug", current: "agm" },
      excerpt: "Annual General Meeting of CSSL GenZ Chapter",
      shortSummary: "Annual General Meeting",
      startDate: "2026-05-07T16:00:00Z",
      venue: "New Arts Theater",
      is_shown: true,
    },
    {
      _id: "8",
      title: "Tech Workshop",
      slug: { _type: "slug", current: "tech-workshop" },
      excerpt: "Hands-on workshop on latest technologies",
      shortSummary: "Tech workshop",
      startDate: "2026-06-15T16:00:00Z",
      venue: "New Arts Theater",
      is_shown: true,
    },
    {
      _id: "9",
      title: "Code Sprint",
      slug: { _type: "slug", current: "code-sprint" },
      excerpt: "Intensive coding competition",
      shortSummary: "Coding competition",
      startDate: "2026-07-20T16:00:00Z",
      venue: "New Arts Theater",
      is_shown: true,
    },
    {
      _id: "10",
      title: "AI Summit",
      slug: { _type: "slug", current: "ai-summit" },
      excerpt: "Summit on artificial intelligence and machine learning",
      shortSummary: "AI summit",
      startDate: "2026-08-10T16:00:00Z",
      venue: "New Arts Theater",
      is_shown: true,
    },
    {
      _id: "5",
      title: "CSSL Colloquium 2025",
      slug: { _type: "slug", current: "cssl-colloquium-2025" },
      excerpt: "The CSSL Colloquium 2025 organized by the Computer Society of Sri Lanka (CSSL)",
      shortSummary: "Past tech conference",
      startDate: "2024-07-07T16:00:00Z",
      venue: "Colombo",
      is_shown: true,
    },
    {
      _id: "6",
      title: "GenZ Launch Event",
      slug: { _type: "slug", current: "genz-launch-past" },
      excerpt: "We are pleased to announce the launching ceremony of the CSSL GenZ Chapter",
      shortSummary: "Past launch ceremony",
      startDate: "2024-11-16T16:00:00Z",
      venue: "UCSC",
      is_shown: true,
    },
    {
      _id: "7",
      title: "Physical Meetup",
      slug: { _type: "slug", current: "physical-meetup" },
      excerpt: "The evening brought together chapter members for an opportunity of interaction and lighthearted competition.",
      shortSummary: "Past meetup",
      startDate: "2024-09-15T16:00:00Z",
      venue: "Colombo",
      is_shown: true,
    },
    {
      _id: "11",
      title: "Web Development Workshop",
      slug: { _type: "slug", current: "web-dev-workshop" },
      excerpt: "A comprehensive workshop on modern web development technologies and best practices.",
      shortSummary: "Past workshop",
      startDate: "2024-06-20T16:00:00Z",
      venue: "UCSC",
      is_shown: true,
    },
    {
      _id: "12",
      title: "Coding Challenge 2024",
      slug: { _type: "slug", current: "coding-challenge-2024" },
      excerpt: "Annual coding competition that brought together talented programmers from various universities.",
      shortSummary: "Past competition",
      startDate: "2024-05-10T16:00:00Z",
      venue: "Colombo",
      is_shown: true,
    },
    {
      _id: "13",
      title: "Tech Talk Series",
      slug: { _type: "slug", current: "tech-talk-series" },
      excerpt: "Industry experts shared insights on emerging technologies and career opportunities.",
      shortSummary: "Past tech talk",
      startDate: "2024-04-15T16:00:00Z",
      venue: "New Arts Theater",
      is_shown: true,
    },
    {
      _id: "14",
      title: "Networking Night",
      slug: { _type: "slug", current: "networking-night" },
      excerpt: "An evening dedicated to networking and building connections within the tech community.",
      shortSummary: "Past networking event",
      startDate: "2024-03-25T16:00:00Z",
      venue: "UCSC",
      is_shown: true,
    },
    {
      _id: "15",
      title: "Mobile App Development Bootcamp",
      slug: { _type: "slug", current: "mobile-bootcamp" },
      excerpt: "Intensive bootcamp covering iOS and Android app development fundamentals.",
      shortSummary: "Past bootcamp",
      startDate: "2024-02-12T16:00:00Z",
      venue: "Colombo",
      is_shown: true,
    },
    {
      _id: "16",
      title: "Cyber Security Summit",
      slug: { _type: "slug", current: "cybersec-summit" },
      excerpt: "Summit focused on latest trends in cybersecurity and ethical hacking practices.",
      shortSummary: "Past summit",
      startDate: "2024-01-18T16:00:00Z",
      venue: "New Arts Theater",
      is_shown: true,
    },
  ] : events;

  // Separate upcoming and past events
  const now = new Date();
  const upcomingEvents = mockEvents.filter(event => new Date(event.startDate) >= now);
  const pastEvents = mockEvents.filter(event => new Date(event.startDate) < now);
  
  const pastEventsPerPage = 4;
  const totalPastPages = Math.ceil(pastEvents.length / pastEventsPerPage);
  const displayedPastEvents = pastEvents.slice(
    currentPastPage * pastEventsPerPage,
    (currentPastPage + 1) * pastEventsPerPage
  );

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
      {upcomingEvents.length > 0 && (
        <section className="pb-20">
          <Container>
            <div className="relative overflow-hidden h-[600px] -mt-15">
              {/* Background image placeholder - you can add mainImage from event */}
              <div className="absolute inset-0 bg-linear-to-br from-blue-900 to-black">
                {/* Placeholder for event image */}
              </div>
              
              <div className="absolute inset-0 bg-black/40" />
              
              <div className="relative h-full flex flex-col justify-end p-12 lg:p-12">
                <span className="inline-block px-8 py-2 bg-blue-600 text-white text-sm font-medium rounded-full w-fit mb-4">
                  Featured
                </span>
                
                <h2 className="text-3rem lg:text-5xl mb-4">
                  {upcomingEvents[0].title}
                </h2>
                
                <div className="flex flex-wrap gap-6 text-1.1rem text-white/90 mb-4">
                  <div className="flex items-center gap-2">
                    <span>📅</span>
                    <span>
                      {new Date(upcomingEvents[0].startDate).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🕐</span>
                    <span>4PM - 6PM</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>📍</span>
                    <span>New Arts Theater, University of Colombo</span>
                  </div>
                </div>
                
                {upcomingEvents[0].excerpt && (
                  <p className="text-white/80 max-w-3xl mb-6 line-clamp-3 text-1.5rem">
                    {upcomingEvents[0].excerpt}
                  </p>
                )}
                
                <Link
                  href={`/events/${upcomingEvents[0].slug.current}`}
                  className="text-blue-400 hover:text-blue-300 flex items-center gap-2 justify-end"
                >
                  See More <span>→</span>
                </Link>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Upcoming Events Section */}
      {upcomingEvents.length > 1 && (
        <section className="pb-20">
          <Container>
            <h2 className="text-3xl mb-10 font-normal">Upcoming Events</h2>
            
            <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4">
              {upcomingEvents.slice(1).map((event, index) => {
                const eventDate = new Date(event.startDate);
                const day = eventDate.getDate().toString().padStart(2, '0');
                const month = eventDate.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
                const isFirst = index === 0;
                
                return (
                  <Link
                    key={event._id}
                    href={`/events/${event.slug.current}`}
                    className="group shrink-0"
                    style={{ width: 'calc(25% * 0.75 - 18px)' }}
                  >
                    <div className={`${
                      isFirst 
                        ? "bg-linear-to-b from-[#1a4d8f] via-[#0d2847] to-[#030712]" 
                        : "bg-gray-900/50 border border-gray-800"
                    } p-6 hover:border-blue-500/50 transition-all h-full`}>
                      {/* Date Badge */}
                      <div className="flex items-start justify-between mb-8">
                        <div>
                          <div className={`text-3xl font-normal ${isFirst ? "text-white" : "text-white"}`}>
                            {day}
                          </div>
                          <div className={`text-sm font-normal ${isFirst ? "text-white/80" : "text-gray-500"}`}>
                            {month}
                          </div>
                        </div>
                        <button className={`${isFirst ? "text-white/80" : "text-gray-500"} hover:text-white`}>
                          →
                        </button>
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
                          <span>4PM - 6PM</span>
                        </div>
                        <div className={`flex items-center gap-2 ${isFirst ? "text-white/80" : "text-blue-400"}`}>
                          <span>📍</span>
                          <span>New Arts Theater</span>
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
                  href={`/events/${event.slug.current}`}
                  className="group"
                >
                  <div className="overflow-hidden bg-transparent">
                    {/* Image placeholder */}
                    <div className="aspect-video bg-gray-700 mb-4" />
                    
                    <div>
                      <h3 className="text-lg font-normal mb-2 group-hover:text-blue-400 transition-colors">
                        {event.title}
                      </h3>
                      
                      <p className="text-sm text-white/40 mb-3 font-normal">
                        {new Date(event.startDate).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                      
                      {event.excerpt && (
                        <p className="text-sm text-white/60 line-clamp-2 mb-3 font-normal">
                          {event.excerpt}
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