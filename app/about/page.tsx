import { About } from "../components/sections/About";
import { Vision } from "../components/sections/Vision";

export const metadata = {
  metadataBase: new URL("https://www.ucscgenz.lk"),
  title: "About us",
  description:
    "CSSL GenZ Chapter of UCSC. Where GenZ minds at UCSC turn ideas into legacies. The CSSL GenZ Chapter thrives through collaboration bringing together passionate students and young professionals to share knowledge, build skills.",
  keywords: "",
  openGraph: {
    title: "About us - CSSL GenZ Chapter",
    description:
      "CSSL GenZ Chapter of UCSC. Where GenZ minds at UCSC turn ideas into legacies. The CSSL GenZ Chapter thrives through collaboration bringing together passionate students and young professionals to share knowledge, build skills.",
    url: "https://www.ucscgenz.lk/about",
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
    title: "About us - CSSL GenZ Chapter",
    description:
      "CSSL GenZ Chapter of UCSC. Where GenZ minds at UCSC turn ideas into legacies.",
    images: ["/CSSL Logo final - white.png"],
  },
};

export default function AboutPage() {
  return (
    <main className="flex flex-col">
      <About />
      <Vision />
    </main>
  );
}
