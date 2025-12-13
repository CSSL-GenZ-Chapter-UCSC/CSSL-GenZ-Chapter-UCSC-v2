"use client";

import { useState, useEffect } from "react";
import { fetchCategoriesAction } from "@/app/actions/sanity";
import { Button } from "../shared/Button";

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
        const uniqueCategories = await fetchCategoriesAction();

        if (!uniqueCategories || uniqueCategories.length === 0) {
          setCategories(["All"]);
          return;
        }

        const sortedCategories = uniqueCategories.sort();
        setCategories(["All", ...sortedCategories]);
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

  if (loading)
    return <div className="text-center py-4">Loading categories...</div>;
  if (error)
    return <div className="text-red-500 text-center py-4">Error: {error}</div>;

  return (
    <div className="flex flex-wrap gap-4 mb-8">
      {categories.map((category) => (
        <div key={category} onClick={() => handleCategoryClick(category)}>
          <Button
            text={category}      // <-- pass text here
            href="#"             // <-- required by Button, can be non-functional
            className={`
              relative overflow-hidden cursor-pointer inline-flex text-red-500
              h-11 sm:h-12 md:h-[53px] lg:h-14
              items-center justify-center gap-2.5
              px-6 sm:px-7 md:px-8 lg:px-9
              bg-gradient-to-b from-[#1E448F] to-[#4C9DFE]
              rounded-[34px]
              font-semibold text-sm sm:text-base md:text-lg
              transition-all duration-300
              ${
                selectedCategory === category
                  ? "p-[2px] bg-gradient-to-r from-[#1E448F] to-[#4C9DFE] text-white hover:scale-105"
                  : "bg-transparent border-2 border-[#1E448F] text-[#1E448F] hover:bg-[#1E448F] hover:text-white"
              }
            `}
          />
        </div>
      ))}
    </div>
  );
};