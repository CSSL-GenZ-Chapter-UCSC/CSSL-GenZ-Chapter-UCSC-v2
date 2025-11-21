import { getEventBySlug, getSimilarEvents, getAllEventSlugs } from "@/sanity/lib/api";
import { Container } from "@/app/components/shared/Container";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Event } from "@/app/types/event";

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
          photoClasses: ["col-span-1 row-span-2 min-h-[400px]"]
        };
      case 2:
        return {
          gridClass: "grid-cols-2",
          photoClasses: [
            "col-span-1 row-span-2 min-h-[400px]",
            "col-span-1 row-span-2 min-h-[400px]"
          ]
        };
      case 3:
        return {
          gridClass: "grid-cols-2",
          photoClasses: [
            "col-span-1 row-span-1 min-h-[195px]",
            "col-span-1 row-span-1 min-h-[195px]",
            "col-span-2 row-span-1 min-h-[195px]"
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
          ]
        };
      default:
        return { gridClass: "grid-cols-1", photoClasses: [] };
    }
  };

  const galleryLayout = getGalleryLayout(photoCount);

  return (
    <main className="min-h-screen bg-[#060606] text-white font-poppins overflow-x-hidden pt-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-8 md:py-12">
        <Container className="relative z-10">

          <div className="min-h-[10vh] flex items-center mb-8">
            <h1 className="text-[4rem] font-bold font-poppins leading-tight bg-linear-to-r from-[#0F52B4] via-[#1169EA] to-[#318AFF] bg-clip-text text-transparent">
              {event.title}
            </h1>
          </div>

          {/* Event Info with Icons */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
            <div className="flex items-center gap-3 text-[1.2rem]">
              <span className="text-2xl">📅</span>
              <span className="text-[#318AFF]">{dateDisplay}</span>
            </div>

            <div className="flex items-center gap-3 text-[1.2rem]">
              <span className="text-2xl">🕐</span>
              <span className="text-[#318AFF]">{timeDisplay}</span>
            </div>

            <div className="flex items-center gap-3 text-[1.2rem]">
              <span className="text-2xl">📍</span>
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
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 md:mb-10">
              Event Gallery
            </h2>
            <div className={`grid ${galleryLayout.gridClass} grid-rows-2 gap-3 auto-rows-fr`}>
              {gallerySources.map((photo, index) => (
                <div
                  key={index}
                  className={`rounded-xl overflow-hidden border border-white/5 bg-white/5 ${galleryLayout.photoClasses[index] || ""}`}
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
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 md:mb-8">Similar Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {similarEvents.map((similarEvent) => (
                <Link
                  key={similarEvent._id}
                  href={`/events/${similarEvent.slug.current}`}
                  className="group"
                >
                  <div className="overflow-hidden">
                    {/* Event Image */}
                    {(similarEvent.mainImage?.url || similarEvent.subMainImage?.url) ? (
                      <div className="aspect-video bg-gray-700 mb-4 rounded-lg overflow-hidden">
                        <img
                          src={similarEvent.mainImage?.url || similarEvent.subMainImage?.url}
                          alt={similarEvent.mainImage?.alt || similarEvent.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ) : (
                      <div className="aspect-video bg-gray-700 mb-4 rounded-lg flex items-center justify-center">
                        <span className="text-gray-500 text-sm">No Image</span>
                      </div>
                    )}
                    
                    {/* Logo if available */}
                    {similarEvent.logo?.url && (
                      <div className="h-8 mb-3">
                        <img
                          src={similarEvent.logo.url}
                          alt={similarEvent.logo.alt || `${similarEvent.title} logo`}
                          className="h-full w-auto object-contain"
                        />
                      </div>
                    )}
                    
                    <h3 className="text-lg md:text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                      {similarEvent.title}
                    </h3>
                    
                    <p className="text-sm text-white/60 mb-3">
                      {formatDate(similarEvent.startDate)}
                      {similarEvent.endDate && ` - ${formatDate(similarEvent.endDate)}`}
                    </p>
                    
                    {similarEvent.shortSummary && (
                      <p className="text-sm text-white/70 line-clamp-2 mb-3">
                        {similarEvent.shortSummary}
                      </p>
                    )}
                    
                    <span className="text-sm text-blue-400 group-hover:text-blue-300 inline-flex items-center gap-1">
                      View Event <span>→</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
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
