"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { useState, useEffect } from "react";
import { PortableText } from "@portabletext/react";

type Blog = {
  _id: string;
  title: string;
  mainImage?: { asset: { url: string } };
  author?: { name: string };
  body?: any; // PortableText content
  publishedAt?: string;
  category?: string;
};

async function getBlogs(): Promise<Blog[]> {
  const query = `*[_type=="blog"]|order(publishedAt desc)[0...50]{
    _id,
    title,
    "mainImage": mainImage.asset->{url},
    "author": author-> { name },
    body,
    publishedAt,
    category
  }`;
  return client.fetch(query);
}

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const numericId = parseInt(slug, 10);

  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Comments state
  const [comments, setComments] = useState<{ id: number; text: string }[]>([]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const blogs = await getBlogs();

        if (numericId > 0 && numericId <= blogs.length) {
          setBlog(blogs[numericId - 1]);
        } else {
          setError("Blog not found.");
        }
      } catch (err) {
        console.error("Failed to fetch blog:", err);
        setError("Failed to load blog. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [numericId]);

  if (loading) return <p className="text-center mt-10">Loading blog...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;
  if (!blog) return <p className="text-center mt-10">Blog not found.</p>;

  return (
    <main className="bg-black width-full -mx-14 mt-1 px-20 pb-30">
      <Link href="../blogs" className="text-blue-600 hover:underline mt-40 mb-6 inline-block">
        &lt; Back to Blogs
      </Link>

      <article className="bg-white rounded-lg shadow-md overflow-hidden border border-red-500 mt-10 pl-4 pt-10 ">

        <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>

        <div className="flex items-center gap-4 text-gray-600 text-sm mb-6">
            {blog.author?.name && <span className="text-black-1300">By {blog.author.name}</span>}
            {blog.publishedAt && (
              <span>{new Date(blog.publishedAt).toLocaleDateString()}</span>
            )}
            {blog.category && (
              <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full">
                {blog.category}
              </span>
            )}
          </div>

        {blog.mainImage?.url && (
          <div className="relative w-full h-96 -ml-5">
            <Image
              src={blog.mainImage.url}
              alt={blog.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="p-8">

          

          <div className="prose prose-lg max-w-none text-black">
            {blog.body ? (
              <PortableText value={blog.body} />
            ) : (
              <p className="text-gray-600">No content available.</p>
            )}
          </div>

          {/* ===== Comments Section ===== */}
          <div className="mt-10 border-t pt-6">
            <h2 className="text-2xl font-semibold mb-4 text-red-500">Comments</h2>

            {/* Comment Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const input = form.elements.namedItem("comment") as HTMLInputElement;
                if (!input.value.trim()) return;
                setComments((prev) => [
                  ...prev,
                  { id: Date.now(), text: input.value.trim() },
                ]);
                input.value = "";
              }}
              className="mb-6 flex flex-col gap-3"
            >
              <textarea
                name="comment"
                placeholder="Write your comment..."
                className="border rounded-md p-2 w-full resize-none text-blue-500"
                rows={3}
                required
              ></textarea>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Post Comment
              </button>
            </form>

            {/* Comments List */}
            {comments.length === 0 ? (
              <p className="text-gray-600">No comments yet. Be the first!</p>
            ) : (
              <ul className="space-y-4">
                {comments.map((c) => (
                  <li key={c.id} className="border rounded-md p-3 bg-gray-50">
                    {c.text}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* ===== End Comments Section ===== */}

        </div>
      </article>
    </main>
  );
}
