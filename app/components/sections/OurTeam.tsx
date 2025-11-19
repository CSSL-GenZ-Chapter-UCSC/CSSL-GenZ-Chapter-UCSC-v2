"use client";

import { Container } from "../shared/Container";
import { motion } from "motion/react";
import { PageTitle } from "../shared/PageTitle";

export const OurTeam = () => {
  return (
    <section className="h-screen flex items-start justify-center bg-black text-white sm:pt-30 pt-20">
      <Container className="h-full pb-20">
        <div className="w-full h-full flex flex-col sm:items-stretch ">
          <PageTitle
            text="OUR TEAM"
            className="lg:text-[213px] md:text-[125px] sm:text-[100px] text-[60px]"
          />
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
          <div className="flex flex-row justify-center items-end w-full h-full gap-40">
            <motion.div
              className="flex h-2/5 pb-5 items-start gap-2.5 flex-[1_0_0] [background:var(--bgGradient,linear-gradient(75deg,#000_-4.05%,#0F2248_74.48%,var(--darkBlue,#1E448F)_107.82%))]"
              initial={{ opacity: 0, filter: "blur(8px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.3, ease: "easeOut", delay: 0.45 }}
            >
              <div className="p-5 bg-black/50 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
                <p className="text-gray-300 font-poppins text-[31px] font-semibold leading-[38px] tracking-[8px] capitalize">
                  50+ ACTIVE<br></br>MEMBERS
                </p>
              </div>
            </motion.div>
            <motion.div
              className="flex h-2/5 pb-5 items-start gap-2.5 flex-[1_0_0] [background:var(--bgGradient,linear-gradient(75deg,#000_-4.05%,#0F2248_74.48%,var(--darkBlue,#1E448F)_107.82%))]"
              initial={{ opacity: 0, filter: "blur(8px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.3, ease: "easeOut", delay: 0.55 }}
            >
              <div className="p-5 bg-black/50 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
                <p className="text-gray-300 font-poppins text-[31px] font-semibold leading-[38px] tracking-[8px] capitalize">
                  7 WORKING<br></br>TEAMS
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
};
