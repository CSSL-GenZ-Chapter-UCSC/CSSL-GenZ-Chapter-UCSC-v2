/**
 * API helper functions for fetching event data from Sanity
 */

import { client } from "@/sanity/lib/client";
import { 
  GET_EVENTS_QUERY, 
  GET_ALL_EVENTS_QUERY,
  GET_EVENT_BY_SLUG_QUERY 
} from "@/sanity/queries";
import type { Event } from "../../app/types/event";

/**
 * Fetch 10 events with all images for EventSection (server-side)
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
 * Fetch all events for listing page (server-side)
 */
export async function getAllEvents(): Promise<Event[]> {
  try {
    const events = await client.fetch(GET_ALL_EVENTS_QUERY);
    return events;
  } catch (error) {
    console.error("Error fetching all events:", error);
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