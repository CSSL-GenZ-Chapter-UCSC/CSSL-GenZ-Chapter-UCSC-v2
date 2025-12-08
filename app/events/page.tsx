import { EventsListing } from "../components/events/EventsListing";

export const metadata = {
  title: "Events | CSSL GenZ Chapter",
  description:
    "Join us for events that inspire growth, spark creativity, and connect changemakers.",
};

export default function EventsPage() {
  return <EventsListing />;
}
