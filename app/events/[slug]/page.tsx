import { getEventBySlug, getSimilarEvents, getAllEventSlugs } from "@/sanity/lib/api";
import { Container } from "@/app/components/shared/Container";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Event } from "@/app/types/event";
import SimilarEventsCarousel from "@/app/components/events/SimilarEventsCarousel";

// Force dynamic rendering for development
export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface EventDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = await getAllEventSlugs();
  return slugs
    .filter((item) => item.slug)
    .map((item) => ({ slug: item.slug }));
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
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

  const heroImage = event.bannerImage?.url || event.mainImage?.url;
  const dateDisplay = event.endDate
    ? `${formatDate(event.startDate)} - ${formatDate(event.endDate)}`
    : formatDate(event.startDate);
  const timeDisplay = event.endDate
    ? `${formatTime(event.startDate)} - ${formatTime(event.endDate)}`
    : "Time will be announced";
  const venueDisplay = event.venue || "Venue will be announced";

  const descriptionBlocks = (event.description || [])
    .filter((block: any) => block._type === "block")
    .map((block: any) =>
      block.children?.map((child: any) => child.text).join("")
    )
    .filter((text: string) => text && text.trim().length > 0);

  // Collect all available photos (max 10)
  const gallerySources = [
    ...(event.photos || []),
    event.mainImage,
    event.subMainImage,
    event.otherImage1,
    event.otherImage2,
  ].filter((img): img is NonNullable<typeof img> => Boolean(img?.url)).slice(0, 10);

  const photoCount = gallerySources.length;

  // Define grid layout and photo classes based on count
  const getGalleryLayout = (count: number) => {
    switch (count) {
      case 1:
        return {
          gridClass: "grid-cols-1",
          photoClasses: ["col-span-1 row-span-2 min-h-[400px]"],
          mobileGridClass: "grid-cols-1",
          mobilePhotoClasses: ["col-span-1 min-h-[250px]"]
        };
      case 2:
        return {
          gridClass: "grid-cols-2",
          photoClasses: [
            "col-span-1 row-span-2 min-h-[400px]",
            "col-span-1 row-span-2 min-h-[400px]"
          ],
          mobileGridClass: "grid-cols-2",
          mobilePhotoClasses: [
            "col-span-1 min-h-[180px]",
            "col-span-1 min-h-[180px]"
          ]
        };
      case 3:
        return {
          gridClass: "grid-cols-2",
          photoClasses: [
            "col-span-1 row-span-1 min-h-[195px]",
            "col-span-1 row-span-1 min-h-[195px]",
            "col-span-2 row-span-1 min-h-[195px]"
          ],
          mobileGridClass: "grid-cols-2",
          mobilePhotoClasses: [
            "col-span-1 min-h-[120px]",
            "col-span-1 min-h-[120px]",
            "col-span-2 min-h-[150px]"
          ]
        };
      case 4:
        return {
          gridClass: "grid-cols-2",
          photoClasses: [
            "col-span-1 row-span-1 min-h-[195px]",
            "col-span-1 row-span-1 min-h-[195px]",
            "col-span-1 row-span-1 min-h-[195px]",
            "col-span-1 row-span-1 min-h-[195px]"
          ],
          mobileGridClass: "grid-cols-2",
          mobilePhotoClasses: [
            "col-span-1 min-h-[120px]",
            "col-span-1 min-h-[120px]",
            "col-span-1 min-h-[120px]",
            "col-span-1 min-h-[120px]"
          ]
        };
      case 5:
        return {
          gridClass: "grid-cols-3",
          photoClasses: [
            "col-span-1 row-span-1 min-h-[195px]",
            "col-span-1 row-span-1 min-h-[195px]",
            "col-span-1 row-span-1 min-h-[195px]",
            "col-span-1 row-span-1 min-h-[195px]",
            "col-span-2 row-span-1 min-h-[195px]"
          ],
          mobileGridClass: "grid-cols-2",
          mobilePhotoClasses: [
            "col-span-1 min-h-[120px]",
            "col-span-1 min-h-[120px]",
            "col-span-2 min-h-[150px]",
            "col-span-1 min-h-[120px]",
            "col-span-1 min-h-[120px]"
          ]
        };
      case 6:
        return {
          gridClass: "grid-cols-3",
          photoClasses: [
            "col-span-1 row-span-1 min-h-[195px]",
            "col-span-1 row-span-1 min-h-[195px]",
            "col-span-1 row-span-1 min-h-[195px]",
            "col-span-1 row-span-1 min-h-[195px]",
            "col-span-1 row-span-1 min-h-[195px]",
            "col-span-1 row-span-1 min-h-[195px]"
          ],
          mobileGridClass: "grid-cols-3",
          mobilePhotoClasses: [
            "col-span-1 min-h-[100px]",
            "col-span-1 min-h-[100px]",
            "col-span-1 min-h-[100px]",
            "col-span-1 min-h-[100px]",
            "col-span-1 min-h-[100px]",
            "col-span-1 min-h-[100px]"
          ]
        };
      case 7:
        return {
          gridClass: "grid-cols-4",
          photoClasses: [
            "col-span-1 row-span-1 min-h-[195px]",
            "col-span-1 row-span-1 min-h-[195px]",
            "col-span-1 row-span-1 min-h-[195px]",
            "col-span-1 row-span-1 min-h-[195px]",
            "col-span-1 row-span-1 min-h-[195px]",
            "col-span-2 row-span-1 min-h-[195px]",
            "col-span-1 row-span-1 min-h-[195px]"
          ],
          mobileGridClass: "grid-cols-3",
          mobilePhotoClasses: [
            "col-span-2 min-h-[130px]",
            "col-span-1 min-h-[130px]",
            "col-span-1 min-h-[100px]",
            "col-span-1 min-h-[100px]",
            "col-span-1 min-h-[100px]",
            "col-span-2 min-h-[120px]",
            "col-span-1 min-h-[120px]"
          ]
        };
      case 8:
        return {
          gridClass: "grid-cols-4",
          photoClasses: [
            "col-span-1 row-span-1 min-h-[195px]",
            "col-span-1 row-span-1 min-h-[195px]",
            "col-span-1 row-span-1 min-h-[195px]",
            "col-span-1 row-span-1 min-h-[195px]",
            "col-span-1 row-span-1 min-h-[195px]",
            "col-span-1 row-span-1 min-h-[195px]",
            "col-span-1 row-span-1 min-h-[195px]",
            "col-span-1 row-span-1 min-h-[195px]"
          ],
          mobileGridClass: "grid-cols-3",
          mobilePhotoClasses: [
            "col-span-1 min-h-[100px]",
            "col-span-2 min-h-[100px]",
            "col-span-2 min-h-[120px]",
            "col-span-1 min-h-[120px]",
            "col-span-1 min-h-[100px]",
            "col-span-1 min-h-[100px]",
            "col-span-1 min-h-[100px]"
          ]
        };
      case 9:
        return {
          gridClass: "grid-cols-5",
          photoClasses: [
            "col-span-1 row-span-1 min-h-[195px]",
            "col-span-1 row-span-1 min-h-[195px]",
            "col-span-1 row-span-1 min-h-[195px]",
            "col-span-1 row-span-1 min-h-[195px]",
            "col-span-1 row-span-1 min-h-[195px]",
            "col-span-1 row-span-1 min-h-[195px]",
            "col-span-1 row-span-1 min-h-[195px]",
            "col-span-2 row-span-1 min-h-[195px]",
            "col-span-1 row-span-1 min-h-[195px]"
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
            "col-span-1 min-h-[120px]"
          ]
        };
      case 10:
        return {
          gridClass: "grid-cols-5",
          photoClasses: [
            "col-span-1 row-span-1 min-h-[195px]",
            "col-span-1 row-span-1 min-h-[195px]",
            "col-span-1 row-span-1 min-h-[195px]",
            "col-span-1 row-span-1 min-h-[195px]",
            "col-span-1 row-span-1 min-h-[195px]",
            "col-span-1 row-span-1 min-h-[195px]",
            "col-span-1 row-span-1 min-h-[195px]",
            "col-span-1 row-span-1 min-h-[195px]",
            "col-span-1 row-span-1 min-h-[195px]",
            "col-span-1 row-span-1 min-h-[195px]"
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
            "col-span-1 min-h-[120px]"
          ]
        };
      default:
        return { 
          gridClass: "grid-cols-1", 
          photoClasses: [],
          mobileGridClass: "grid-cols-1",
          mobilePhotoClasses: []
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
                <span className="text-xl md:text-2xl">📅</span>
                <span className="text-[#318AFF]">{dateDisplay}</span>
              </div>

              <div className="flex items-center gap-3 text-[0.75rem] md:text-[1.2rem]">
                <span className="text-xl md:text-2xl">🕐</span>
                <span className="text-[#318AFF]">{timeDisplay}</span>
              </div>

              {/* Venue on desktop - same line */}
              <div className="hidden md:flex items-center gap-3 md:text-[1.2rem]">
                <span className="text-2xl">📍</span>
                <span className="text-[#318AFF]">{venueDisplay}</span>
              </div>
            </div>

            {/* Venue on mobile - separate line */}
            <div className="flex md:hidden items-center gap-3 text-[0.75rem]">
              <span className="text-xl">📍</span>
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
                <p className="text-white/70 flex-1">
                  {event.cta.description}
                </p>
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
            <div className={`grid ${galleryLayout.mobileGridClass} md:${galleryLayout.gridClass} md:grid-rows-2 gap-3 auto-rows-fr`}>
              {gallerySources.map((photo, index) => (
                <div
                  key={index}
                  className={`rounded-xl overflow-hidden border border-white/5 bg-white/5 ${galleryLayout.mobilePhotoClasses[index] || ""} md:${galleryLayout.photoClasses[index] || ""}`}
                >
                  <img
                    src={photo.url}
                    alt={photo.alt || `Event photo ${index + 1}`}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Similar Events Section */}
      {similarEvents.length > 0 && (
        <section className="py-12 md:py-16">
          <Container>
            <h2 className="text-[2rem] font-poppins text-[#909090] mb-6 md:mb-8">Similar Events</h2>
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
