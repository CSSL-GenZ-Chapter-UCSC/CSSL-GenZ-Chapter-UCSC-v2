import { getFeaturedEvent, getUpcomingEvents, getPastEvents } from "@/sanity/lib/api";
import type { Event } from "../types/event";
import Link from "next/link";
import { Container } from "../components/shared/Container";
import EventsPagination from "../components/events/EventsPagination";

export default async function EventsPageSanity() {
  // Fetch all data server-side
  const featuredEvent = await getFeaturedEvent();
  const upcomingEvents = await getUpcomingEvents();
  const pastEvents = await getPastEvents();

  // Remove featured event from upcoming events if it exists
  const nonFeaturedUpcoming = featuredEvent 
    ? upcomingEvents.filter(event => event._id !== featuredEvent._id)
    : upcomingEvents;

  return (
    <main className="min-h-screen bg-black text-white font-poppins overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative py-16 md:py-32 lg:py-40 overflow-hidden">
        <Container>
          <div className="relative">
            {/* Gradient blur circle near E */}
            <div className="absolute -left-40 -top-10 w-75 h-100 bg-black rounded-full blur-[80px] pointer-events-none z-10" />
            <div className="absolute left-80 -top-20 w-60 h-60 bg-black rounded-full blur-[120px] pointer-events-none z-10" />
            
            <h1 className="text-[56px] md:text-[120px] lg:text-[180px] font-bold leading-none tracking-tight text-blue-500 relative">
              EVENTS
            </h1>
          </div>
          <div className="z-20">
            <p className="mt-6 md:mt-10 text-sm md:text-base text-white/80 max-w-2xl relative z-20">
              Join us for events that inspire growth, spark creativity, and connect changemakers.
            </p>
          </div>
        </Container>
      </section>

      {/* Featured Event Card */}
      {featuredEvent && (
        <section className="pb-12 md:pb-20">
          <Container>
            <div className="relative overflow-hidden h-[400px] md:h-[600px] rounded-lg">
              {/* Background image from bannerImage or mainImage */}
              {(featuredEvent.bannerImage?.url || featuredEvent.mainImage?.url) ? (
                <div className="absolute inset-0">
                  <img
                    src={featuredEvent.bannerImage?.url || featuredEvent.mainImage?.url}
                    alt={featuredEvent.bannerImage?.alt || featuredEvent.mainImage?.alt || featuredEvent.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="absolute inset-0 bg-linear-to-br from-blue-900 to-black" />
              )}
              
              <div className="absolute inset-0 bg-black/40" />
              
              <div className="relative h-full flex flex-col justify-end p-6 md:p-12">
                <span className="inline-block px-4 py-1 md:px-8 md:py-2 bg-blue-600 text-white text-xs md:text-sm font-medium rounded-full w-fit mb-3 md:mb-4">
                  Featured
                </span>
                
                <h2 className="text-2xl md:text-4xl lg:text-5xl mb-3 md:mb-4 font-semibold">
                  {featuredEvent.title}
                </h2>
                
                <div className="flex flex-wrap gap-3 md:gap-6 text-xs md:text-base text-white/90 mb-3 md:mb-4">
                  <div className="flex items-center gap-2">
                    <span>📅</span>
                    <span>
                      {new Date(featuredEvent.startDate).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  {featuredEvent.endDate && (
                    <div className="flex items-center gap-2">
                      <span>🕐</span>
                      <span>
                        {new Date(featuredEvent.startDate).toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true
                        })} - {new Date(featuredEvent.endDate).toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true
                        })}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <span>📍</span>
                    <span>{featuredEvent.venue || "New Arts Theater, University of Colombo"}</span>
                  </div>
                </div>
                
                {(featuredEvent.bannerText || featuredEvent.shortSummary) && (
                  <p className="text-white/80 max-w-3xl mb-4 md:mb-6 line-clamp-3 text-sm md:text-base">
                    {featuredEvent.bannerText || featuredEvent.shortSummary}
                  </p>
                )}
                
                <Link
                  href={`/posts/${featuredEvent.slug.current}`}
                  className="text-blue-400 hover:text-blue-300 flex items-center gap-2 justify-end transition-colors text-sm md:text-base"
                >
                  See More <span>→</span>
                </Link>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Upcoming Events Section */}
      {nonFeaturedUpcoming.length > 0 && (
        <section className="pb-12 md:pb-20">
          <Container>
            <h2 className="text-xl md:text-3xl mb-6 md:mb-10 font-normal">Upcoming Events</h2>
            
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 md:overflow-x-auto md:scrollbar-hide pb-4">
              {nonFeaturedUpcoming.map((event, index) => {
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
                    className="group shrink-0 w-full md:w-[calc(25%*0.75-18px)]"
                  >
                    <div className={`${
                      isFirst 
                        ? "bg-linear-to-b from-[#1a4d8f] via-[#0d2847] to-[#030712]" 
                        : "bg-gray-900/50 border border-gray-800"
                    } p-4 md:p-6 hover:border-blue-500/50 transition-all h-full rounded-lg`}>
                      {/* Date Badge */}
                      <div className="flex items-start justify-between mb-4 md:mb-8">
                        <div>
                          <div className={`text-2xl md:text-3xl font-normal ${isFirst ? "text-white" : "text-white"}`}>
                            {dateDisplay}
                          </div>
                          {monthDisplay && (
                            <div className={`text-xs md:text-sm font-normal ${isFirst ? "text-white/80" : "text-gray-500"}`}>
                              {monthDisplay}
                            </div>
                          )}
                        </div>
                        <span className={`${isFirst ? "text-white/80" : "text-gray-500"} group-hover:text-white transition-colors text-lg md:text-xl`}>
                          →
                        </span>
                      </div>
                      
                      {/* Event Info */}
                      <h3 className={`text-base md:text-xl font-normal mb-2 md:mb-3 ${
                        isFirst ? "text-white" : "text-white"
                      } group-hover:text-blue-400 transition-colors`}>
                        {event.title}
                      </h3>
                      
                      <div className="space-y-1.5 md:space-y-2 text-xs md:text-sm font-normal">
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
        <section className="pb-12 md:pb-20">
          <Container>
            <h2 className="text-xl md:text-3xl font-normal mb-6 md:mb-10">Past Events</h2>
            
            <EventsPagination events={pastEvents} />
          </Container>
        </section>
      )}
    </main>
  );
}
