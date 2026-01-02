import { client } from "@/sanity/lib/client";
import { Contact, ContactInfo } from "./Contact";

export async function ContactSection() {
  const data = await client.fetch<ContactInfo>(
    `*[_type == "contactInfo"][0]{
      linkedinLink,
      email,
      mapsLink,
      phoneNumber
    }`
  );
  return <Contact contactInfo={data ?? {}} />;
}
