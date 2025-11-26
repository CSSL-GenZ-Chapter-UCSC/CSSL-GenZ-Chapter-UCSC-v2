import { client } from "./client";

export type Blog = {
  _id: string;
  title: string;
  mainImage?: { asset: { _ref: string } };
  author?: { name: string };
  excerpt?: string;
  publishedAt?: string;
  category: string;
};


export async function getBlogs(category?: string): Promise<Blog[]> {
  let query = `*[_type=="blog"]`;

  if (category && category !== "All") {
    query += ` && category == "${category}"`;
  }

  query += ` | order(publishedAt desc)[0...10]{
    _id,
    title,
    mainImage,
    "author": author->{name},
    excerpt,
    publishedAt,
    category
  }`;

  return await client.fetch(query);
}