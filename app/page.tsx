import { Blogs } from "./components/sections/Blogs";
import { Gallery } from "./components/sections/Gallery";
import { Hero } from "./components/sections/Hero";
import { Logo } from "./components/sections/Logo";
import { Testimonial } from "./components/sections/Testimonial";

import { EventsSection } from "@/app/components/sections/EventsSection";
import { getEvents, getAnnouncements, getTestimonials } from "@/sanity/lib/api";
import { getBlogs } from "@/sanity/lib/getBlogs";

export const metadata = {
  metadataBase: new URL("https://www.ucscgenz.lk"),
  title: "CSSL GenZ Chapter",
  description:
    "CSSL GenZ Chapter of UCSC. Where GenZ minds at UCSC turn ideas into legacies. The CSSL GenZ Chapter thrives through collaboration bringing together passionate students and young professionals to share knowledge, build skills.",
  keywords: "",
  icons: {
    apple: "/apple-touch-icon.png",
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "CSSL GenZ Chapter",
    description:
      "CSSL GenZ Chapter of UCSC. Where GenZ minds at UCSC turn ideas into legacies. The CSSL GenZ Chapter thrives through collaboration bringing together passionate students and young professionals to share knowledge, build skills.",
    url: "https://www.ucscgenz.lk",
    siteName: "CSSL GenZ Chapter of UCSC",
    images: [
      {
        url: "/CSSL Logo final - white.png",
        width: 512,
        height: 512,
        alt: "CSSL GenZ Chapter Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "CSSL GenZ Chapter",
    description:
      "CSSL GenZ Chapter of UCSC. Where GenZ minds at UCSC turn ideas into legacies.",
    images: ["/CSSL Logo final - white.png"],
  },
};

export default async function Home() {
  const [events, blogs, announcements, testimonials] = await Promise.all([
    getEvents(),
    getBlogs(undefined, 4),
    getAnnouncements(),
    getTestimonials(),
  ]);

  return (
    <main className="flex flex-col bg-black">
      <Hero announcements={announcements} />
      <Logo />
      <Gallery />
      <EventsSection events={events} />
      <Blogs blogs={blogs} />
      <Testimonial testimonials={testimonials} />
    </main>
  );
}
