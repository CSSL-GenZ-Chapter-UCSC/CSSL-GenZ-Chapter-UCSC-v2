"use client";

import { useState, useEffect } from "react";
import { getBlogs } from "@/sanity/lib/getBlogs";

type DynamicButtonsProps = {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
};

export const DynamicButtons = ({
  selectedCategory,
  setSelectedCategory,
}: DynamicButtonsProps) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await getBlogs();

        if (!data || data.length === 0) {
          setCategories(["All"]);
          return;
        }

        const uniqueCategories = Array.from(
          new Set(
            data
              .map((blog) => blog.category)
              .filter(Boolean)
              .map((cat) => cat.trim())
          )
        ).sort();

        setCategories(["All", ...uniqueCategories]);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError("An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);


  const handleCategoryClick = (category: string) => {
    console.log("Category clicked:", category);
    setSelectedCategory(category);
  };

  if (loading) return <div className="text-center py-4">Loading categories...</div>;
  if (error) return <div className="text-red-500 text-center py-4">Error: {error}</div>;

  return (
    <div className="flex flex-wrap gap-4 mb-8">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleCategoryClick(category)}
          className={`
            relative overflow-hidden  cursor-pointer inline-flex 
            h-11 sm:h-12 md:h-[53px] lg:h-14
            items-center justify-center gap-2.5 
            px-6 sm:px-7 md:px-8 lg:px-9 
            rounded-[34px]
            font-semibold text-sm sm:text-base md:text-lg
            transition-all duration-300 
            ${
              selectedCategory === category
                ? "bg-[linear-gradient(90deg,var(--darkBlue,#1E448F)_0%,#4C9DFE_100%)] text-white hover:scale-105"
                : "bg-transparent border-2 border-[#1E448F] text-[#1E448F] hover:bg-[#1E448F] hover:text-white"
            }
          `}
        >
          {category}
        </button>
      ))}
    </div>
  );
};