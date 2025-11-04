import { Container } from "../shared/Container";

export const EventsSection = () => {
  return (
    <Container className="relative z-10 py-32 lg:py-40">
        <div className="bg-blue-700 min-h-[920px] flex">
            {/* timeline and eventNames*/}
            {/* loop should come and 1 following struction for 1 event*/}
            <div className="bg-green-400 flex items-center justify-between h-[705px] w-[53%]"> 
                <div className="bg-amber-300 text-white block w-[18%] h-[215px]">Date 2</div>
                <div className="bg-red-500 min-h-[215px] w-[80%] h-[215px]"></div>
            </div>

            {/* eventPhotos */}
            <div className="grid grid-rows-4 grid-cols-2 gap-1 min-h-[920px] w-[47%] bg-black/70">
                <div className="bg-white/30 col-span-2"></div>
                <div className="bg-white/30 col-span-2 row-span-2"></div>
                <div className="bg-white/30"></div>
                <div className="bg-white/30"></div>
            </div>
        </div>
    </Container>
    );
};