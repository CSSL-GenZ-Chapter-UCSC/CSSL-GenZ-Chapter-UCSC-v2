"use client";

import { NextStudio } from "next-sanity/studio";
import dynamic from "next/dynamic";
import config from "../../../sanity.config";

// Dynamically import to ensure it only renders on client
const StudioComponent = dynamic(
  () => Promise.resolve(() => <NextStudio config={config} />),
  { ssr: false },
);

export default function StudioPage() {
  return <StudioComponent />;
}
