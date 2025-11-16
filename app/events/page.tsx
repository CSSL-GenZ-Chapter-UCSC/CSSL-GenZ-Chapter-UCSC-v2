import { getAllEvents } from "@/sanity/lib/api";
import type { Event } from "../../app/types/event";
import Link from "next/link";
import { Container } from "../components/shared/Container";

export const metadata = {
  title: "Events - CSSL GenZ Chapter",
  description: "Upcoming and past events from CSSL GenZ Chapter",
};

export default async function EventsPage() {
  const events = await getAllEvents();

  // Separate upcoming and past events
  const now = new Date();
  const upcomingEvents = events.filter(event => new Date(event.startDate) >= now);
  const pastEvents = events.filter(event => new Date(event.startDate) < now);

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-32 lg:py-40">
        <Container>
          <h1 className="text-[120px] lg:text-[180px] font-bold leading-none tracking-tight text-blue-500">
            EVENTS
          </h1>
          <p className="mt-4 text-lg text-white/80 max-w-2xl">
            Join us for events that inspire growth, spark creativity, and connect changemakers.
          </p>
        </Container>
      </section>

      {/* Featured Event Card */}
      {upcomingEvents.length > 0 && (
        <section className="pb-20">
          <Container>
            <div className="relative rounded-2xl overflow-hidden h-[500px]">
              {/* Background image placeholder - you can add mainImage from event */}
              <div className="absolute inset-0 bg-linear-to-br from-blue-900 to-black">
                {/* Placeholder for event image */}
              </div>
              
              <div className="absolute inset-0 bg-black/40" />
              
              <div className="relative h-full flex flex-col justify-end p-8 lg:p-12">
                <span className="inline-block px-4 py-1 bg-blue-600 text-white text-sm font-medium rounded-full w-fit mb-4">
                  Featured
                </span>
                
                <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                  {upcomingEvents[0].title}
                </h2>
                
                <div className="flex flex-wrap gap-6 text-sm text-white/90 mb-4">
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
                  <p className="text-white/80 max-w-3xl mb-6 line-clamp-3">
                    {upcomingEvents[0].excerpt}
                  </p>
                )}
                
                <Link
                  href={`/events/${upcomingEvents[0].slug.current}`}
                  className="text-blue-400 hover:text-blue-300 flex items-center gap-2"
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
            <h2 className="text-3xl font-bold mb-8">Upcoming Events</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {upcomingEvents.slice(1).map((event) => {
                const eventDate = new Date(event.startDate);
                const day = eventDate.getDate().toString().padStart(2, '0');
                const month = eventDate.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
                const dateRange = `${day}-${eventDate.getDate() + 2}`; // Placeholder for multi-day events
                
                return (
                  <Link
                    key={event._id}
                    href={`/events/${event.slug.current}`}
                    className="group"
                  >
                    <div className="bg-linear-to-br from-blue-900/20 to-blue-950/20 border border-blue-500/20 rounded-xl p-6 hover:border-blue-500/50 transition-all">
                      {/* Date Badge */}
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="text-3xl font-bold">{day}</div>
                          <div className="text-sm text-white/60">{month}</div>
                        </div>
                        <button className="text-white/60 hover:text-white">
                          →
                        </button>
                      </div>
                      
                      {/* Event Info */}
                      <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-400 transition-colors">
                        {event.title}
                      </h3>
                      
                      <div className="space-y-2 text-sm text-blue-400">
                        <div className="flex items-center gap-2">
                          <span>🕐</span>
                          <span>4PM - 6PM</span>
                        </div>
                        <div className="flex items-center gap-2">
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
            <h2 className="text-3xl font-bold mb-8">Past Events</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {pastEvents.map((event) => (
                <Link
                  key={event._id}
                  href={`/events/${event.slug.current}`}
                  className="group"
                >
                  <div className="rounded-xl overflow-hidden bg-gray-800">
                    {/* Image placeholder */}
                    <div className="aspect-video bg-gray-700" />
                    
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                        {event.title}
                      </h3>
                      
                      <p className="text-sm text-white/60 mb-4">
                        {new Date(event.startDate).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                      
                      {event.excerpt && (
                        <p className="text-sm text-white/80 line-clamp-2 mb-4">
                          {event.excerpt}
                        </p>
                      )}
                      
                      <span className="text-sm text-blue-400 group-hover:text-blue-300">
                        Learn More →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}
    </main>
  );
}