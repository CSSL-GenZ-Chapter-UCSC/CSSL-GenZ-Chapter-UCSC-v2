import { Members } from "../components/sections/Members";
import { OurTeam } from "../components/sections/OurTeam";

export const metadata = {
  metadataBase: new URL("https://www.ucscgenz.lk"),
  title: "Our team",
  description:
    "CSSL GenZ Chapter of UCSC. Where GenZ minds at UCSC turn ideas into legacies. The CSSL GenZ Chapter thrives through collaboration bringing together passionate students and young professionals to share knowledge, build skills.",
  keywords: "",
  openGraph: {
    title: "Our Team - CSSL GenZ Chapter",
    description:
      "CSSL GenZ Chapter of UCSC. Where GenZ minds at UCSC turn ideas into legacies. The CSSL GenZ Chapter thrives through collaboration bringing together passionate students and young professionals to share knowledge, build skills.",
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
      "CSSL GenZ Chapter of UCSC. Where GenZ minds at UCSC turn ideas into legacies.",
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
