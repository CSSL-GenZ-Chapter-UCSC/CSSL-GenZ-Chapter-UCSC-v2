import { OurTeam } from "../components/sections/OurTeam";

export const metadata = {
  title: "About us",
  description: "CSSL GenZ Chapter of UCSC",
  keywords: "",
};

export default function PeoplePage() {
  return (
    <main className="flex flex-col">
      <OurTeam />
    </main>
  );
}
