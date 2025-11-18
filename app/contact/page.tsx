import { Contact } from "../components/sections/Contact";

export const metadata = {
  title: "Contact Us",
  description: "CSSL GenZ Chapter of UCSC",
  keywords: "",
};

export default function ContactUsPage() {
  return (
    <main className="flex flex-col">
      <Contact />
    </main>
  );
}
