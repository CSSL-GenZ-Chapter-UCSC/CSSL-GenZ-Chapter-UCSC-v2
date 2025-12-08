import { SingleBlog } from "../../components/sections/SingleBlog";
import { getBlogById, getBlogs } from "@/sanity/lib/getBlogs";

interface BlogDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { id } = await params;
  const blog = await getBlogById(id);

  // Fetch all blogs to find related ones
  // Ideally we should have a more efficient query for "related blogs"
  const allBlogs = await getBlogs();

  // Filter out current blog and take 3
  const moreBlogs = allBlogs.filter((b) => b._id !== id).slice(0, 3);

  return (
    <main className="flex flex-col">
      <SingleBlog blog={blog} moreBlogs={moreBlogs} />
    </main>
  );
}
