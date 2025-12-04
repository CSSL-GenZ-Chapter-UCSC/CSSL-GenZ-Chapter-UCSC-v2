"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { getBlogs, type Blog } from "@/sanity/lib/getBlogs";
import { urlFor } from "@/sanity/lib/image";
import { usePathname } from "next/navigation";







export const SingleBlogLastSection = () => {

  const path = usePathname();

  const [blogs, setBlogs] = useState<Blog[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  

  const pathname = usePathname();
  
    useEffect(() => {
      
      
      
      getBlogs()
        .then((data: Blog[] | null) => {
          console.log("Raw data from getBlogs:", data);
          
          if (!data || !Array.isArray(data)) {
            console.log("No data or not an array");
            setBlogs([]);
            return;
          }
  
          const sorted = data
            .filter(blog => blog.publishedAt)
            .sort((a, b) => new Date(b.publishedAt!).getTime() - new Date(a.publishedAt!).getTime());

  
          setBlogs(sorted);
        })
        .catch((err) => {
          console.error("Error fetching blogs:", err);
          setError(err.message);
        })
        .finally(() => setLoading(false));
    }, []);


  if (loading) return <p>Loading...</p>;

  if (!blogs) {
    return <p className="text-red-500">No blogs available.</p>;
  }

  

  const sanitizedBlogId = path.split("/")[2];

  // Find index of current blog
  const currentIndex = blogs.findIndex(
    blog => blog._id === sanitizedBlogId
  );

  if (currentIndex === -1) return <p>No blogs found.</p>;

  // Get nearest above and below blogs
  const nearestBlogs: Blog[] = [];
  if (currentIndex > 0 && currentIndex < blogs.length - 1) nearestBlogs.push(blogs[currentIndex + 1]); // below
  if (currentIndex > 0 && currentIndex < blogs.length - 2) nearestBlogs.push(blogs[currentIndex + 2]);
  if (currentIndex > 0 && currentIndex < blogs.length - 3) nearestBlogs.push(blogs[currentIndex + 3]);


  if (nearestBlogs.length === blogs.length) return <p className="text-gray-400 py-12">No other blogs.</p>;

 
  return (
    <div className="bg-black text-white p-1 pt-1 relative z-10">
      {/* Header Navigation */}
      <div className="text-[#318AFF] flex flex-row gap-300 [@media(max-width:800px)]:gap-[240px] [@media(max-width:1250px)]:gap-[590px]">
        <h2 className="text-2xl text-blue-400 mt-8 lg:text-xl">Read Next</h2>
        <Link href={`/blogs/`} className="group cursor:pointer w-[980px]">
          <button className="text-[78px] flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
            &lt;
            <span className="text-lg">Back to All Blogs</span>
          </button>
        </Link>
      </div>

      {/* Blog Posts Grid */}
      <div className="flex flex-row gap-3">
        {nearestBlogs.map(blog => (
          <Link href={`/blogs/${blog._id}`} key={blog._id} className="group cursor:pointer w-[980px]">
            <div>
              {/* Blog image */}
              <div className="bg-gray-700 aspect-video mb-4 overflow-hidden">
                {blog.mainImage ? (
                  <img
                    src={urlFor(blog.mainImage).width(1200).url()}
                    alt={blog.title}
                    className="w-full h-full font-[500] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}
              </div>
              {/* Blog title and date */}
              <h3 className="text-2xl font-medium [@media(max-width:400px)]:text-xl mb-2 group-hover:text-blue-400 transition-colors">
                {blog.title}
              </h3>
              <p className="text-xl text-[#4C9DFE] text-sm">
                {blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }) : ""}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )    
}


