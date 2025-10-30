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
  const query = `*[_type=="post"]|order(publishedAt desc)[0...20]{_id,title,slug,excerpt,publishedAt}`;
  return client.fetch(query);
}

export const metadata = {
  title: "Posts",
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
          {posts.map((p) => (
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
