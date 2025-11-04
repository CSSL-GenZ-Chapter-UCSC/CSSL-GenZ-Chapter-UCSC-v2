import { Hero } from "./components/sections/Hero";
import { Gallery } from "./components/sections/Gallery";

export const metadata = {
  title: "CSSL GenZ Chapter",
  description: "CSSL GenZ Chapter of UCSC",
  keywords: "",
};

export default function Home() {
  return (
    <main className="flex flex-col">
      <Hero />
      <Gallery />
    </main>
  );
}
