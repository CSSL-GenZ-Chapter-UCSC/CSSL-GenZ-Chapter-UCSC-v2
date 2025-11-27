import createImageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

// Hardcoded project ID and dataset
const projectId = "3aby8hgp";
const dataset = "production";

// Create the Sanity image builder
const builder = createImageUrlBuilder({
  projectId: projectId,
  dataset: dataset
});

// Function to generate image URLs
export const urlFor = (source: SanityImageSource) => {
  return builder.image(source);
};
