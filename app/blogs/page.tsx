import { BlogListing } from "../components/sections/BlogListing";
import { getBlogs } from "@/sanity/lib/getBlogs";

export const metadata = {
  title: "Blogs",
  description: "CSSL GenZ Chapter of UCSC",
  keywords: "",
};

export default async function BlogsPage() {
  const initialBlogs = await getBlogs("All");

  return (
    <main className="flex flex-col">
      <BlogListing initialBlogs={initialBlogs} />
    </main>
  );
}
