import { WhatWeDo } from "../components/sections/WhatWeDo";
import { Work } from "../components/sections/Work";

export const metadata = {
  title: "What We Do",
  description: "CSSL GenZ Chapter of UCSC",
  keywords: "",
};

export default function WhatWeDoPage() {
  return (
    <main className="flex flex-col">
      <WhatWeDo />
      <Work />
    </main>
  );
}
