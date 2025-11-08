import EventsSection from '@/app/components/sections/EventsSection';
import { getEvents } from '@/sanity/lib/api';

export default async function TestEventsSanityPage() {
  // Fetch events from Sanity (server-side)
  const events = await getEvents();

  return (
    <main>
      <EventsSection events={events} />
    </main>
  );
}
