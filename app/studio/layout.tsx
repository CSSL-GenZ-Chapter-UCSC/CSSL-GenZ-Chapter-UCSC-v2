import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sanity Studio",
  description: "Content management studio",
};

// Prevent static generation for studio routes
export const dynamic = "force-dynamic";

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
