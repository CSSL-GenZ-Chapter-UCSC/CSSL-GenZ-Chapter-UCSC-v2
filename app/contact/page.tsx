import { ContactSection } from "../components/sections/ContactSection";
import { SocialMediaSection } from "../components/sections/SocialMediaSection";

export const metadata = {
  title: "Contact Us",
  description: "CSSL GenZ Chapter of UCSC",
  keywords: "",
};

export default function ContactUsPage() {
  return (
    <main className="flex flex-col">
      <ContactSection />
      <SocialMediaSection />
    </main>
  );
}