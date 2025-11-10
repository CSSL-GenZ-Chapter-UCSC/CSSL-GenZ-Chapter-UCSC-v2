"use client"

import Link from "next/link"
import Image from "next/image"
import { client } from "@/sanity/lib/client"
import { useState, useEffect } from "react"

type Blog = {
  _id: string
  title: string
  slug: { current: string }
  mainImage?: { url: string }
  author?: { name: string }
  excerpt?: string
  publishedAt?: string
  category?: string
}

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
  }`
  return client.fetch(query)
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const data = await getBlogs()
        setBlogs(data)
      } catch (error) {
        console.error("Failed to fetch blogs:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchBlogs()
  }, [])

  const featuredBlogs = blogs.slice(0, 5)

  // Auto-slide carousel every 4s
  useEffect(() => {
    if (featuredBlogs.length < 2) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredBlogs.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [featuredBlogs])

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredBlogs.length) % featuredBlogs.length)
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredBlogs.length)
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="px-6 py-16 md:px-12 md:py-24">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Latest Blogs
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
            Exploring trends, ideas, and success stories that shape the future of community and connection.
          </p>
          <Link href="../../blogs">
            <button className="inline-flex items-center gap-3 bg-gradient-to-r from-[#1E448F] to-[#4C9DFE] text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50">
              View All Blogs
            </button>
          </Link>
        </div>
      </section>

      {/* Featured Blog Carousel */}
      {loading ? (
        <section className="px-6 py-12 md:px-12">
          <div className="max-w-6xl mx-auto animate-pulse h-96 bg-muted rounded-lg" />
        </section>
      ) : featuredBlogs.length > 0 ? (
        <section className="px-6 py-12 md:px-12 relative overflow-hidden">
          <div className="max-w-6xl mx-auto relative flex items-center justify-center h-[24rem] md:h-[32rem]">
            
            {/* Left Button */}
            <button
              onClick={prevSlide}
              className="absolute left-0 z-30 bg-white/80 hover:bg-white text-black rounded-full p-3 shadow-lg transition-all duration-300"
            >
              &lt;
            </button>

            {/* Right Button */}
            <button
              onClick={nextSlide}
              className="absolute right-0 z-30 bg-white/80 hover:bg-white text-black rounded-full p-3 shadow-lg transition-all duration-300"
            >
              &gt;
            </button>

            {/* Carousel Blogs */}
            <div className="w-full flex items-center justify-center gap-6 relative">
              {featuredBlogs.map((blog, index) => {
                const isCenter = index === currentIndex
                let className =
                  "opacity-0 w-0 flex-shrink-0 z-0 transition-all duration-700"

                if (isCenter)
                  className =
                    "flex w-[700px] opacity-100 z-20 transition-all duration-700 flex-shrink-0"
                else if (index === (currentIndex - 1 + featuredBlogs.length) % featuredBlogs.length)
                  className =
                    "flex w-[300px] opacity-70 z-10 transition-all duration-700 flex-shrink-0 -translate-x-6"
                else if (index === (currentIndex + 1) % featuredBlogs.length)
                  className =
                    "flex w-[300px] opacity-70 z-10 transition-all duration-700 flex-shrink-0 translate-x-6"

                return (
                  <div key={blog._id} className={className}>
                    <Link href={`/blogs/${blog.slug.current}`}>
                      <div className="flex bg-card rounded-lg shadow-lg h-full overflow-hidden">
                        {/* Image */}
                        {blog.mainImage?.url && (
                          <div className={`${isCenter ? "w-[700px]" : "w-[0px]"} relative h-64 md:h-96`}>
                            <Image
                              src={blog.mainImage.url}
                              alt={blog.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        {/* Text only for center */}
                        {isCenter && (
                          <div className="w-1/2 p-6 flex flex-col justify-center">
                            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                              {blog.title}
                            </h2>
                            <p className="text-sm text-muted-foreground mb-4 flex-grow">
                              {blog.excerpt || "No description available."}
                            </p>
                            {blog.author && (
                              <p className="text-xs text-muted-foreground">
                                By {blog.author.name}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  )
}
