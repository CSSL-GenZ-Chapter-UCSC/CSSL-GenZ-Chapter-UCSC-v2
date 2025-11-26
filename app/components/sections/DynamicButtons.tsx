"use client";

import { useState, useEffect } from "react";
import { getBlogs, Blog } from "@/sanity/lib/getBlogs";
import { Button } from "../shared/Button";

export const DynamicButtons = () => {
 
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);

    getBlogs()
        .then((data: Blog[]) => {
            if (data.length === 0) {
              setCategories([]);
              return;
            }
            const uniqueCategories = Array.from(
              new Set(data.map((blog) => blog.category))
            ).sort();

            setCategories(["All", ...uniqueCategories]);
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false))
  }, []);

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="border border-red-500 -mt-[130px] sm:-mt-[140px] h-16 w-full mx-auto mb-15 mt-7 flex flex-row flex-wrap gap-3">
      {categories.map((category) => (
        <div
          key={category}
          onClick={() => setSelectedCategory(category)}
          className="cursor-pointer"
          role="button"
          tabIndex={0}
          onKeyPress={(e) => {
            if (e.key === "Enter") setSelectedCategory(category);
          }}
        >
          <Button
            text={category}
            href="#" // or some link if needed
            className={`px-7 py-2 rounded border ${selectedCategory === category? "bg-blue-500 text-white": "bg-white text-black"}`}
          />
        </div>
      ))}
    </div>
  )  
}