import { getEventBySlug, getSimilarEvents } from "@/sanity/lib/api";
import { Container } from "@/app/components/shared/Container";
import Link from "next/link";
import { notFound } from "next/navigation";
import SimilarEventsCarousel from "@/app/components/events/SimilarEventsCarousel";
import PhotoGalleryWithLightbox from "@/app/components/events/PhotoGalleryWithLightbox";

// Force dynamic rendering for development
export const dynamic = "force-dynamic";
export const revalidate = 0;

interface EventDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// export async function generateStaticParams() {
//   const slugs = await getAllEventSlugs();
//   return slugs.filter((item) => item.slug).map((item) => ({ slug: item.slug }));
// }

export default async function EventDetailPage({
  params,
}: EventDetailPageProps) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  // Fetch similar events
  const similarEvents = await getSimilarEvents(event._id);

  // Format date display
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (date: string) => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const dateDisplay = event.endDate
    ? `${formatDate(event.startDate)} - ${formatDate(event.endDate)}`
    : formatDate(event.startDate);
  const timeDisplay = event.endDate
    ? `${formatTime(event.startDate)} - ${formatTime(event.endDate)}`
    : "Time will be announced";
  const venueDisplay = event.venue || "Venue will be announced";

  const descriptionBlocks = (event.description || [])
    .filter((block) => block._type === "block")
    .map((block) => block.children?.map((child) => child.text).join("") || "")
    .filter((text: string) => text && text.trim().length > 0);

  // Collect photos from the dedicated photos array only (max 10)
  const gallerySources = (event.photos || [])
    .filter((img): img is NonNullable<typeof img> => Boolean(img?.url))
    .slice(0, 10);

  const photoCount = gallerySources.length;

  // Define grid layout and photo classes based on count
  const getGalleryLayout = (count: number) => {
    switch (count) {
      case 1:
        return {
          gridClass: "grid-cols-1",
          photoClasses: ["col-span-1 row-span-2 min-h-[400px]"],
          mobileGridClass: "grid-cols-1",
          mobilePhotoClasses: ["col-span-1 min-h-[250px]"],
        };
      case 2:
        return {
          gridClass: "grid-cols-2",
          photoClasses: [
            "col-span-1 row-span-2 min-h-[400px]",
            "col-span-1 row-span-2 min-h-[400px]",
          ],
          mobileGridClass: "grid-cols-2",
          mobilePhotoClasses: [
            "col-span-1 min-h-[180px]",
            "col-span-1 min-h-[180px]",
          ],
        };
      case 3:
        return {
          gridClass: "grid-cols-2",
          photoClasses: [
            "col-span-1 row-span-1 min-h-[300px]",
            "col-span-1 row-span-1 min-h-[300px]",
            "col-span-2 row-span-1 min-h-[300px]",
          ],
          mobileGridClass: "grid-cols-2",
          mobilePhotoClasses: [
            "col-span-1 min-h-[120px]",
            "col-span-1 min-h-[120px]",
            "col-span-2 min-h-[150px]",
          ],
        };
      case 4:
        return {
          gridClass: "grid-cols-2",
          photoClasses: [
            "col-span-1 row-span-1 min-h-[300px]",
            "col-span-1 row-span-1 min-h-[300px]",
            "col-span-1 row-span-1 min-h-[300px]",
            "col-span-1 row-span-1 min-h-[300px]",
          ],
          mobileGridClass: "grid-cols-2",
          mobilePhotoClasses: [
            "col-span-1 min-h-[120px]",
            "col-span-1 min-h-[120px]",
            "col-span-1 min-h-[120px]",
            "col-span-1 min-h-[120px]",
          ],
        };
      case 5:
        return {
          gridClass: "grid-cols-3",
          photoClasses: [
            "col-span-1 row-span-1 min-h-[300px]",
            "col-span-1 row-span-1 min-h-[300px]",
            "col-span-1 row-span-1 min-h-[300px]",
            "col-span-1 row-span-1 min-h-[300px]",
            "col-span-2 row-span-1 min-h-[300px]",
          ],
          mobileGridClass: "grid-cols-2",
          mobilePhotoClasses: [
            "col-span-1 min-h-[120px]",
            "col-span-1 min-h-[120px]",
            "col-span-2 min-h-[150px]",
            "col-span-1 min-h-[120px]",
            "col-span-1 min-h-[120px]",
          ],
        };
      case 6:
        return {
          gridClass: "grid-cols-3",
          photoClasses: [
            "col-span-1 row-span-1 min-h-[300px]",
            "col-span-1 row-span-1 min-h-[300px]",
            "col-span-1 row-span-1 min-h-[300px]",
            "col-span-1 row-span-1 min-h-[300px]",
            "col-span-1 row-span-1 min-h-[300px]",
            "col-span-1 row-span-1 min-h-[300px]",
          ],
          mobileGridClass: "grid-cols-3",
          mobilePhotoClasses: [
            "col-span-1 min-h-[100px]",
            "col-span-1 min-h-[100px]",
            "col-span-1 min-h-[100px]",
            "col-span-1 min-h-[100px]",
            "col-span-1 min-h-[100px]",
            "col-span-1 min-h-[100px]",
          ],
        };
      case 7:
        return {
          gridClass: "grid-cols-4",
          photoClasses: [
            "col-span-1 row-span-1 min-h-[300px]",
            "col-span-1 row-span-1 min-h-[300px]",
            "col-span-1 row-span-1 min-h-[300px]",
            "col-span-1 row-span-1 min-h-[300px]",
            "col-span-1 row-span-1 min-h-[300px]",
            "col-span-2 row-span-1 min-h-[300px]",
            "col-span-1 row-span-1 min-h-[300px]",
          ],
          mobileGridClass: "grid-cols-3",
          mobilePhotoClasses: [
            "col-span-2 min-h-[130px]",
            "col-span-1 min-h-[130px]",
            "col-span-1 min-h-[100px]",
            "col-span-1 min-h-[100px]",
            "col-span-1 min-h-[100px]",
            "col-span-2 min-h-[120px]",
            "col-span-1 min-h-[120px]",
          ],
        };
      case 8:
        return {
          gridClass: "grid-cols-4",
          photoClasses: [
            "col-span-1 row-span-1 min-h-[300px]",
            "col-span-1 row-span-1 min-h-[300px]",
            "col-span-1 row-span-1 min-h-[300px]",
            "col-span-1 row-span-1 min-h-[300px]",
            "col-span-1 row-span-1 min-h-[300px]",
            "col-span-1 row-span-1 min-h-[300px]",
            "col-span-1 row-span-1 min-h-[300px]",
            "col-span-1 row-span-1 min-h-[300px]",
          ],
          mobileGridClass: "grid-cols-3",
          mobilePhotoClasses: [
            "col-span-1 min-h-[100px]",
            "col-span-2 min-h-[100px]",
            "col-span-2 min-h-[120px]",
            "col-span-1 min-h-[120px]",
            "col-span-1 min-h-[100px]",
            "col-span-1 min-h-[100px]",
            "col-span-1 min-h-[100px]",
          ],
        };
      case 9:
        return {
          gridClass: "grid-cols-5",
          photoClasses: [
            "col-span-1 row-span-1 min-h-[300px]",
            "col-span-1 row-span-1 min-h-[300px]",
            "col-span-1 row-span-1 min-h-[300px]",
            "col-span-1 row-span-1 min-h-[300px]",
            "col-span-1 row-span-1 min-h-[300px]",
            "col-span-1 row-span-1 min-h-[300px]",
            "col-span-1 row-span-1 min-h-[300px]",
            "col-span-2 row-span-1 min-h-[300px]",
            "col-span-1 row-span-1 min-h-[300px]",
          ],
          mobileGridClass: "grid-cols-3",
          mobilePhotoClasses: [
            "col-span-2 min-h-[130px]",
            "col-span-1 min-h-[130px]",
            "col-span-1 min-h-[100px]",
            "col-span-1 min-h-[100px]",
            "col-span-1 min-h-[100px]",
            "col-span-1 min-h-[100px]",
            "col-span-2 min-h-[120px]",
            "col-span-2 min-h-[120px]",
            "col-span-1 min-h-[120px]",
          ],
        };
      case 10:
        return {
          gridClass: "grid-cols-5",
          photoClasses: [
            "col-span-1 row-span-1 min-h-[300px]",
            "col-span-1 row-span-1 min-h-[300px]",
            "col-span-1 row-span-1 min-h-[300px]",
            "col-span-1 row-span-1 min-h-[300px]",
            "col-span-1 row-span-1 min-h-[300px]",
            "col-span-1 row-span-1 min-h-[300px]",
            "col-span-1 row-span-1 min-h-[300px]",
            "col-span-1 row-span-1 min-h-[300px]",
            "col-span-1 row-span-1 min-h-[300px]",
            "col-span-1 row-span-1 min-h-[300px]",
          ],
          mobileGridClass: "grid-cols-3",
          mobilePhotoClasses: [
            "col-span-1 min-h-[100px]",
            "col-span-2 min-h-[100px]",
            "col-span-2 min-h-[120px]",
            "col-span-1 min-h-[120px]",
            "col-span-1 min-h-[100px]",
            "col-span-1 min-h-[100px]",
            "col-span-1 min-h-[100px]",
            "col-span-2 min-h-[120px]",
            "col-span-1 min-h-[120px]",
          ],
        };
      default:
        return {
          gridClass: "grid-cols-1",
          photoClasses: [],
          mobileGridClass: "grid-cols-1",
          mobilePhotoClasses: [],
        };
    }
  };

  const galleryLayout = getGalleryLayout(photoCount);

  return (
    <main className="min-h-screen bg-[#060606] text-white font-poppins overflow-x-hidden pt-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-8 md:py-12">
        <Container className="relative z-10">
          <div className="min-h-[10vh] flex items-center mb-8">
            <h1 className="text-[2rem] md:text-[4rem] font-bold font-poppins leading-tight bg-linear-to-r from-[#0F52B4] via-[#1169EA] to-[#318AFF] bg-clip-text text-transparent">
              {event.title}
            </h1>
          </div>

          {/* Event Info with Icons */}
          <div className="flex flex-col gap-3 mb-2">
            {/* Date and Time on same line for mobile, all on same line for desktop */}
            <div className="flex flex-wrap md:flex-nowrap items-center gap-4 md:gap-6">
              <div className="flex items-center gap-3 text-[0.75rem] md:text-[1.2rem]">
                <span className="text-xl md:text-2xl text-[#318AFF]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="currentColor"
                  >
                    <path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z" />
                  </svg>
                </span>
                <span className="text-[#318AFF]">{dateDisplay}</span>
              </div>

              <div className="flex items-center gap-3 text-[0.75rem] md:text-[1.2rem]">
                <span className="text-xl md:text-2xl text-[#318AFF]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="currentColor"
                  >
                    <path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54-54 85.5-127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                  </svg>
                </span>
                <span className="text-[#318AFF]">{timeDisplay}</span>
              </div>

              {/* Venue on desktop - same line */}
              <div className="hidden md:flex items-center gap-3 md:text-[1.2rem]">
                <span className="text-2xl text-[#318AFF]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="currentColor"
                  >
                    <path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 115-79.5 232.5T480-80Zm0-480Z" />
                  </svg>
                </span>
                <span className="text-[#318AFF]">{venueDisplay}</span>
              </div>
            </div>

            {/* Venue on mobile - separate line */}
            <div className="flex md:hidden items-center gap-3 text-[0.75rem]">
              <span className="text-xl text-[#318AFF]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="currentColor"
                >
                  <path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 115-79.5 232.5T480-80Zm0-480Z" />
                </svg>
              </span>
              <span className="text-[#318AFF]">{venueDisplay}</span>
            </div>
          </div>
        </Container>
      </section>

      {/* Description Section */}
      {descriptionBlocks.length > 0 && (
        <section className="py-4 md:py-4">
          <Container>
            <div className="space-y-4 text-base leading-relaxed text-white/80 max-w-4xl">
              {descriptionBlocks.map((paragraph: string, index: number) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* CTA Buttons Section */}
      {event.cta && (event.cta.buttonText || event.cta.description) && (
        <section className="py-8 md:py-12">
          <Container>
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              {event.cta?.description && (
                <p className="text-white/70 flex-1">{event.cta.description}</p>
              )}
              {event.cta?.buttonText && event.cta?.buttonLink && (
                <a
                  href={event.cta.buttonLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-[#2563EB] px-8 py-3 text-base font-semibold text-white transition hover:bg-[#1D4ED8] whitespace-nowrap"
                >
                  {event.cta.buttonText}
                </a>
              )}
            </div>
          </Container>
        </section>
      )}

      {/* Photo Gallery Section */}
      {photoCount > 0 && (
        <section className="py-12 md:py-16 border-b border-white/5">
          <Container>
            <PhotoGalleryWithLightbox
              photos={gallerySources}
              mobileGridClass={galleryLayout.mobileGridClass}
              gridClass={galleryLayout.gridClass}
              mobilePhotoClasses={galleryLayout.mobilePhotoClasses}
              photoClasses={galleryLayout.photoClasses}
            />
          </Container>
        </section>
      )}

      {/* Similar Events Section */}
      {similarEvents.length > 0 && (
        <section className="py-12 md:py-16">
          <Container>
            <h2 className="text-[2rem] font-poppins text-[#909090] mb-6 md:mb-8">
              Similar Events
            </h2>
            <SimilarEventsCarousel events={similarEvents} />
          </Container>
        </section>
      )}

      {/* Back to Events Button */}
      <section className="pb-12 md:pb-16">
        <Container>
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
          >
            <span>←</span>
            <span>Back to All Events</span>
          </Link>
        </Container>
      </section>
    </main>
  );
}
