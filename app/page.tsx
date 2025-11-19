import { Blogs } from "./components/sections/Blogs";
import { Gallery } from "./components/sections/Gallery";
import { Hero } from "./components/sections/Hero";
import { Logo } from "./components/sections/Logo";

export const metadata = {
  title: "CSSL GenZ Chapter",
  description: "CSSL GenZ Chapter of UCSC",
  keywords: "",
};

export default function Home() {
  return (
    <main className="flex flex-col">
      <Hero />
      <Logo />
      <Gallery />
      <Blogs />
    </main>
  );
}