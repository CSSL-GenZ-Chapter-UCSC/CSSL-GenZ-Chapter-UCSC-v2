"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

export type MemberCardProps = {
  name: string;
  role: string;
  href: string;
  bgSrc?: string;
  fgSrc?: string;
  bgClassName?: string;
  fgClassName?: string;
  cardClassName?: string;
};

export const MemberCardItem = ({ member }: { member: MemberCardProps }) => {
  const [delay, setDelay] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setDelay(Math.random() * 0.5), 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="w-full h-full"
      initial={{ y: 50, opacity: 0, filter: "blur(8px)" }}
      whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      viewport={{ amount: 0.01 }}
    >
      <Link
        href={member.href}
        className={`flex h-full w-full flex-col items-start ${member.cardClassName || ""}`}
      >
        <div className="relative w-full h-[80%] bg-[#163168] shrink-0 self-stretch overflow-hidden">
          <div className="absolute bottom-0 right-0 p-4 z-10 hidden md:block">
            <svg className="w-7 h-7" fill="#318AFF" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </div>
          <div className="absolute bottom-0 right-0 p-3 z-10 block md:hidden">
            <svg className="w-5 h-5" fill="#318AFF" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </div>
          {member.bgSrc ? (
            <Image
              src={member.bgSrc}
              alt={`${member.name} background`}
              fill
              className={`object-cover absolute inset-0 ${member.bgClassName || ""}`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          ) : null}
          {member.fgSrc ? (
            <Image
              src={member.fgSrc}
              alt={member.name}
              fill
              className={`object-cover absolute inset-0 ${member.fgClassName || ""}`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          ) : null}
        </div>
        <div className="flex py-[9px] flex-col items-start flex-[1_0_0]">
          <h2 className="text-white font-poppins text-sm md:text-[17px] font-normal tracking-[1px] md:tracking-[1.87px] leading-tight">
            {member.name}
          </h2>
          <p className="text-(--secondaryText,#E0E0E0) font-poppins text-[10px] md:text-[12px] font-light tracking-[0.5px] md:tracking-[0.72px] leading-tight">
            {member.role}
          </p>
        </div>
      </Link>
    </motion.div>
  );
};