import { Blogs } from "./components/sections/Blogs";
// import { Gallery } from "./components/sections/Gallery";
import { Hero } from "./components/sections/Hero";
import { Logo } from "./components/sections/Logo";
import { Testimonial } from "./components/sections/Testimonial";

// import { EventsSection } from "@/app/components/sections/EventsSection";
// import { getEvents } from "@/sanity/lib/api";

export const metadata = {
  title: "CSSL GenZ Chapter",
  description: "CSSL GenZ Chapter of UCSC",
  keywords: "",
};

export default async function Home() {
  // const events = await getEvents();

  return (
    <main className="flex flex-col gap-20 bg-black">
      <Hero />
      <Logo />
      {/* <Gallery /> */}
      {/* <EventsSection events={events} /> */}
      <Blogs />
      <Testimonial />
    </main>
  );
}
