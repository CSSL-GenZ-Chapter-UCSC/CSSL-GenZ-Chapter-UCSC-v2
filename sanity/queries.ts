/**
 * Central GROQ queries for Sanity CMS
 * Fetches all image fields from event schema
 */

// Get 10 events with all image fields (ordered by startDate desc)
export const GET_EVENTS_QUERY = `*[_type == "event"] | order(startDate asc)[0...10]{
  _id,
  title,
  slug,
  excerpt,
  startDate,
  "logo": logo{
    "url": asset->url,
    "alt": alt
  },
  "mainImage": mainImage{
    "url": asset->url,
    "alt": alt,
    "caption": caption
  },
  "subMainImage": subMainImage{
    "url": asset->url,
    "alt": alt
  },
  "otherImage1": otherImage1{
    "url": asset->url,
    "alt": alt
  },
  "otherImage2": otherImage2{
    "url": asset->url,
    "alt": alt
  }
}`;

// Get all events for events listing page (without images)
export const GET_ALL_EVENTS_QUERY = `*[_type == "event"] | order(startDate desc){
  _id,
  title,
  slug,
  excerpt,
  startDate
}`;

// Get single event by slug with all images
export const GET_EVENT_BY_SLUG_QUERY = `*[_type == "event" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  excerpt,
  startDate,
  "logo": logo{
    "url": asset->url,
    "alt": alt
  },
  "mainImage": mainImage{
    "url": asset->url,
    "alt": alt,
    "caption": caption
  },
  "subMainImage": subMainImage{
    "url": asset->url,
    "alt": alt
  },
  "otherImage1": otherImage1{
    "url": asset->url,
    "alt": alt
  },
  "otherImage2": otherImage2{
    "url": asset->url,
    "alt": alt
  }
}`;