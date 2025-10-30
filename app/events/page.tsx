import Link from "next/link";
import { client } from "@/sanity/lib/client";

type Event = {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  startDate?: string;
};

async function getEvents(): Promise<Event[]> {
  const query = `*[_type=="event"]|order(startDate desc)[0...20]{_id,title,slug,excerpt,startDate}`;
  return client.fetch(query);
}

export const metadata = {
  title: "Events",
};

export default async function EventsPage() {
  const events = await getEvents();
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold">Events</h1>
      {events.length === 0 ? (
        <p className="mt-6 text-foreground/80">No events yet.</p>
      ) : (
        <ul className="mt-6 space-y-4">
          {events.map((e) => (
            <li key={e._id} className="border-b border-foreground/10 pb-4">
              <Link
                href={`/events/${e.slug.current}`}
                className="text-xl font-semibold hover:underline"
              >
                {e.title}
              </Link>
              {e.excerpt ? (
                <p className="mt-1 text-foreground/70">{e.excerpt}</p>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}