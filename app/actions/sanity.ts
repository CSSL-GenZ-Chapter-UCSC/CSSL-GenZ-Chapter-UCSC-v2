"use server";

import { getBlogs, getCategories } from "@/sanity/lib/getBlogs";

export async function fetchBlogsAction(category?: string) {
  return await getBlogs(category);
}

export async function fetchCategoriesAction() {
  return await getCategories();
}
