/**
 * Date formatting utilities for events
 * Extracts time directly from ISO strings without timezone conversion
 */

/**
 * Formats event time without timezone conversion
 * Example: "2026-02-07T08:00:00Z" → "8:00 AM"
 */
export const formatEventTime = (isoString: string): string => {
  if (!isoString) return "";

  try {
    // Extract time from ISO string using regex
    // Format: YYYY-MM-DDTHH:mm:ss
    const timeMatch = isoString.match(/T(\d{2}):(\d{2}):/);
    if (!timeMatch) return "";

    const hour = parseInt(timeMatch[1], 10);
    const minute = parseInt(timeMatch[2], 10);

    // Convert to 12-hour format
    const period = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;

    return `${displayHour}:${minute.toString().padStart(2, "0")} ${period}`;
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
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
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
