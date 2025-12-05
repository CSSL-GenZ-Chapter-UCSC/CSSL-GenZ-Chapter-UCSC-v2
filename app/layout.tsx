"use client";

import "./globals.css";
import { ReactLenis } from "lenis/react";
import type { LenisRef } from "lenis/react";
import { frame, cancelFrame } from "framer-motion";
import { useRef, useEffect } from "react";
import { Poppins, La_Belle_Aurore } from "next/font/google";
import { Navbar } from "./components/elements/NavBar";
import { Footer } from "./components/elements/Footer";
import "./globals.css";

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

  useEffect(() => {
    function update({ timestamp }: { timestamp: number }) {
      lenisRef.current?.lenis?.raf(timestamp);
    }

    frame.update(update, true);
    return () => cancelFrame(update);
  }, []);

  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${laBelleAurore.variable} ${poppins.className} antialiased relative`}
      >
        <div className="fixed top-0 left-0 w-full h-full -z-50 bg-[linear-gradient(75deg,#000_-4.05%,#0F2248_74.48%,var(--darkBlue,#1E448F)_107.82%)]"></div>
        <ReactLenis
          root
          ref={lenisRef}
          options={{ autoRaf: false }}
        ></ReactLenis>
        <Navbar />
        <div className="relative z-10 bg-black">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
