"use client";

import { motion } from "motion/react";
import Image from "next/image";

interface TeamGroupPhotoProps {
  src?: string;
  alt: string;
  className?: string;
}

export const TeamGroupPhoto = ({
  src,
  alt,
  className,
}: TeamGroupPhotoProps) => {
  if (!src) {
    return (
      <div className="w-full h-full bg-gray-600 ml-auto relative overflow-hidden" />
    );
  }

  return (
    <div className="w-full h-full ml-auto relative overflow-hidden">
      <motion.div
        className={`w-full h-full relative ${className || ""}`}
        initial={{ scale: 0.9 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ amount: 0.1 }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover absolute inset-0"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
        />
      </motion.div>
    </div>
  );
};
