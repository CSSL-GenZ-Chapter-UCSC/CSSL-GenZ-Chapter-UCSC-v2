import { Members } from "../components/sections/Members";
import { OurTeam } from "../components/sections/OurTeam";

export const metadata = {
  title: "Our team",
  description: "CSSL GenZ Chapter of UCSC",
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
