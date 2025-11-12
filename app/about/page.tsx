import { About } from "../components/sections/About";
import { Vision } from "../components/sections/Vision";

export const metadata = {
  title: "About us",
  description: "CSSL GenZ Chapter of UCSC",
  keywords: "",
};

export default function AboutPage() {
  return (
    <main className="flex flex-col">
      <About />
      <Vision />
    </main>
  );
}
