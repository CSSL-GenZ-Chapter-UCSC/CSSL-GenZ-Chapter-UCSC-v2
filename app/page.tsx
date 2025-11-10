import { Hero } from "./components/sections/Hero";
import { Logo } from "./components/sections/Logo";
import Blog from "./components/sections/Blog";

export const metadata = {
  title: "CSSL GenZ Chapter",
  description: "CSSL GenZ Chapter of UCSC",
  keywords: "",
};

export default function Home() {
  return (
    <main className="flex flex-col">
      <Hero />
      <Blog />
      <Logo />
    </main>
  );
}