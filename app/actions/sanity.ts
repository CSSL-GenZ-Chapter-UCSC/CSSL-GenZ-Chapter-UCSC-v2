"use server";

import { getBlogs, getCategories } from "@/sanity/lib/getBlogs";
import { getContactInfo } from "@/sanity/lib/api";

export async function fetchBlogsAction(category?: string) {
  return await getBlogs(category);
}

export async function fetchCategoriesAction() {
  return await getCategories();
}

export async function fetchContactInfoAction() {
  return await getContactInfo();
}
