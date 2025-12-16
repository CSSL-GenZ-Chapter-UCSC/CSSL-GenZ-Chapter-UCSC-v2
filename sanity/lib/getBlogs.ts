import { client } from "./client";

export type Blog = {
  _id: string;
  title: string;
  titleSplitCharCount?: number;
  mainImage?: { asset: { _ref: string } };
  author?: { name: string };
  excerpt?: string;
  publishedAt: string;
  content: string;
  readTime: string;
  category: string;
  subtopics?: { title: string; description: string }[];
};

export async function getBlogs(
  category?: string,
  limit: number = 10
): Promise<Blog[]> {
  let query;
  const params: { limit: number; category?: string } = { limit };

  if (category && category !== "All") {
    query = `*[_type=="blog" && category == $category] | order(publishedAt desc)[0...$limit]{
      _id,
      title,
      titleSplitCharCount,
      mainImage,
      "author": author->{name},
      excerpt,
      publishedAt,
      content,
      readTime,
      category,
      subtopics[]{title, description}
    }`;
    params.category = category;
  } else {
    query = `*[_type=="blog"] | order(publishedAt desc)[0...$limit]{
      _id,
      title,
      titleSplitCharCount,
      mainImage,
      "author": author->{name},
      excerpt,
      publishedAt,
      content,
      readTime,
      category,
      subtopics[]{title, description}  // CHANGED
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