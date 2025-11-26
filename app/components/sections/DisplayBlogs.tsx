"use client";

import { useState,useEffect } from "react";
import { Button } from "../shared/Button";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { motion } from "motion/react";
import Link from "next/link";
import { h1 } from "motion/react-client";
import { PageTitle } from "../shared/PageTitle";
import { Container } from "../shared/Container";






export const DisplayBlog = () => {

  return (
    <section className="h-screen flex items-start justify-center bg-black text-white sm:pt-30 pt-20">
      <Container className="h-full pb-20">
        <div className="w-full h-full flex flex-col sm:items-stretch ">
          <PageTitle
              text="BLOGS"
              className="lg:text-[213px] md:text-[125px] sm:text-[100px] text-[60px]"
          />
          <div className="flex px-2.5 justify-between items-start self-stretch flex-1">
            <motion.p
              initial={{ opacity: 0, filter: "blur(8px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.3, ease: "easeOut", delay: 0.15 }}
              className="text-[#afafaf] font-[Poppins] sm:text-[16px] text-[12px] not-italic font-medium sm:leading-[23px] leading-4 sm:w-[274px] w-[200px]"
            >
              Exploring trends, ideas, and success stories that shape the future of community and connection.
            </motion.p>
          </div>     
        </div>
      </Container>
    </section>
  );

}

  {/*const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");



  useEffect(() => {
    
      setLoading(true);

      getBlogs() // fetch all blogs
        .then((data) => {
           setBlogs(data);
           const uniqueCategories = Array.from(new Set(data.map(blog => blog.category))).sort();
           setCategories(uniqueCategories.length ? ["All", ...uniqueCategories] : []);
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));

  }, []);

  return (
    <section className="h-screen flex items-start justify-center bg-black mb-300 text-white sm:pt-30 pt-20">
      <Container className="h-full pb-2 !px-0">
        <div className="w-full h-full flex flex-col sm:items-stretch ">
          <PageTitle
            text="BLOGS"
            className="lg:text-[213px] md:text-[125px] sm:text-[100px] text-[60px]"
          /> 




          <div className="flex px-2.5 justify-between items-start self-stretch flex-1">
            <motion.p
              initial={{ opacity: 0, filter: "blur(8px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.3, ease: "easeOut", delay: 0.15 }}
              className="text-[#afafaf] font-[Poppins] sm:text-[16px] text-[12px] not-italic font-medium sm:leading-[23px] leading-4 sm:w-[274px] w-[200px]"
            >
              Exploring trends,ideas,and success stories that shape the future of community and connection
            </motion.p>  
          </div>

          <div className="grid grid-cols-2 gap-3 w-full mx-auto mb-15 mt-7 sm:max-w-none sm:flex flex-wrap sm:items-end sm:self-stretch sm:flex-1">
              {categories.map((category) => (
                        <Button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          text={category}
                          className={`px-4 py-2 rounded border ${selectedCategory === category ? "bg-blue-1500 text-white" : "bg-white text-black"}`}
                        />    
              ))}
          </div>


















              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 pb-17 bg-black pr-20 w-[107%] ">
                    {loading ? (
                      <p>Loading...</p>
                    ) : error ? (
                      <p className="text-red-500">Error: {error}</p>
                    ) : blogs.length === 0 ? (
                      <p>No blogs available</p>
                    ) : (
                      blogs
                        .filter(blog => selectedCategory === "All" || blog.category === selectedCategory)
                        .map(blog => (
                          <article
                            key={blog._id}
                            className="border rounded-none overflow-hidden shadow-sm hover:shadow-md flex flex-col bg-black text-black"
                          >
                            {blog.mainImage?.url && (
                              <div className="relative w-full h-56">
                                <Image
                                  src={blog.mainImage.url}
                                  alt={blog.title}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            )}
                            <div className="p-4 flex flex-col flex-1 justify-between mt-1">
                              <h2 className="text-xl font-semibold mb-2 text-white">{blog.title}</h2>
                              {blog.excerpt && <p className="text-[#9AA0A6] line-clamp-3">{blog.excerpt}</p>}
                              <p className="text-[#4C9DFE]">{blog.publishedAt.substring(0, 10)}</p>
                              <div className="mt-4">
                                {/*<Link
                                  href={`/blogs/${blog._id}`}
                                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
                                >
                                  View Blog
                                </Link>}
                              </div>
                            </div>
                          </article>
                        ))
                    )}
                  </div>












        </div>
      </Container>
    </section>
  );
};*/}


