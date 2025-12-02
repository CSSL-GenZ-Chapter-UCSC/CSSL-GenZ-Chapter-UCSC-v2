"use client";

import { SingleBlog } from "../../components/sections/SingleBlog";
import { getBlogById, type Blog } from "@/sanity/lib/getBlogs";
import { useState,useEffect } from "react"; 



export default function BlogDetailPage() {
  return (
    <main className="flex flex-col">
        <SingleBlog />; 
    </main>
  );
}
