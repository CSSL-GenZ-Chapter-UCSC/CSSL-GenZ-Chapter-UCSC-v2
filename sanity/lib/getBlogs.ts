import { client } from "./client";
import { PortableTextBlock } from "sanity";

export type Category = {
  _id: string;
  title: string;
  description?: string;
};

export type Blog = {
  _id: string;
  title: string;
  slug?: { current: string };
  mainImage?: { asset: { _ref: string } };
  author?: { name: string };
  excerpt?: string;
  publishedAt: string;
  body: PortableTextBlock[];
  category?: Category;
};

export async function getBlogs(
  categoryTitle?: string,
  limit: number = 10
): Promise<Blog[]> {
  let query;
  const params: Record<string, unknown> = { limit };

  if (categoryTitle && categoryTitle !== "All") {
    query = `*[_type=="blog" && category->title == $categoryTitle] | order(publishedAt desc)[0...$limit]{
      _id,
      title,
      slug,
      mainImage,
      "author": author->{name},
      excerpt,
      publishedAt,
      body,
      "category": category->{ _id, title, description }
    }`;
    params.categoryTitle = categoryTitle;
  } else {
    query = `*[_type=="blog"] | order(publishedAt desc)[0...$limit]{
      _id,
      title,
      slug,
      mainImage,
      "author": author->{name},
      excerpt,
      publishedAt,
      body,
      "category": category->{ _id, title, description }
    }`;
  }

  console.log("Query:", query); // Debug log
  const result = await client.fetch(query, params, {
    next: { revalidate: 60 }, // Revalidate every 60 seconds
  });
  console.log("Results:", result.length, "blogs"); // Debug log

  return result;
}

export const getBlogById = async (id: string): Promise<Blog | null> => {
  const query = `*[_type == "blog" && _id == $id][0]{
    _id,
    title,
    slug,
    mainImage,
    "author": author->{name},
    excerpt,
    publishedAt,
    body,
    "category": category->{ _id, title, description }
  }`;
  const params = { id };
  const blog = await client.fetch(query, params, {
    next: { revalidate: 60 }, // Revalidate every 60 seconds
  });
  return blog;
};

export const getBlogBySlug = async (slug: string): Promise<Blog | null> => {
  const query = `*[_type == "blog" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    mainImage,
    "author": author->{name},
    excerpt,
    publishedAt,
    body,
    "category": category->{ _id, title, description }
  }`;
  const params = { slug };
  const blog = await client.fetch(query, params, {
    next: { revalidate: 60 }, // Revalidate every 60 seconds
  });
  return blog;
};

export async function getCategories(): Promise<string[]> {
  // Fetch only categories that have at least one blog
  const query = `array::unique(*[_type == "blog" && defined(category)]{ "title": category->title }.title)`;
  const categories: string[] = await client.fetch(
    query,
    {},
    {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    }
  );
  // Sort alphabetically and filter out null/undefined values
  return categories.filter(Boolean).sort();
}

export async function getAllCategories(): Promise<Category[]> {
  const query = `*[_type == "category"] | order(title asc) { _id, title, description }`;
  const categories: Category[] = await client.fetch(
    query,
    {},
    {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    }
  );
  return categories;
}
