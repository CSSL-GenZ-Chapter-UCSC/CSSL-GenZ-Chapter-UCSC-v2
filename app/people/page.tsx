import { Members } from "../components/sections/Members";
import { OurTeam } from "../components/sections/OurTeam";

export const metadata = {
  metadataBase: new URL("https://www.ucscgenz.lk"),
  title: "Our Team - CSSL GenZ Chapter",
  description:
    "Meet the passionate students and young professionals behind the CSSL GenZ Chapter at UCSC — collaborating to share knowledge, build skills, and turn ideas into legacies.",
  keywords: "",
  openGraph: {
    title: "Our Team - CSSL GenZ Chapter",
    description:
      "Meet the passionate students and young professionals behind the CSSL GenZ Chapter at UCSC — collaborating to share knowledge, build skills, and turn ideas into legacies.",
    url: "https://www.ucscgenz.lk/people",
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
    title: "Our Team - CSSL GenZ Chapter",
    description:
      "Meet the passionate students and young professionals behind the CSSL GenZ Chapter at UCSC.",
    images: ["/CSSL Logo final - white.png"],
  },
};

export default function PeoplePage() {
  return (
    <main className="flex flex-col">
      <OurTeam />
      <Members />
    </main>
  );
}
