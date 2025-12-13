"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity.config";
import { useEffect, useState } from "react";

export const dynamic = "force-static";

export default function StudioPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return <NextStudio config={config} />;
}
