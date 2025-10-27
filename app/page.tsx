import { Hero } from "./components/sections/Hero";

export const metadata = {
  title: "CSSL GenZ Chapter",
  description: "CSSL GenZ Chapter of UCSC",
  keywords: "",
};

export default function Home() {
  return (
    <main className="flex flex-col">
      <Hero />
    </main>
  );
}
