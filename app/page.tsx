import { Blogs } from "./components/sections/Blogs";
import { Gallery } from "./components/sections/Gallery";
import { Hero } from "./components/sections/Hero";
import { Logo } from "./components/sections/Logo";
import { Testimonial } from "./components/sections/Testimonial";

import { EventsSection } from "@/app/components/sections/EventsSection";
import { getEvents, getAnnouncements } from "@/sanity/lib/api";
import { getBlogs } from "@/sanity/lib/getBlogs";

export const metadata = {
  title: "CSSL GenZ Chapter",
  description: "CSSL GenZ Chapter of UCSC",
  keywords: "",
};

export default async function Home() {
  const [events, blogs, announcements] = await Promise.all([
    getEvents(),
    getBlogs(undefined, 4),
    getAnnouncements(),
  ]);

  return (
    <main className="flex flex-col bg-black">
      <Hero announcements={announcements} />
      <Logo />
      <Gallery />
      <EventsSection events={events} />
      <Blogs blogs={blogs} />
      <Testimonial />
    </main>
  );
}
