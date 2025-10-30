import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";

type Post = {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  publishedAt?: string;
};

async function getPost(slug: string): Promise<Post | null> {
  const query = `*[_type=="post" && slug.current==$slug][0]{_id,title,slug,excerpt,publishedAt}`;
  const data = await client.fetch(query, { slug });
  return data ?? null;
}

export async function generateStaticParams() {
  const slugs: { slug: { current: string } }[] = await client.fetch(
    `*[_type=="post"].slug`
  );
  return slugs.filter(Boolean).map((s) => ({ slug: s?.slug?.current }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);
  return { title: post?.title ?? "Post" };
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);
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
