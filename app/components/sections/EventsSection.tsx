import { Container } from "../shared/Container";

export const EventsSection = () => {
  return (
    <Container className="relative z-10 py-32 lg:py-40">
        <div className="bg-blue-700 min-h-[920px] flex">
            {/* timeline */}
            <div className="min-h-[920px] w-[10%] bg-black/30">

            </div>

            {/* eventNames */}
            <div className="min-h-[920px] w-[43%] bg-black/50">

            </div>

            {/* eventPhotos */}
            <div className="min-h-[920px] w-[47%] bg-black/70">

            </div>
        </div>
    </Container>
    );
};