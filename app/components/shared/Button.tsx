"use client";

import { motion } from "motion/react";

interface ButtonProps {
  className?: string;
  isSvg?: boolean; // the SVG arrow icon
  text: string; // button text
  onClick?: () => void;
}

export const Button = ({ className, isSvg, text, onClick }: ButtonProps) => {
  return (
    <motion.button
      className={`relative overflow-hidden rounded-[33px] bg-[linear-gradient(90deg,var(--darkBlue,#1E448F)_0%,#4C9DFE_100%)] inline-flex h-[53px] px-[26px] py-2.5 justify-center items-center gap-[15px] cursor-pointer ${className ?? ""}`}
      style={{ backgroundSize: "140% 100%", backgroundPositionX: "0%" }}
      whileHover={{ backgroundPositionX: "50%" }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      onClick={onClick}
    >
      <span className="text-white text-center font-poppins text-[16px]  font-medium leading-20">
        {text}
      </span>
      {isSvg && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="17"
          viewBox="0 0 10 17"
          fill="none"
        >
          <path
            d="M1.66637 4.42738L2.55054 3.49988L7.36637 8.55476C7.444 8.63575 7.50561 8.73207 7.54765 8.83816C7.58969 8.94426 7.61133 9.05803 7.61133 9.17295C7.61133 9.28786 7.58969 9.40163 7.54765 9.50772C7.50561 9.61382 7.444 9.71014 7.36637 9.79113L2.55054 14.8486L1.6672 13.9211L6.1872 9.17426L1.66637 4.42738Z"
            fill="white"
          />
        </svg>
      )}
    </motion.button>
  );
};