//"use client";

import { Container } from "../shared/Container";
import { client } from "@/sanity/lib/client";

// current events structure from sanity
type Event = {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  startDate?: string;
};

// function to query events from sanity
async function getEvents(): Promise<Event[]> {
  const query = `*[_type=="event"]|order(startDate desc)[0...10]{_id,title,slug,excerpt,startDate}`;
  return client.fetch(query);
}

export default async function EventsSection () {
    {/* fetch events data */}
    const events = await getEvents();

  return (
    <Container className="relative z-10 py-32 lg:py-40">
        <div className="bg-blue-700 min-h-[920px] flex">
            {/* timeline and eventNames*/}
            {/* container for event names */}
            <div className="w-[53%] flex flex-col h-[920px] overflow-y-auto scrollbar-hide">
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