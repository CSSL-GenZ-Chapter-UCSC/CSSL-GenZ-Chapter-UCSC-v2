import { BlogListing } from "../components/sections/BlogListing";

export const metadata = {
  title: "Blogs",
  description: "CSSL GenZ Chapter of UCSC",
  keywords: "",
};

export default function BlogsPage() {
  return (
    <main className="flex flex-col">
      <BlogListing />
    </main>
  );
}
