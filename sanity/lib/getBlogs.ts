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
  let query;

  if (category && category !== "All") {
    // FIXED: Proper GROQ syntax with filter inside brackets
    query = `*[_type=="blog" && category == "${category}"] | order(publishedAt desc)[0...10]{
      _id,
      title,
      mainImage,
      "author": author->{name},
      excerpt,
      publishedAt,
      category
    }`;
  } else {
    query = `*[_type=="blog"] | order(publishedAt desc)[0...10]{
      _id,
      title,
      mainImage,
      "author": author->{name},
      excerpt,
      publishedAt,
      category
    }`;
  }

  console.log("Query:", query); // Debug log
  const result = await client.fetch(query);
  console.log("Results:", result.length, "blogs"); // Debug log
  
  return result;
}