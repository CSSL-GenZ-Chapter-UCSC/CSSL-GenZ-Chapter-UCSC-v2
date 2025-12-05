"use client";

import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useScroll,
  useAnimation,
  useMotionValueEvent,
} from "motion/react";
import { useRef, useEffect, useCallback } from "react";

const gradient = `linear-gradient(
  80deg,
  rgba(30,68,143,0) 30%,       /* transparent start */
  #1E448F 40%,                 /* base color begins */
  #4C9DFE 45%,                 /* highlight */
  #1E448F 50%,                 /* base again */
  rgba(30,68,143,0) 65%        /* fade out */
)`;

const socialLinks = [
  {
    href: "https://whatsapp.com/channel/0029Vb5rS68HLHQXvaWJM13c",
    ariaLabel: "WhatsApp",
    icon: (
      <svg
        className="w-6 h-6 text-gray-400 hover:text-white transition-colors"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
    ),
  },
  {
    href: "https://www.linkedin.com/company/cssl-genz-chapter-of-ucsc/",
    ariaLabel: "LinkedIn",
    icon: (
      <svg
        className="w-6 h-6 text-gray-400 hover:text-white transition-colors"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    href: "https://www.facebook.com/share/1F5rcLY4fd/",
    ariaLabel: "Facebook",
    icon: (
      <svg
        className="w-6 h-6 text-gray-400 hover:text-white transition-colors"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    href: "https://www.instagram.com/cssl_ucsc",
    ariaLabel: "Instagram",
    icon: (
      <svg
        className="w-6 h-6 text-gray-400 hover:text-white transition-colors"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
      </svg>
    ),
  },
];

export const Footer = () => {
  const containerRef = useRef(null);
  const controls = useAnimation();
  const { scrollY } = useScroll();

  const checkScroll = useCallback(
    (latest: number) => {
      if (typeof window === "undefined") return;
      const isBottom =
        latest + window.innerHeight >= document.body.scrollHeight - 500;
      if (isBottom) {
        controls.start({ y: 0 });
      } else {
        controls.start({ y: 100 });
      }
    },
    [controls]
  );

  useMotionValueEvent(scrollY, "change", (latest) => {
    checkScroll(latest);
  });

  // Initial check on mount and resize
  useEffect(() => {
    const handleResize = () => checkScroll(window.scrollY);
    window.addEventListener("resize", handleResize);
    checkScroll(window.scrollY);
    return () => window.removeEventListener("resize", handleResize);
  }, [checkScroll]);

  return (
    <footer ref={containerRef} className="sticky bottom-0">
      <div className="w-full h-[70vh] flex items-center justify-start bg-none relative flex-col overflow-hidden">
        <motion.div
          initial={{ y: 100 }}
          animate={controls}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full h-[85%] bg-black/40 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.4)] z-10 hidden md:block"
        >
          <FooterContent />
        </motion.div>
        <div className="w-full h-[85%] bg-black/40 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.4)] z-10 block md:hidden">
          <FooterContent />
        </div>
        <div className="w-[90%] absolute sm:-bottom-70 bottom-0 flex items-center justify-center">
          <h2
            className="text-center font-[Poppins] font-semibold leading-none bg-clip-text text-transparent select-none text-[50vw] sm:text-[40vw] md:text-[50vw]"
            style={{
              backgroundImage: gradient,
              backgroundSize: "300% 100%",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "40% 50%",
              WebkitBackgroundClip: "text",
            }}
          >
            CSSL
          </h2>
        </div>
      </div>
    </footer>
  );
};

const FooterContent = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-between p-8 sm:p-12 md:p-16 lg:p-20">
      <div className="w-full min-h-[50%] flex flex-col justify-start items-start">
        <Link href="/" className="flex items-center h-full w-full">
          <Image
            src="/CSSL Logo final - white.png"
            alt="CSSL Logo"
            width={200}
            height={10}
            className="object-contain w-32 sm:w-40 md:w-52 lg:w-[200px] h-auto"
          />
        </Link>
      </div>
      <div className="w-full flex flex-col gap-6 md:gap-0 md:flex-row justify-between">
        <p className="text-gray-300 text-xs sm:text-base md:text-lg">
          2025 CSSL GenZ Chapter of UCSC
        </p>
        <div className="h-auto flex flex-col md:flex-row gap-3 sm:gap-6 md:gap-10 lg:gap-20 md:max-w-[60%] items-start justify-center text-xs sm:text-base md:text-lg">
          <p>cssl@gmail.com</p>
          <p>033 0929021</p>
          <p className="md:max-w-[33%]">
            CSSL GenZ Chapter of UCSC, University of Colombo School of
            Computing, 35, Reid Avenue, Colombo 7.
          </p>
        </div>
        <div className="h-auto flex flex-row items-start justify-center gap-3 sm:gap-4 md:gap-5">
          {socialLinks.map(({ href, ariaLabel, icon }) => (
            <Link
              key={ariaLabel}
              href={href}
              aria-label={ariaLabel}
              className="cursor-pointer"
            >
              {icon}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
