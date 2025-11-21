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

  const gallerySources = [
    ...(event.photos || []),
    event.mainImage,
    event.subMainImage,
    event.otherImage1,
    event.otherImage2,
  ].filter((img): img is NonNullable<typeof img> => Boolean(img?.url));

  const visibleGallery = gallerySources.slice(0, 5);
  const placeholders = Array.from(
    { length: Math.max(0, 5 - visibleGallery.length) },
    () => null
  );
  const gallerySlots = [...visibleGallery, ...placeholders];

  const mosaicClasses = [
    "md:col-span-2 md:row-span-2 min-h-[220px] md:min-h-[360px]",
    "md:col-span-2 min-h-[180px]",
    "md:col-span-1 min-h-[180px]",
    "md:col-span-1 min-h-[180px]",
    "md:col-span-1 min-h-[180px]",
  ];

  return (
    <main className="min-h-screen bg-[#060606] text-white font-poppins overflow-x-hidden pt-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-8 md:py-12">
        <Container className="relative z-10">
          {event.logo?.url && (
            <div className="mb-6 h-12 md:h-14 w-auto">
              <img
                src={event.logo.url}
                alt={event.logo.alt || `${event.title} logo`}
                className="h-full w-auto object-contain"
              />
            </div>
          )}

          <div className="min-h-[10vh] flex items-center mb-8">
            <h1 className="text-[4rem] font-bold font-poppins text-white leading-tight">
              {event.title}
            </h1>
          </div>

          {/* Event Info with Icons */}
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3 text-[1.2rem]">
              <span className="text-2xl">📅</span>
              <span>{dateDisplay}</span>
            </div>
            
            <div className="flex items-center gap-3 text-[1.2rem]">
              <span className="text-2xl">🕐</span>
              <span>{timeDisplay}</span>
            </div>
            
            <div className="flex items-center gap-3 text-[1.2rem]">
              <span className="text-2xl">📍</span>
              <span>{venueDisplay}</span>
            </div>
          </div>

          {/* Short Summary / Banner Text */}
          {(event.bannerText || event.shortSummary) && (
            <p className="text-lg text-white/80 max-w-3xl mb-8">
              {event.bannerText || event.shortSummary}
            </p>
          )}
        </Container>
      </section>

      {/* Description Section */}
      {descriptionBlocks.length > 0 && (
        <section className="py-8 md:py-12">
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
      {gallerySlots.length > 0 && (
        <section className="py-12 md:py-16 border-b border-white/5">
          <Container>
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 md:mb-10">
              Event Gallery
            </h2>
            <div className="grid gap-3 md:grid-cols-4 auto-rows-[160px]">
              {gallerySlots.map((photo, index) => (
                <div
                  key={index}
                  className={`rounded-xl overflow-hidden border border-white/5 bg-white/5 ${mosaicClasses[index] || ""}`}
                >
                  {photo?.url ? (
                    <img
                      src={photo.url}
                      alt={photo.alt || `Event photo ${index + 1}`}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm text-white/30">
                      Coming soon
                    </div>
                  )}
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
