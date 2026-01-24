"use client";

import "./globals.css";
import { ReactLenis } from "lenis/react";
import type { LenisRef } from "lenis/react";
import { frame, cancelFrame } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/next";
import { usePathname } from "next/navigation";
import { Poppins, La_Belle_Aurore } from "next/font/google";
import { Navbar } from "./components/elements/NavBar";
import { Footer } from "./components/elements/Footer";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const laBelleAurore = La_Belle_Aurore({
  variable: "--font-la-belle-aurore",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lenisRef = useRef<LenisRef>(null);
  const [isIOS, setIsIOS] = useState(false);
  const pathname = usePathname();
  const isStudio = pathname?.startsWith("/studio");

  useEffect(() => {
    // Check for iOS to disable Lenis
    const isIOSDevice =
      /iPad|iPhone|iPod/.test(navigator.userAgent) &&
      !(window as unknown as { MSStream: unknown }).MSStream;

    if (isIOSDevice) {
      // Use setTimeout to avoid synchronous setState warning
      setTimeout(() => setIsIOS(true), 0);
      return;
    }

    function update({ timestamp }: { timestamp: number }) {
      lenisRef.current?.lenis?.raf(timestamp);
    }

    frame.update(update, true);
    return () => cancelFrame(update);
  }, []);

  return (
    <html lang="en" className={isIOS ? "scroll-smooth" : ""}>
      <body
        className={`${poppins.variable} ${laBelleAurore.variable} ${poppins.className} antialiased relative`}
      >
        <div className="fixed top-0 left-0 w-full h-full -z-50 bg-[linear-gradient(75deg,#000_-4.05%,#0F2248_74.48%,var(--darkBlue,#1E448F)_107.82%)]"></div>
        {!isIOS && (
          <ReactLenis
            root
            ref={lenisRef}
            options={{ autoRaf: false }}
          ></ReactLenis>
        )}
        {!isStudio && <Navbar />}
        <div className="relative z-10 bg-black">
          {children}
          <Analytics />
        </div>
        {!isStudio && <Footer />}
      </body>
    </html>
  );
}
