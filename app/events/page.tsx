import { EventsListing } from "../components/events/EventsListing";
import {
  getFeaturedEvent,
  getUpcomingEvents,
  getPastEvents,
} from "@/sanity/lib/api";

export const metadata = {
  title: "Events",
  description:
    "Join us for events that inspire growth, spark creativity, and connect changemakers.",
};

export default async function EventsPage() {
  const [featuredEvent, upcomingEvents, pastEvents] = await Promise.all([
    getFeaturedEvent(),
    getUpcomingEvents(),
    getPastEvents(),
  ]);

  return (
    <EventsListing
      featuredEvent={featuredEvent}
      upcomingEvents={upcomingEvents}
      pastEvents={pastEvents}
    />
  );
}
