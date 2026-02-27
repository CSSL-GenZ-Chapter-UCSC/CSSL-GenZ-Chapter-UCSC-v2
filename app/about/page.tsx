import { About } from "../components/sections/About";
import { Vision } from "../components/sections/Vision";

export const metadata = {
  title: "About us",
  description:
    "CSSL GenZ Chapter of UCSC. Where GenZ minds at UCSC turn ideas into legacies. The CSSL GenZ Chapter thrives through collaboration bringing together passionate students and young professionals to share knowledge, build skills.",
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
