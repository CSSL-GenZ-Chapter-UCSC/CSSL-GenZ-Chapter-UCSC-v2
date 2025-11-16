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
  ] : events;

  // Separate upcoming and past events
  const now = new Date();
  const upcomingEvents = mockEvents.filter(event => new Date(event.startDate) >= now);
  const pastEvents = mockEvents.filter(event => new Date(event.startDate) < now);

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