import { About } from "../components/sections/About";
import { Vision } from "../components/sections/Vision";

export const metadata = {
  metadataBase: new URL("https://www.ucscgenz.lk"),
  title: "About Us - CSSL GenZ Chapter",
  description:
    "Where GenZ minds at UCSC turn ideas into legacies. We thrive through collaboration, bringing together passionate students and young professionals to share knowledge and build skills.",
  keywords: "",
  openGraph: {
    title: "About Us - CSSL GenZ Chapter",
    description:
      "Where GenZ minds at UCSC turn ideas into legacies. We thrive through collaboration, bringing together passionate students and young professionals to share knowledge and build skills.",
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
    title: "About Us - CSSL GenZ Chapter",
    description:
      "Where GenZ minds at UCSC turn ideas into legacies. We thrive through collaboration, sharing knowledge and building skills.",
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
