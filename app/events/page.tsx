import { getAllEvents } from "@/sanity/lib/api";
import type { Event } from "../../app/types/event";
import Link from "next/link";

export const metadata = {
  title: "Events - CSSL GenZ Chapter",
  description: "Upcoming and past events from CSSL GenZ Chapter",
};

export default async function EventsPage() {
  const events = await getAllEvents();

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold">Events</h1>
      
      {events.length === 0 ? (
        <p className="mt-6 text-foreground/80">No events yet.</p>
      ) : (
        <ul className="mt-6 space-y-4">
          {events.map((event) => (
            <li key={event._id} className="border-b border-foreground/10 pb-4">
              <Link 
                href={`/events/${event.slug.current}`}
                className="hover:underline"
              >
                <h2 className="text-xl font-semibold">{event.title}</h2>
              </Link>
              
              {event.startDate && (
                <p className="text-sm text-foreground/60">
                  {new Date(event.startDate).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              )}
              
              {event.excerpt && (
                <p className="mt-2 text-foreground/80">{event.excerpt}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}