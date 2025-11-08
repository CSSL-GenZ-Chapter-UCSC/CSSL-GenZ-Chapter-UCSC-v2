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

export type Event = {
  _id: string;
  title: string;
  slug: {
    _type: "slug";
    current: string;
  };
  excerpt?: string;
  startDate: string;
  logo?: {
    url?: string;
    alt?: string;
  };
  mainImage?: {
    url?: string;
    alt?: string;
    caption?: string;
  };
  subMainImage?: {
    url?: string;
    alt?: string;
  };
  otherImage1?: {
    url?: string;
    alt?: string;
  };
  otherImage2?: {
    url?: string;
    alt?: string;
  };
};

export type EventImage = {
  id: string;
  url: string;
  alt: string;
};