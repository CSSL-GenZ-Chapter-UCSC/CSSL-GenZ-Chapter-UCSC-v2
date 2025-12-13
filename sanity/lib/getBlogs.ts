import { client } from "./client";
import { PortableTextBlock } from "sanity";

export type Blog = {
  _id: string;
  title: string;
  mainImage?: { asset: { _ref: string } };
  author?: { name: string };
  excerpt?: string;
  publishedAt: string;
  content: PortableTextBlock[];
  readTime: string;
  category: string;
};

export async function getBlogs(
  category?: string,
  limit: number = 10
): Promise<Blog[]> {
  let query;
  const params: any = { limit };

  if (category && category !== "All") {
    query = `*[_type=="blog" && category == $category] | order(publishedAt desc)[0...$limit]{
      _id,
      title,
      mainImage,
      "author": author->{name},
      excerpt,
      publishedAt,
      content,
      readTime,
      category
    }`;
    params.category = category;
  } else {
    query = `*[_type=="blog"] | order(publishedAt desc)[0...$limit]{
      _id,
      title,
      mainImage,
      "author": author->{name},
      excerpt,
      publishedAt,
      content,
      readTime,
      category
    }`;
  }

  console.log("Query:", query); // Debug log
  const result = await client.fetch(query, params);
  console.log("Results:", result.length, "blogs"); // Debug log

  return result;
}

export const getBlogById = async (id: string) => {
  const query = `*[_type == "blog" && _id == $id][0]`;
  const params = { id };
  const blog = await client.fetch(query, params);
  return blog;
};

export async function getCategories(): Promise<string[]> {
  const query = `array::unique(*[_type == "blog" && defined(category)].category)`;
  const categories = await client.fetch(query);
  return categories;
}
