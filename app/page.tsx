import { Blogs } from "./components/sections/Blogs";
import { Gallery } from "./components/sections/Gallery";
import { Hero } from "./components/sections/Hero";
import { Logo } from "./components/sections/Logo";
import { Testimonial } from "./components/sections/Testimonial";

export const metadata = {
  title: "CSSL GenZ Chapter",
  description: "CSSL GenZ Chapter of UCSC",
  keywords: "",
};

export default async function Home() {
  return (
    <main className="flex flex-col gap-10 bg-black">
      <Hero />
      <Logo />
      <Gallery />
      <Blogs />
      <Testimonial />
      <Blogs />
    </main>
  );
}
