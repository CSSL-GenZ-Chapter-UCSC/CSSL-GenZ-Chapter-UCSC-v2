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
      <motion.div
        initial={{ scale: 0.9 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.05 }}
        className="w-full h-full bg-[#163168]  ml-auto relative overflow-hidden"
      />
    );
  }

  return (
    <div className="w-full h-full ml-auto relative overflow-hidden">
      <motion.div
        className={`w-full h-full relative bg-[#163168] ${className || ""}`}
        initial={{ scale: 0.9, filter: "blur(8px)" }}
        whileInView={{ scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.00001 }}
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
