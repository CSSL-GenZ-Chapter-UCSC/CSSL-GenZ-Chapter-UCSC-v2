import { getContactInfo } from "@/sanity/lib/api";
import { Contact } from "./Contact";

export async function ContactSection() {
  const data = await getContactInfo();
  return <Contact contactInfo={data} />;
}
