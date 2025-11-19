import { client } from "@/sanity/lib/client";
import { Contact } from "./Contact";

type ContactInfoDoc = {
  facebookLink?: string | null;
  email?: string | null;
  mapsLink?: string | null;
  phoneNumber?: string | null;
};

export async function ContactSection() {
  const data = await client.fetch<ContactInfoDoc>(
    `*[_type == "contactInfo"][0]{
      facebookLink,
      email,
      mapsLink,
      phoneNumber
    }`
  );
  return <Contact overrides={data ?? {}} />;
}
