"use client";

import { Container } from "../shared/Container";
import { motion } from "motion/react";
import Link from "next/link";

export const Contact = () => {
  return (
    <section className="h-screen flex items-start justify-center bg-black text-white sm:pt-30 pt-20">
      <Container className="h-full pb-20">
        <div className="w-full h-full flex flex-col sm:items-stretch">
          <motion.h2
            initial={{ opacity: 0, filter: "blur(8px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex items-center justify-start bg-[linear-gradient(87deg,rgba(0,0,0,0)_-1.81%,#0F52B4_15.92%,rgba(17,105,234,0.58)_35.57%,rgba(68,140,246,0.82)_52.17%,rgba(49,138,255,0.82)_77.28%,rgba(25,69,128,0.41)_97.86%,rgba(0,0,0,0)_97.87%)]
            bg-clip-text text-transparent font-[Poppins] lg:text-[170px] md:text-[100px] sm:text-[80px] text-[40px] not-italic font-semibold leading-none tracking-[12.65px] flex-1"
          >
            CONTACT US
          </motion.h2>
          <div className="flex px-2.5 justify-between items-start self-stretch flex-1">
            <motion.p
              initial={{ opacity: 0, filter: "blur(8px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.3, ease: "easeOut", delay: 0.15 }}
              className="text-[#afafaf] pt-5 font-[Poppins] sm:text-[16px] text-[12px] not-italic font-medium sm:leading-[23px] leading-4 sm:w-[474px] w-[200px]"
            >
              Let us know how we can help you
            </motion.p>
          </div>
          <div className="w-full h-full flex flex-row gap-[29px]">
            <ContactCard />
          </div>
        </div>
      </Container>
    </section>
  );
};

interface ContactCardProps {
  svg: string;
  title: string;
  description: string;
  link: string;
  linkText: string;
}

const ContactCard = ({
  svg,
  title,
  description,
  link,
  linkText,
}: ContactCardProps) => {
  return (
    <div className="w-1/4 h-full bg-emerald-900">
      <div className="w-full h-1/2 flex flex-col justify-start items-start"></div>
      <div className="w-full h-1/2 flex flex-col items-start justify-start">
        <h2 className="text-white font-poppins text-[16px] font-normal leading-normal">
          {title}
        </h2>
        <p className="text-white font-poppins text-[16px] font-[250] leading-normal">
          {description}
        </p>
        <Link href={link}>{linkText}</Link>
      </div>
    </div>
  );
};
