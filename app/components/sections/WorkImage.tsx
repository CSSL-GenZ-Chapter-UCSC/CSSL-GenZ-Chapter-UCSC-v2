"use client";

import { motion, HTMLMotionProps } from "motion/react";
import Image from "next/image";
import { useState } from "react";

interface WorkImageProps extends HTMLMotionProps<"div"> {
  src: string;
  alt: string;
  isGrayscale?: boolean;
  hasBlueFilter?: boolean;
  sizes?: string;
  priority?: boolean;
  brightness?: string; // e.g. "brightness-80"
  imageClassName?: string;
}

export const WorkImage = ({
  src,
  alt,
  isGrayscale = false,
  hasBlueFilter = false,
  sizes,
  priority = false,
  brightness = "brightness-80",
  imageClassName = "",
  className,
  ...props
}: WorkImageProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover transition-all duration-200 ${brightness} ${
          isGrayscale ? (isHovered ? "grayscale-0" : "grayscale") : ""
        } ${imageClassName}`}
        sizes={sizes}
        priority={priority}
      />
      {hasBlueFilter && (
        <div
          className={`absolute w-full h-full bg-[#133769] mix-blend-color z-10 ${
            isHovered ? "opacity-0" : "opacity-100"
          } transition-opacity duration-200`}
        ></div>
      )}
    </motion.div>
  );
};
