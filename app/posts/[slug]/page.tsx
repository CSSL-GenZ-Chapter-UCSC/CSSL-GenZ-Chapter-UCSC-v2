import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";

type Post = {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  publishedAt?: string;
};

async function getPost(slug: string | undefined): Promise<Post | null> {
  if (typeof slug !== "string" || slug.length === 0) return null;
  const query = `*[_type=="post" && slug.current==$slug][0]{_id,title,slug,excerpt,publishedAt}`;
  const data = await client.fetch(query, { slug });
  return data ?? null;
}

export async function generateStaticParams() {
  const slugs: string[] = await client.fetch(
    `*[_type=="post" && defined(slug.current)].slug.current`
  );
  return slugs
    .filter((s): s is string => typeof s === "string" && s.length > 0)
    .map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug?: string };
}) {
  const post = await getPost(params?.slug);
  return { title: post?.title ?? "Post" };
}

export default async function PostPage({
  params,
}: {
  params: { slug?: string };
}) {
  const post = await getPost(params?.slug);
  if (!post) notFound();
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      {post.excerpt ? (
        <p className="mt-4 text-foreground/80">{post.excerpt}</p>
      ) : null}
    </main>
  );
}
