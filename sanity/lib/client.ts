import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "3aby8hgp",
  dataset: "production",
  apiVersion: "2023-10-01",
  useCdn: false,
  perspective: "published",
});
