"use client";

import { motion } from "motion/react";
import type { FC } from "react";

type PageTitleProps = {
  text: string;
  className?: string;
};

export const PageTitle: FC<PageTitleProps> = ({ text, className = "" }) => {
  const base =
    "flex items-center justify-start select-none bg-[linear-gradient(87deg,rgba(0,0,0,0)_-1.81%,#0F52B4_15.92%,rgba(17,105,234,0.58)_35.57%,rgba(68,140,246,0.82)_52.17%,rgba(49,138,255,0.82)_77.28%,rgba(25,69,128,0.41)_97.86%,rgba(0,0,0,0)_97.87%)] bg-clip-text text-transparent font-[Poppins] not-italic font-semibold leading-none tracking-[12.65px] flex-1";
  return (
    <motion.h2
      initial={{ opacity: 0, filter: "blur(8px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`${base} ${className}`.trim()}
    >
      {text}
    </motion.h2>
  );
};
