"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "../shared/Container";

const LinkedInIcon = ({ active }: { active: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill={active ? "#0077B5" : "#414141"}
    className={`transition-colors sm:w-auto w-2/3 duration-300 ${active ? "" : "text-blue-500"}`}
  >
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const FacebookIcon = ({ active }: { active: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill={active ? "#1877F2" : "#414141"}
    className={`transition-colors sm:w-auto w-2/3 duration-300 ${active ? "" : "text-blue-500"}`}
  >
    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
  </svg>
);

const InstagramIcon = ({ active }: { active: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill={active ? "#E4405F" : "#414141"}
    className={`transition-colors sm:w-auto w-2/3 duration-300 ${active ? "" : "text-blue-500"}`}
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const socialMediaData = [
  {
    name: "LinkedIn",
    icon: LinkedInIcon,
    image: "/Images/Contact/linked.png",
    link: "https://www.linkedin.com/company/cssl-ucsc/posts/?feedView=all",
  },
  {
    name: "Facebook",
    icon: FacebookIcon,
    image: "/Images/Contact/fb.png",
    link: "https://www.facebook.com/cssl.ucsc?rdid=t80Rnh82fYKJpoJY&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1F5rcLY4fd%2F#",
  },
  {
    name: "Instagram",
    icon: InstagramIcon,
    image: "/Images/Contact/insta.png",
    link: "https://www.instagram.com/cssl_ucsc/#",
  },
];

export const SocialMediaSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % socialMediaData.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-black text-white py-20 overflow-hidden">
      <Container>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          {/* Left Side */}
          <div className="flex-[40%] flex flex-col items-start space-y-6 z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-[#E0E0E0] font-[Poppins] md:text-[45px] text-[25px] not-italic font-normal md:leading-[54px] leading-[35px] tracking-[-0.52px] md:w-2/3 w-full"
            >
              Follow us for the latest updates
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-400 text-lg max-w-md font-poppins"
            >
              Stay tuned for upcoming workshops, tech news, and exclusive
              events.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex sm:gap-6 gap-2 mt-4"
            >
              {socialMediaData.map((social, idx) => (
                <Link
                  key={idx}
                  href={social.link}
                  onClick={() => setCurrentIndex(idx)}
                  className="hover:scale-110 transition-transform duration-200"
                  aria-label={social.name}
                  target="_blank"
                >
                  <social.icon active={currentIndex === idx} />
                </Link>
              ))}
            </motion.div>
          </div>

          {/* Right Side */}
          <div className="flex-[60%] h-auto relative flex justify-center">
            <div className="w-full relative overflow-hidden">
              <Image
                alt="mockup"
                src={"/Images/Contact/mockup2.png"}
                width={1500}
                height={1000}
                className="w-full h-auto object-cover z-30"
              ></Image>
              <div className="absolute bg-black w-[7.3%] h-[3.3%] top-[14.9%] rounded-full left-[49.7%] -translate-x-1/2 z-9999"></div>
              {socialMediaData.map((social, index) => {
                const isActive = index === currentIndex;
                const isNext =
                  index === (currentIndex + 1) % socialMediaData.length;
                const isPrev =
                  index ===
                  (currentIndex - 1 + socialMediaData.length) %
                    socialMediaData.length;

                let variant = "hidden";
                if (isActive) variant = "center";
                else if (isNext) variant = "right";
                else if (isPrev) variant = "left";

                return (
                  <motion.div
                    key={social.name}
                    initial={false}
                    animate={variant}
                    variants={{
                      center: {
                        left: "49.8%",
                        scale: 1,
                        filter: "blur(0px)",
                        zIndex: 50,
                      },
                      right: {
                        left: "79.8%",
                        scale: 0.7,
                        filter: "blur(8px)",
                        zIndex: 40,
                      },
                      left: {
                        left: "19.8%",
                        scale: 0.7,
                        filter: "blur(8px)",
                        zIndex: 40,
                      },
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="absolute top-[14%] -translate-x-1/2 w-[22%] h-auto overflow-hidden"
                  >
                    <Link
                      href={social.link}
                      className={`block w-full h-full ${
                        isActive ? "cursor-pointer" : "pointer-events-none"
                      }`}
                      target="_blank"
                    >
                      <Image
                        alt={social.name}
                        src={social.image}
                        className="object-cover object-top"
                        width={328}
                        height={716}
                      />
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
