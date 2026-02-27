import { Members } from "../components/sections/Members";
import { OurTeam } from "../components/sections/OurTeam";

export const metadata = {
  title: "Our team",
  description:
    "CSSL GenZ Chapter of UCSC. Where GenZ minds at UCSC turn ideas into legacies. The CSSL GenZ Chapter thrives through collaboration bringing together passionate students and young professionals to share knowledge, build skills.",
  keywords: "",
};

export default function PeoplePage() {
  return (
    <main className="flex flex-col">
      <OurTeam />
      <Members />
    </main>
  );
}
