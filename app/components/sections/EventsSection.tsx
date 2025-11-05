"use client";

import { Container } from "../shared/Container";
import { useEffect, useRef } from "react";

export default function EventsSection () {
    // scrolling control - enabling scrolling not only on left 
    // but also on right side
    
    // Create refs to track DOM elements
    const blueContainerRef = useRef<HTMLDivElement>(null);
    const scrollableContentRef = useRef<HTMLDivElement>(null);

     useEffect(() => {
    // handler reads refs.current every time it's invoked so TypeScript
    // can't complain about a captured possibly-null value
    function handleWheel(e: WheelEvent) {
      const scrollable = scrollableContentRef.current;
      if (!scrollable) return; // guard

      // Prevent default page scroll while we handle the scroll
      e.preventDefault();

      const currentScroll = scrollable.scrollTop;
      const maxScroll = scrollable.scrollHeight - scrollable.clientHeight;
      const newScroll = currentScroll + e.deltaY;

      if (newScroll >= 0 && newScroll <= maxScroll) {
        scrollable.scrollTop = newScroll;
      } else if (newScroll < 0) {
        scrollable.scrollTop = 0;
      } else {
        scrollable.scrollTop = maxScroll;
      }
    }

    const container = blueContainerRef.current;
    if (!container) return; // nothing to attach to

    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, []); // no captured refs in the closure that TS will flag

  return (
    <Container className="relative z-10 py-32 lg:py-40">
        <div className="bg-blue-700 min-h-[920px] flex" ref={blueContainerRef}>
            {/* timeline and eventNames*/}
            {/* container for event names */}
            <div className="w-[53%] flex flex-col h-[920px] overflow-y-auto scrollbar-hide" ref={scrollableContentRef}>
                {/* loop should come and 1 following struction for 1 event*/}
                <div className="bg-green-400 flex items-center justify-between h-[705px] shrink-0"> 
                    <div className="bg-amber-300 text-white block w-[18%] h-[215px]">Date 2</div>
                    <div className="bg-red-500 min-h-[215px] w-[80%] h-[215px]"></div>
                </div>
                <div className="bg-amber-700 flex items-center justify-between h-[705px] shrink-0"> 
                    <div className="bg-amber-300 text-white block w-[18%] h-[215px]">Date 2</div>
                    <div className="bg-red-500 min-h-[215px] w-[80%] h-[215px]"></div>
                </div>
                <div className="bg-yellow-500 flex items-center justify-between h-[705px] shrink-0"> 
                    <div className="bg-amber-300 text-white block w-[18%] h-[215px]">Date 2</div>
                    <div className="bg-red-500 min-h-[215px] w-[80%] h-[215px]"></div>
                </div>
            </div>

            {/* eventPhotos */}
            <div className="grid grid-rows-4 grid-cols-2 gap-1 h-[920px] w-[47%] bg-black/70">
                <div className="bg-white/30 col-span-2"></div>
                <div className="bg-white/30 col-span-2 row-span-2"></div>
                <div className="bg-white/30"></div>
                <div className="bg-white/30"></div>
            </div>
        </div>
    </Container>
    );
};