/**
 * Date formatting utilities for events
 * Formats stored UTC datetimes in the event timezone (Sri Lanka).
 */

const EVENT_TIME_ZONE = "Asia/Colombo";

const eventTimeFormatter = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
  timeZone: EVENT_TIME_ZONE,
});

const eventDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: EVENT_TIME_ZONE,
});

/**
 * Formats event time in the event timezone.
 * Example: "2026-02-07T02:30:00.000Z" → "8:00 AM"
 */
export const formatEventTime = (isoString: string): string => {
  if (!isoString) return "";

  try {
    return eventTimeFormatter.format(new Date(isoString));
  } catch {
    return "";
  }
};

/**
 * Formats event date
 * Example: "2026-02-07T08:00:00Z" → "February 7, 2026"
 */
export const formatEventDate = (isoString: string): string => {
  if (!isoString) return "";

  try {
    return eventDateFormatter.format(new Date(isoString));
  } catch {
    return "";
  }
};

/**
 * Formats event time range
 * Example: formatEventTimeRange("2026-02-07T08:00:00Z", "2026-02-08T08:00:00Z")
 * → "8:00 AM - 8:00 AM"
 */
export const formatEventTimeRange = (
  startIsoString: string,
  endIsoString?: string
): string => {
  const startTime = formatEventTime(startIsoString);
  if (!endIsoString) return startTime;

  const endTime = formatEventTime(endIsoString);
  return `${startTime} - ${endTime}`;
};
