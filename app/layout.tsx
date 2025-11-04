"use client";

import "./globals.css";
import { ReactLenis } from "lenis/react";
import type { LenisRef } from "lenis/react";
import { frame, cancelFrame } from "framer-motion";
import { useRef, useEffect } from "react";
import { Poppins, La_Belle_Aurore } from "next/font/google";
import { Navbar } from "./components/elements/NavBar";
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
        className={`${poppins.variable} ${laBelleAurore.variable} ${poppins.className} antialiased bg-black`}
      >
        <ReactLenis
          root
          ref={lenisRef}
          options={{ autoRaf: false }}
        ></ReactLenis>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
