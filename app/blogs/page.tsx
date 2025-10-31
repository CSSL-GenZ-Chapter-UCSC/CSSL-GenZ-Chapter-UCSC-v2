"use client";

import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { useState, useEffect } from "react";

type Blog = {
  _id: string;
  title: string;
  slug: { current: string };
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
    slug,
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
  const [visibleCount, setVisibleCount] = useState(9);
  const [activeCategory, setActiveCategory] = useState("All");

  //const categories = ["All", "Tutorials", "News", "Updates"];

  const categories = ["All", "Events", "Workshops", "Competitions", "Announcements"];


  useEffect(() => {
    getBlogs().then(setBlogs);
  }, []);

  const filteredBlogs =
    activeCategory === "All"
      ? blogs
      : blogs.filter((b) => b.category === activeCategory);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      {/* Header */}
      <section className="text-center mb-12">
        <div className="relative mx-auto mb-6 w-full h-64 rounded-lg shadow-sm overflow-hidden">
          <Image
            src="/images/blog-header.jpg"
            alt="Blog Header"
            fill
            sizes="(max-width: 1152px) 100vw, 1152px"
            className="object-cover"
            priority
          />
        </div>
        <h1 className="text-4xl font-bold">Blogs</h1>
        <p className="mt-4 text-gray-600">
          Stay updated with the latest events, workshops, and announcements
        </p>
      </section>

      {/* Filter Buttons */}
      <section className="flex justify-center mb-10 space-x-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-lg transition ${
              activeCategory === cat
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-blue-600 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </section>

      {/* Blog Grid */}
      {filteredBlogs.length === 0 ? (
        <p className="text-center text-gray-500">No blogs yet.</p>
      ) : (
        <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredBlogs.slice(0, visibleCount).map((blog) => (
            <article
              key={blog._id}
              className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col"
            >
              {blog.mainImage?.asset?.url && (
                <div className="relative w-full h-56">
                  <Image
                    src={blog.mainImage.asset.url}
                    alt={blog.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-4 flex flex-col flex-1 justify-between">
                <div>
                  <Link
                    href={`/blogs/${blog.slug.current}`}
                    className="text-xl font-semibold hover:underline"
                  >
                    {blog.title}
                  </Link>
                  {blog.author?.name && (
                    <p className="text-sm text-gray-500 mt-1">
                      By {blog.author.name}
                    </p>
                  )}
                  {blog.excerpt && (
                    <p className="mt-2 text-gray-700 line-clamp-3">
                      {blog.excerpt}
                    </p>
                  )}
                </div>
                {blog.publishedAt && (
                  <p className="mt-3 text-sm text-gray-400">
                    {new Date(blog.publishedAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            </article>
          ))}
        </section>
      )}

      {/* Load More */}
      {visibleCount < filteredBlogs.length && (
        <div className="flex justify-center mt-12">
          <button
            onClick={() => setVisibleCount((prev) => prev + 9)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Load More
          </button>
        </div>
      )}
    </main>
  );
}
