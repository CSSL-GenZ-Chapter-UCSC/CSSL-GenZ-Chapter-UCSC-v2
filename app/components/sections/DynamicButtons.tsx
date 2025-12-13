"use client";

import { useState, useEffect } from "react";
import { fetchCategoriesAction } from "@/app/actions/sanity";
import { motion, AnimatePresence } from "motion/react";

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

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
    setIsDropdownOpen(false);
  };

  if (loading)
    return <div className="text-center py-4">Loading categories...</div>;
  if (error) return <div className="text-center py-4">Error: {error}</div>;

  return (
    <>
      {/* Mobile Dropdown */}
      <div className="md:hidden relative flex justify-end w-full mb-8 z-20">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-auto gap-5 flex items-center justify-between pl-6 pr-4 h-11 sm:h-12 rounded-[34px] font-normal cursor-pointer text-sm sm:text-base transition-all duration-300 bg-[linear-gradient(90deg,var(--darkBlue,#1E448F)_0%,#4C9DFE_100%)] text-white hover:scale-105"
        >
          <span>{selectedCategory}</span>
          <svg
            className={`w-4 h-4 transition-transform duration-300 ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        <AnimatePresence>
          {isDropdownOpen && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: { opacity: 0, filter: "blur(8px)" },
                visible: {
                  opacity: 1,
                  filter: "blur(0px)",
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
                exit: {
                  opacity: 0,
                  filter: "blur(8px)",
                },
              }}
              className="absolute flex flex-col w-auto top-full right-0 mt-2 p-1 bg-black border-2 border-[#1E448F] rounded-4xl overflow-hidden shadow-lg z-30"
            >
              {categories.map((category) => (
                <motion.button
                  key={category}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  onClick={() => handleCategoryClick(category)}
                  className={`w-auto cursor-pointer text-left px-6 py-3 transition-colors hover:bg-[#1E448F] hover:text-white ${
                    selectedCategory === category
                      ? "text-white bg-[#204895] rounded-4xl"
                      : "text-[#1E448F]"
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop Buttons */}
      <div className="hidden md:flex flex-wrap justify-start gap-4 mb-8">
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
    </>
  );
};
