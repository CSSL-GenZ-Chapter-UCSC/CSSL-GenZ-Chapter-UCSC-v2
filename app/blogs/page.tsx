"use client";

import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { BlogsListing } from "../components/sections/BlogsListing";
import { useState, useEffect } from "react";

type Blog = {
  _id: string;
  title: string;
  mainImage?: { url: string };
  author?: { name: string };
  excerpt?: string;
  publishedAt?: string;
  category?: string;
};

async function getBlogs(): Promise<Blog[]> {
  const query = `*[_type=="blog"]|order(publishedAt desc)[0...10]{
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
    
      <main className="flex flex-col">
            <BlogsListing />
      </main>

      
      

  );
}
