/**
 * API helper functions for fetching event data from Sanity
 */

import { client } from "@/sanity/lib/client";
import { 
  GET_EVENTS_QUERY,
  GET_FEATURED_EVENT_QUERY,
  GET_UPCOMING_EVENTS_QUERY,
  GET_PAST_EVENTS_QUERY,
  GET_EVENT_BY_SLUG_QUERY 
} from "@/sanity/queries";
import type { Event } from "../../app/types/event";

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