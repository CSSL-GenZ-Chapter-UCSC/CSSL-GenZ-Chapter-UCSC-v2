"use client";

import type { Event } from "@/app/types/event";
import Link from "next/link";
import Image from "next/image";
import { Container } from "../shared/Container";
import EventsPagination from "./EventsPagination";
import { motion } from "motion/react";
import { PageTitle } from "../shared/PageTitle";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const contentContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const contentItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

interface EventsListingProps {
  featuredEvent: Event | null;
  upcomingEvents: Event[];
  pastEvents: Event[];
}

export const EventsListing = ({
  featuredEvent,
  upcomingEvents,
  pastEvents,
}: EventsListingProps) => {
  // Remove featured event from upcoming events if it exists
  const nonFeaturedUpcoming = featuredEvent
    ? upcomingEvents.filter((event) => event._id !== featuredEvent._id)
    : upcomingEvents;

  return (
    <main className="min-h-screen bg-black text-white font-poppins overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-40 pb-16 md:py-32 lg:py-40 overflow-hidden">
        <Container>
          <div className="relative">
            {/* Gradient blur circle near E */}
            <div className="absolute -left-40 -top-10 w-75 h-100 bg-black rounded-full blur-[80px] pointer-events-none z-10" />
            <div className="absolute left-80 -top-20 w-60 h-60 bg-black rounded-full blur-[120px] pointer-events-none z-10" />

            <PageTitle
              text="EVENTS"
              className="text-[56px] md:text-[120px] lg:text-[180px] font-bold leading-none tracking-tight relative z-20"
            />
          </div>
          <motion.div
            initial={{ opacity: 0, filter: "blur(8px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.3, ease: "easeOut", delay: 0.15 }}
            className="z-20"
          >
            <p className="mt-6 md:mt-10 text-sm md:text-base text-white/80 max-w-2xl relative z-20">
              Join us for events that inspire growth, spark creativity, and
              connect changemakers.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Featured Event Card */}
      <section className="pb-12 md:pb-20">
        <Container>
          {featuredEvent && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden h-[400px] md:h-[600px] rounded-lg group"
            >
              {/* Background image from bannerImage or mainImage */}
              {featuredEvent.bannerImage?.url ||
              featuredEvent.mainImage?.url ? (
                <div className="absolute inset-0">
                  <Image
                    src={
                      featuredEvent.bannerImage?.url ||
                      featuredEvent.mainImage?.url ||
                      ""
                    }
                    alt={
                      featuredEvent.bannerImage?.alt ||
                      featuredEvent.mainImage?.alt ||
                      featuredEvent.title
                    }
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              ) : (
                <div className="absolute inset-0 bg-linear-to-br from-blue-900 to-black" />
              )}

              <div className="absolute inset-0 bg-black/40" />

              <motion.div
                variants={contentContainer}
                initial="hidden"
                animate="show"
                className="relative h-full flex flex-col justify-end p-6 md:p-12"
              >
                <motion.span
                  variants={contentItem}
                  className="inline-block px-4 py-1 md:px-8 md:py-2 bg-blue-600 text-white text-xs md:text-sm font-medium rounded-full w-fit mb-3 md:mb-4"
                >
                  Featured
                </motion.span>

                <motion.h2
                  variants={contentItem}
                  className="text-2xl md:text-4xl lg:text-5xl mb-3 md:mb-4 font-semibold"
                >
                  {featuredEvent.title}
                </motion.h2>

                <motion.div
                  variants={contentItem}
                  className="flex flex-wrap gap-3 md:gap-6 text-xs md:text-base text-white/90 mb-3 md:mb-4"
                >
                  <div className="flex items-center gap-2">
                    {/* Calendar Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="20px"
                      viewBox="0 -960 960 960"
                      width="20px"
                      fill="currentColor"
                    >
                      <path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z" />
                    </svg>
                    <span>
                      {new Date(featuredEvent.startDate).toLocaleDateString(
                        "en-US",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }
                      )}
                    </span>
                  </div>
                  {featuredEvent.endDate && (
                    <div className="flex items-center gap-2">
                      {/* Clock Icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="20px"
                        viewBox="0 -960 960 960"
                        width="20px"
                        fill="currentColor"
                      >
                        <path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z" />
                      </svg>
                      <span>
                        {new Date(featuredEvent.startDate).toLocaleTimeString(
                          "en-US",
                          {
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                          }
                        )}{" "}
                        -{" "}
                        {new Date(featuredEvent.endDate).toLocaleTimeString(
                          "en-US",
                          {
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                          }
                        )}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    {/* Location Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="20px"
                      viewBox="0 -960 960 960"
                      width="20px"
                      fill="currentColor"
                    >
                      <path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 115-79.5 232.5T480-80Zm0-480Z" />
                    </svg>
                    <span>
                      {featuredEvent.venue ||
                        "New Arts Theater, University of Colombo"}
                    </span>
                  </div>
                </motion.div>

                {(featuredEvent.bannerText || featuredEvent.shortSummary) && (
                  <motion.p
                    variants={contentItem}
                    className="text-white/80 max-w-3xl mb-4 md:mb-6 line-clamp-3 text-sm md:text-base"
                  >
                    {featuredEvent.bannerText || featuredEvent.shortSummary}
                  </motion.p>
                )}

                <motion.div variants={contentItem}>
                  <Link
                    href={`/events/${featuredEvent.slug.current}`}
                    className="text-blue-400 hover:text-blue-300 flex items-center gap-2 justify-end transition-colors text-sm md:text-base"
                  >
                    See More
                    {/* Arrow Forward Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="20px"
                      viewBox="0 -960 960 960"
                      width="20px"
                      fill="currentColor"
                    >
                      <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
                    </svg>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </Container>
      </section>

      {/* Upcoming Events Section */}
      <section className="pb-12 md:pb-20">
        <Container>
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-xl md:text-3xl mb-6 md:mb-10 font-normal"
          >
            Upcoming Events
          </motion.h2>

          {nonFeaturedUpcoming.length > 0 ? (
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex flex-col md:flex-row gap-4 md:gap-6 md:overflow-x-auto md:scrollbar-hide pb-4"
            >
              {nonFeaturedUpcoming.map((event, index) => {
                const eventDate = new Date(event.startDate);
                const day = eventDate.getDate().toString().padStart(2, "0");
                const month = eventDate
                  .toLocaleDateString("en-US", { month: "short" })
                  .toUpperCase();
                const isFirst = index === 0;

                // Date display logic
                let dateDisplay = day;
                let monthDisplay = month;

                if (event.endDate) {
                  const endEventDate = new Date(event.endDate);
                  const endDay = endEventDate
                    .getDate()
                    .toString()
                    .padStart(2, "0");
                  const endMonth = endEventDate
                    .toLocaleDateString("en-US", { month: "short" })
                    .toUpperCase();

                  // Check if same month
                  if (month === endMonth) {
                    dateDisplay = `${day}-${endDay}`;
                    monthDisplay = month;
                  } else {
                    dateDisplay = `${day} ${month.slice(0, 3)} - ${endDay} ${endMonth.slice(0, 3)}`;
                    monthDisplay = "";
                  }
                }

                // Calculate time display
                let timeDisplay = "TBA";
                if (event.endDate) {
                  const startTime = new Date(
                    event.startDate
                  ).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  });
                  const endTime = new Date(event.endDate).toLocaleTimeString(
                    "en-US",
                    {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    }
                  );
                  timeDisplay = `${startTime} - ${endTime}`;
                }

                return (
                  <motion.div
                    key={event._id}
                    variants={item}
                    className="shrink-0 w-full md:w-[calc(25%*0.75-18px)]"
                  >
                    <Link
                      href={`/events/${event.slug.current}`}
                      className="group block h-full"
                    >
                      <motion.div
                        whileHover={{ y: -5 }}
                        className={`${
                          isFirst
                            ? "bg-linear-to-b from-[#1a4d8f] via-[#0d2847] to-[#030712]"
                            : "bg-gray-900/50 border border-gray-800"
                        } p-4 md:p-6 hover:border-blue-500/50 transition-all h-full rounded-lg`}
                      >
                        {/* Date Badge */}
                        <div className="flex items-start justify-between mb-4 md:mb-8">
                          <div>
                            <div
                              className={`text-2xl md:text-3xl font-normal ${isFirst ? "text-white" : "text-white"}`}
                            >
                              {dateDisplay}
                            </div>
                            {monthDisplay && (
                              <div
                                className={`text-xs md:text-sm font-normal ${isFirst ? "text-white/80" : "text-gray-500"}`}
                              >
                                {monthDisplay}
                              </div>
                            )}
                          </div>
                          <span
                            className={`${isFirst ? "text-white/80" : "text-gray-500"} group-hover:text-white transition-colors text-lg md:text-xl`}
                          >
                            {/* Arrow Forward Icon */}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="24px"
                              viewBox="0 -960 960 960"
                              width="24px"
                              fill="currentColor"
                            >
                              <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
                            </svg>
                          </span>
                        </div>

                        {/* Event Info */}
                        <h3
                          className={`text-base md:text-xl font-normal mb-2 md:mb-3 ${
                            isFirst ? "text-white" : "text-white"
                          } group-hover:text-blue-400 transition-colors`}
                        >
                          {event.title}
                        </h3>

                        <div className="space-y-1.5 md:space-y-2 text-xs md:text-sm font-normal">
                          <div
                            className={`flex items-center gap-2 ${isFirst ? "text-white/80" : "text-blue-400"}`}
                          >
                            {/* Clock Icon */}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="16px"
                              viewBox="0 -960 960 960"
                              width="16px"
                              fill="currentColor"
                            >
                              <path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z" />
                            </svg>
                            <span>{timeDisplay}</span>
                          </div>
                          <div
                            className={`flex items-center gap-2 ${isFirst ? "text-white/80" : "text-blue-400"}`}
                          >
                            {/* Location Icon */}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="16px"
                              viewBox="0 -960 960 960"
                              width="16px"
                              fill="currentColor"
                            >
                              <path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 115-79.5 232.5T480-80Zm0-480Z" />
                            </svg>
                            <span>{event.venue || "New Arts Theater"}</span>
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <div className="text-gray-500">No upcoming events found.</div>
          )}
        </Container>
      </section>

      {/* Past Events Section */}
      <section className="pb-12 md:pb-20">
        <Container>
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-xl md:text-3xl font-normal mb-6 md:mb-10"
          >
            Past Events
          </motion.h2>

          {pastEvents.length > 0 ? (
            <EventsPagination events={pastEvents} />
          ) : (
            <div className="text-gray-500">No past events found.</div>
          )}
        </Container>
      </section>
    </main>
  );
};
