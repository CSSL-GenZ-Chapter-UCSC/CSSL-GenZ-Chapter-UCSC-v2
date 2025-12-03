/**
 * Central GROQ queries for Sanity CMS
 * Fetches all image fields from event schema
 */

// Get events for EventsSection component (only visible events, ordered by startDate asc)
export const GET_EVENTS_QUERY = `*[_type == "event" && is_shown == true] | order(startDate asc){
  _id,
  title,
  slug,
  shortSummary,
  startDate,
  endDate,
  venue,
  is_shown,
  is_highlighted,
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

// Get featured event (is_highlighted == true and is_shown == true, ordered by startDate asc)
export const GET_FEATURED_EVENT_QUERY = `*[_type == "event" && is_highlighted == true && is_shown == true] | order(startDate asc)[0]{
  _id,
  title,
  slug,
  shortSummary,
  bannerText,
  startDate,
  endDate,
  venue,
  "mainImage": mainImage{
    "url": asset->url,
    "alt": alt,
    "caption": caption
  },
  "bannerImage": bannerImage{
    "url": asset->url,
    "alt": alt
  }
}`;

// Get upcoming events (startDate >= now, is_shown == true, ordered by startDate asc)
export const GET_UPCOMING_EVENTS_QUERY = `*[_type == "event" && startDate >= $now && is_shown == true] | order(startDate asc){
  _id,
  title,
  slug,
  startDate,
  endDate,
  venue,
  "mainImage": mainImage{
    "url": asset->url,
    "alt": alt
  }
}`;

// Get past events (startDate < now, is_shown == true, ordered by startDate desc, limited to 10)
export const GET_PAST_EVENTS_QUERY = `*[_type == "event" && startDate < $now && is_shown == true] | order(startDate desc)[0...10]{
  _id,
  title,
  slug,
  shortSummary,
  startDate,
  venue,
  "mainImage": mainImage{
    "url": asset->url,
    "alt": alt
  }
}`;

// Get single event by slug with all fields and images
export const GET_EVENT_BY_SLUG_QUERY = `*[_type == "event" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  shortSummary,
  description,
  bannerText,
  cta{
    title,
    description,
    buttonText,
    buttonLink
  },
  startDate,
  endDate,
  venue,
  is_shown,
  is_highlighted,
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
  },
  "bannerImage": bannerImage{
    "url": asset->url,
    "alt": alt
  },
  "photos": photos[]{
    "url": asset->url,
    "alt": alt
  },
  featuredAfter
}`;

// Get all slugs for static params
export const GET_EVENT_SLUGS_QUERY = `*[_type == "event" && defined(slug.current)]{
  "slug": slug.current
}`;

// Get similar events (exclude current event, within 6 months time range, limit to 3)
export const GET_SIMILAR_EVENTS_QUERY = `*[
  _type == "event" && 
  _id != $eventId && 
  is_shown == true &&
  startDate >= $minDate &&
  startDate <= $maxDate
] | order(startDate desc)[0...3]{
  _id,
  title,
  slug,
  shortSummary,
  startDate,
  endDate,
  venue,
  "logo": logo{
    "url": asset->url,
    "alt": alt
  },
  "mainImage": mainImage{
    "url": asset->url,
    "alt": alt
  },
  "subMainImage": subMainImage{
    "url": asset->url,
    "alt": alt
  }
}`;