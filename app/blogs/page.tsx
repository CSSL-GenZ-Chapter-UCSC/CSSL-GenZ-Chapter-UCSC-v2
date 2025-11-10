"use client";

import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { useState, useEffect } from "react";

type Blog = {
  _id: string;
  title: string;
  mainImage?: { asset: { url: string } };
  author?: { name: string };
  excerpt?: string;
  publishedAt?: string;
  category?: string;
};

async function getBlogs(): Promise<Blog[]> {
  const query = `*[_type=="blog"]|order(publishedAt desc)[0...50]{
    _id,
    title,
    "mainImage": mainImage.asset->{url},
    "author": author-> { name },
    excerpt,
    publishedAt,
    category
  }`;
  return client.fetch(query);
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const data = await getBlogs();
        setBlogs(data);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
        setError("Failed to load blogs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading blogs...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;
  if (blogs.length === 0) return <p className="text-center mt-10">No blogs found.</p>;

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-10">Blogs</h1>
      <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog, index) => {
          const numericId = index + 1; // Numeric ID
          return (
            <article key={blog._id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md flex flex-col">
              {blog.mainImage?.url && (
                <div className="relative w-full h-56">
                  <Image src={blog.mainImage.url} alt={blog.title} fill className="object-cover" />
                </div>
              )}
              <div className="p-4 flex flex-col flex-1 justify-between">
                <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                {blog.excerpt && <p className="text-gray-700 line-clamp-3">{blog.excerpt}</p>}
                <div className="mt-4">
                  <Link
                    href={`/blogs/${numericId}`}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
                  >
                    View Blog
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
}
