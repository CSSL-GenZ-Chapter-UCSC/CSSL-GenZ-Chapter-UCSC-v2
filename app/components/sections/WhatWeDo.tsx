"use client";

import { Container } from "../shared/Container";
import { motion } from "motion/react";

export const WhatWeDo = () => {
  return (
    <section className="h-[70vh] flex items-start justify-center bg-black text-white sm:pt-30 pt-20">
      <Container className="h-full pb-20">
        <div className="w-full h-full flex flex-col sm:items-stretch ">
          <motion.h2
            initial={{ opacity: 0, filter: "blur(8px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex items-center justify-start bg-[linear-gradient(87deg,rgba(0,0,0,0)_-1.81%,#0F52B4_15.92%,rgba(17,105,234,0.58)_35.57%,rgba(68,140,246,0.82)_52.17%,rgba(49,138,255,0.82)_77.28%,rgba(25,69,128,0.41)_97.86%,rgba(0,0,0,0)_97.87%)] bg-clip-text text-transparent font-[Poppins] lg:text-[170px] md:text-[100px] sm:text-[80px] text-[40px] not-italic font-semibold leading-none tracking-[12.65px] flex-1"
          >
            WHAT WE DO
          </motion.h2>
          <div className="flex px-2.5 justify-between items-start self-stretch flex-1">
            <motion.p
              initial={{ opacity: 0, filter: "blur(8px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.3, ease: "easeOut", delay: 0.15 }}
              className="text-[#afafaf] font-[Poppins] sm:text-[16px] text-[12px] not-italic font-medium sm:leading-[23px] leading-4 sm:w-[274px] w-[200px]"
            >
              The CSSL GenZ Chapter thrives through collaboration
            </motion.p>
            <motion.p
              initial={{ opacity: 0, filter: "blur(8px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.3, ease: "easeOut", delay: 0.25 }}
              className="text-[#afafaf] font-[Poppins] sm:text-[16px] text-[12px] not-italic font-medium sm:leading-[23px] leading-4 sm:w-[274px] w-[200px]"
            >
              A collective of students who bring ideas to life across event
              planning, design, media, and innovation
            </motion.p>
            <motion.p
              initial={{ opacity: 0, filter: "blur(8px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.3, ease: "easeOut", delay: 0.35 }}
              className="text-[#afafaf] font-[Poppins] text-[16px] not-italic font-medium leading-[23px] sm:w-[274px] w-[200px] sm:block hidden"
            >
              We strive to empower undergraduates through technology,
              innovation, and collaboration bridging the gap between academia
              and the ICT industry to shape future-ready professionals.
            </motion.p>
          </div>
        </div>
      </Container>
    </section>
  );
};
