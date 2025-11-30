"use client";

import { Container } from "../shared/Container";
import { motion } from "motion/react";
import { PageTitle } from "../shared/PageTitle";

export const WhatWeDo = () => {
  return (
    <section className="md:h-[70vh] h-[50vh] flex items-start justify-center bg-black text-white sm:pt-30 pt-20">
      <Container className="h-full pb-20">
        <div className="w-full h-full flex flex-col sm:items-stretch ">
          <PageTitle
            text="WHAT WE DO"
            className="lg:text-[170px] md:text-[100px] sm:text-[80px] text-[60px]"
          />
          <div className="flex px-2.5 justify-between items-start self-stretch flex-1">
            <motion.p
              initial={{ opacity: 0, filter: "blur(8px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.3, ease: "easeOut", delay: 0.15 }}
              className="text-[#afafaf] font-[Poppins] sm:text-[16px] text-[12px] not-italic font-medium sm:leading-[23px] leading-4 sm:w-[474px] w-[200px] sm:pt-auto pt-10"
            >
              The CSSL GenZ Chapter thrives through collaboration
            </motion.p>
          </div>
        </div>
      </Container>
    </section>
  );
};
