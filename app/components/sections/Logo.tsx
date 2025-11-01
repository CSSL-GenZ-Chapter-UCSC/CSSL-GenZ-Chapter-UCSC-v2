"use client";

import { useEffect, useRef, useState } from "react";

export const Logo = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isClient = typeof window !== "undefined";
  const initialReduced =
    isClient && window.matchMedia
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;
  const [progress, setProgress] = useState(initialReduced ? 0.5 : 0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) return;

    const onScroll = () => {
      const viewportH = window.innerHeight || 1;
      const totalScrollable = section.offsetHeight - viewportH;
      const scrolled = Math.min(
        Math.max(window.scrollY - (section.offsetTop || 0), 0),
        Math.max(totalScrollable, 1)
      );
      const p = totalScrollable > 0 ? scrolled / totalScrollable : 0;
      const clamped = Math.min(Math.max(p, 0), 1);
      setProgress(clamped);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const gradient =
    "linear-gradient(90deg, #1E448F 0%, #1E448F 35%, #4C9DFE 50%, #1E448F 65%, #1E448F 100%)";

  const backgroundPosition = `${progress * 100}% 50%`;

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-black">
      <div className="relative h-[200vh] w-full">
        {/* Sticky pin at vertical center for entire 200vh duration */}
        <div className="sticky top-[50vh] h-0 z-10 pointer-events-none">
          <div className="relative -translate-y-1/2 flex items-center justify-center pointer-events-auto">
            <h2
              className="text-center font-[Poppins] text-[750px] font-semibold leading-[700px] opacity-15 bg-clip-text text-transparent select-none"
              style={{
                backgroundImage: gradient,
                backgroundSize: "200% 100%",
                backgroundPosition,
                WebkitBackgroundClip: "text",
                willChange: "background-position",
              }}
            >
              CSSL
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};
