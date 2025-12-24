/**
 * TypeScript types for Event data
 * Matches the Sanity schema in sanity/schemaTypes/event.ts
 */

export type SanityImage = {
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
  caption?: string;
  _type: "image";
};

export type SanityBlock = {
  _type: string;
  _key: string;
  children?: Array<{
    _type: string;
    _key: string;
    text: string;
    marks?: string[];
  }>;
  markDefs?: unknown[];
  style?: string;
};

export type Event = {
  _id: string;
  title: string;
  slug: {
    _type: "slug";
    current: string;
  };
  shortSummary?: string;
  description?: SanityBlock[]; // Block content array from Sanity
  startDate: string;
  endDate?: string;
  venue?: string;
  is_shown?: boolean;
  is_highlighted?: boolean;
  logo?: {
    url?: string;
    alt?: string;
  };
  mainImage?: {
    url?: string;
    alt?: string;
    caption?: string;
  };
  photos?: {
    url?: string;
    alt?: string;
  }[];
  bannerImage?: {
    url?: string;
    alt?: string;
  };
  bannerText?: string;
  cta?: {
    title?: string;
    description?: string;
    buttonText?: string;
    buttonLink?: string;
  };
  featuredAfter?: {
    _ref: string;
    _type: string;
  };
};

export type EventImage = {
  id: string;
  url: string;
  alt: string;
};
