import { Container } from "../shared/Container";

export const EventsSection = () => {
  return (
    <Container className="relative z-10 py-32 lg:py-40">
        <div className="bg-blue-700 min-h-[920px] flex">
            {/* timeline */}
            <div className="flex flex-col justify-between items-center min-h-[920px] w-[10%] bg-black/30">
                <span className="text-white block">Date 1</span>
                <span className="text-white block">Date 2</span>
                <span className="text-white block">Date 3</span>
            </div>

            {/* eventNames */}
            <div className="flex flex-col justify-between min-h-[920px] w-[43%] bg-black/50 overflow-hidden">
                <div className="bg-white/30 min-h-[215px] -translate-y-1/2"></div>
                <div className="bg-white/30 min-h-[215px] mx-2"></div>
                <div className="bg-white/30 min-h-[215px] translate-y-1/2"></div>
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