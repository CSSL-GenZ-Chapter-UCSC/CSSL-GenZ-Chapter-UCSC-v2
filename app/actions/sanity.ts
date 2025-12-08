"use server";

import { getBlogs } from "@/sanity/lib/getBlogs";

export async function fetchBlogsAction(category?: string) {
  return await getBlogs(category);
}
