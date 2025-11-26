"use client";

import { useState,useEffect } from "react";
import { motion } from "motion/react";
import { h1 } from "motion/react-client";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../shared/Button";
import { PageTitle } from "../shared/PageTitle";
import { Container } from "../shared/Container";
import { DynamicButtons } from "./DynamicButtons";







export const DisplayBlog = () => {

  return (
    <section className="h-screen flex items-start justify-center bg-black text-white sm:pt-30 pt-20">
      <Container className="h-full pb-20">
        <div className="-mb-30 w-full h-full flex flex-col sm:items-stretch ">
          <PageTitle
              text="BLOGS"
              className="lg:text-[213px] md:text-[125px] sm:text-[100px] text-[60px]"
          />
          <div className="flex px-2.5 justify-between items-start self-stretch flex-1">
            <motion.p
              initial={{ opacity: 0, filter: "blur(8px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.3, ease: "easeOut", delay: 0.15 }}
              className="text-[#afafaf] font-[Poppins] sm:text-[16px] text-[12px] not-italic font-medium sm:leading-[23px] leading-4 sm:w-[474px] w-[200px]"
            >
              Exploring trends, ideas, and success stories that shape the future of community and connection.
            </motion.p>
          </div>     
        </div>

        <DynamicButtons/>

        <div>
          
        </div>
      </Container>
    </section>
  );
}