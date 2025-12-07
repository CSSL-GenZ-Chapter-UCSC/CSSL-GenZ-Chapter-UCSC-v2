"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export interface Announcement {
  id: string;
  label: string;
  title: string;
  message: string;
}

interface AnnouncementBarProps {
  announcements: Announcement[];
}

export const AnnouncementBar = ({ announcements }: AnnouncementBarProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (announcements.length < 2) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [announcements.length]);

  if (announcements.length === 0) return null;

  return (
    <div className="w-full bg-[linear-gradient(90deg,#3A7CFF80_0%,#11020200_100%)] border-t border-white/5 py-3 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative h-14 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute w-full flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 text-center"
          >
            <div className="flex items-center gap-3">
              <span className="text-blue-400 font-semibold tracking-wider whitespace-nowrap">
                [ {announcements[currentIndex].label} ]
              </span>
              <span className="text-slate-200 font-medium text-lg whitespace-nowrap">
                {announcements[currentIndex].title}
              </span>
            </div>
            <span className="text-slate-400 text-sm md:text-base truncate max-w-md md:max-w-xl">
              {announcements[currentIndex].message}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
