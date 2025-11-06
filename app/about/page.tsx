import { About } from "../components/sections/About";

export const metadata = {
  title: "About us",
  description: "CSSL GenZ Chapter of UCSC",
  keywords: "",
};

export default function AboutPage() {
  return (
    <main className="flex flex-col">
      <About />
    </main>
  );
}
