import Link from "next/link";
import { client } from "@/sanity/lib/client";

type Post = {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  publishedAt?: string;
};

async function getPosts(): Promise<Post[]> {
  const query = `*[_type=="post" && defined(slug.current)]|order(publishedAt desc)[0...20]{_id,title,slug,excerpt,publishedAt}`;
  return client.fetch(query);
}

export const metadata = {
  metadataBase: new URL("https://www.ucscgenz.lk"),
  title: "Posts - CSSL GenZ Chapter",
  description:
    "Read the latest articles and updates from the CSSL GenZ Chapter at UCSC — insights, stories, and ideas from passionate students and young professionals.",
  openGraph: {
    title: "Posts - CSSL GenZ Chapter",
    description:
      "Read the latest articles and updates from the CSSL GenZ Chapter at UCSC — insights, stories, and ideas from passionate students and young professionals.",
    url: "https://www.ucscgenz.lk/posts",
    siteName: "CSSL GenZ Chapter of UCSC",
    images: [
      {
        url: "/CSSL Logo final - white.png",
        width: 512,
        height: 512,
        alt: "CSSL GenZ Chapter Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Posts - CSSL GenZ Chapter",
    description:
      "Latest articles and updates from the CSSL GenZ Chapter at UCSC.",
    images: ["/CSSL Logo final - white.png"],
  },
};

export default async function PostsPage() {
  const posts = await getPosts();
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold">Posts</h1>
      {posts.length === 0 ? (
        <p className="mt-6 text-foreground/80">No posts yet.</p>
      ) : (
        <ul className="mt-6 space-y-4">
          {posts
            .filter((p) => p?.slug?.current)
            .map((p) => (
              <li key={p._id} className="border-b border-foreground/10 pb-4">
                <Link
                  href={`/posts/${p.slug.current}`}
                  className="text-xl font-semibold hover:underline"
                >
                  {p.title}
                </Link>
                {p.excerpt ? (
                  <p className="mt-1 text-foreground/70">{p.excerpt}</p>
                ) : null}
              </li>
            ))}
        </ul>
      )}
    </main>
  );
}
