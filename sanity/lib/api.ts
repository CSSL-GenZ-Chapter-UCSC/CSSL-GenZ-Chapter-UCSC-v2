/**
 * API helper functions for fetching event data from Sanity
 */

import { client } from "@/sanity/lib/client";
import {
  GET_EVENTS_QUERY,
  GET_FEATURED_EVENT_QUERY,
  GET_UPCOMING_EVENTS_QUERY,
  GET_PAST_EVENTS_QUERY,
  GET_EVENT_BY_SLUG_QUERY,
  GET_SIMILAR_EVENTS_QUERY,
  GET_EVENT_SLUGS_QUERY,
  GET_ANNOUNCEMENTS_QUERY,
  GET_TESTIMONIALS_QUERY,
} from "@/sanity/queries";
import type { Event } from "../../app/types/event";
import type { Announcement } from "../../app/components/shared/AnnouncementBar";
import type { TestimonialData } from "../../app/components/sections/Testimonial";

export type EventSlug = {
  slug: string;
};

/**
 * Fetch visible events with all images for EventSection (server-side)
 */
export async function getEvents(): Promise<Event[]> {
  try {
    const events = await client.fetch(GET_EVENTS_QUERY);
    return events;
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
}

/**
 * Fetch featured event (server-side)
 */
export async function getFeaturedEvent(): Promise<Event | null> {
  try {
    const event = await client.fetch(GET_FEATURED_EVENT_QUERY);
    return event;
  } catch (error) {
    console.error("Error fetching featured event:", error);
    return null;
  }
}

/**
 * Fetch upcoming events (server-side)
 */
export async function getUpcomingEvents(): Promise<Event[]> {
  try {
    const now = new Date().toISOString();
    const events = await client.fetch(GET_UPCOMING_EVENTS_QUERY, { now });
    return events;
  } catch (error) {
    console.error("Error fetching upcoming events:", error);
    return [];
  }
}

/**
 * Fetch past events (server-side)
 */
export async function getPastEvents(): Promise<Event[]> {
  try {
    const now = new Date().toISOString();
    const events = await client.fetch(GET_PAST_EVENTS_QUERY, { now });
    return events;
  } catch (error) {
    console.error("Error fetching past events:", error);
    return [];
  }
}

/**
 * Fetch single event by slug (server-side)
 */
export async function getEventBySlug(slug: string): Promise<Event | null> {
  try {
    const event = await client.fetch(GET_EVENT_BY_SLUG_QUERY, { slug });
    return event;
  } catch (error) {
    console.error(`Error fetching event with slug ${slug}:`, error);
    return null;
  }
}

/**
 * Fetch similar events (server-side)
 * Returns events that have featuredAfter pointing to the current event
 */
export async function getSimilarEvents(eventId: string): Promise<Event[]> {
  try {
    const events = await client.fetch(GET_SIMILAR_EVENTS_QUERY, { eventId });
    return events;
  } catch (error) {
    console.error(`Error fetching similar events for ${eventId}:`, error);
    return [];
  }
}

/**
 * Fetch all event slugs (server-side)
 */
export async function getAllEventSlugs(): Promise<EventSlug[]> {
  try {
    const slugs = await client.fetch(GET_EVENT_SLUGS_QUERY);
    return slugs;
  } catch (error) {
    console.error("Error fetching event slugs:", error);
    return [];
  }
}

/**
 * Fetch active announcements (server-side)
 */
export async function getAnnouncements(): Promise<Announcement[]> {
  try {
    const announcements = await client.fetch(GET_ANNOUNCEMENTS_QUERY);
    return announcements.map(
      (a: { _id: string; label: string; title: string; message: string }) => ({
        id: a._id,
        label: a.label,
        title: a.title,
        message: a.message,
      })
    );
  } catch (error) {
    console.error("Error fetching announcements:", error);
    return [];
  }
}

/**
 * Fetch all testimonials (server-side)
 */
export async function getTestimonials(): Promise<TestimonialData[]> {
  try {
    const testimonials = await client.fetch(GET_TESTIMONIALS_QUERY);
    return testimonials;
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return [];
  }
}
