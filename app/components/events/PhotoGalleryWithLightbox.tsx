"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { MasonryPhotoAlbum, Photo, RenderPhotoContext } from "react-photo-album";
import "react-photo-album/masonry.css";

interface PhotoData {
  url?: string;
  alt?: string;
  width?: number;
  height?: number;
}

interface PhotoGalleryWithLightboxProps {
  photos: PhotoData[];
}

export default function PhotoGalleryWithLightbox({
  photos,
}: PhotoGalleryWithLightboxProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Filter out photos without URLs and convert to react-photo-album format
  const validPhotos = photos.filter((p): p is Required<Pick<PhotoData, 'url'>> & PhotoData => Boolean(p.url));
  
  const albumPhotos: Photo[] = validPhotos.map((photo, index) => ({
    src: photo.url!,
    width: photo.width || 800,
    height: photo.height || 600,
    alt: photo.alt || `Event photo ${index + 1}`,
    key: `photo-${index}`,
  }));

  const openLightbox = useCallback((index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = "auto";
  }, []);

  const goToPrevious = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? validPhotos.length - 1 : prev - 1));
  }, [validPhotos.length]);

  const goToNext = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === validPhotos.length - 1 ? 0 : prev + 1));
  }, [validPhotos.length]);

  // Custom render function to use Next.js Image with correct v3 API
  const renderPhoto = useCallback(
    (_props: object, { photo, width, height, index }: RenderPhotoContext) => {
      return (
        <div
          style={{
            width,
            height,
            position: "relative",
            cursor: "pointer",
          }}
          onClick={() => openLightbox(index)}
          className="rounded-xl overflow-hidden border border-white/5 bg-black/40 hover:opacity-90 transition-opacity group"
        >
          <Image
            src={photo.src}
            alt={(photo as Photo & { alt?: string }).alt || `Event photo ${index + 1}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      );
    },
    [openLightbox]
  );

  if (validPhotos.length === 0) return null;

  return (
    <>
      {/* Masonry Gallery */}
      <MasonryPhotoAlbum
        photos={albumPhotos}
        columns={(containerWidth) => {
          if (containerWidth < 640) return 1;
          if (containerWidth < 1024) return 2;
          return 3;
        }}
        spacing={16}
        render={{ photo: renderPhoto }}
      />

      {/* Lightbox Modal */}
      {lightboxOpen && validPhotos[currentImageIndex] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 z-50 bg-black/50 rounded-full w-12 h-12 flex items-center justify-center"
          >
            ×
          </button>
          
          {/* Previous button */}
          {validPhotos.length > 1 && (
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-gray-300 z-50 bg-black/50 rounded-full w-12 h-12 flex items-center justify-center"
            >
              ‹
            </button>
          )}
          
          {/* Next button */}
          {validPhotos.length > 1 && (
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-gray-300 z-50 bg-black/50 rounded-full w-12 h-12 flex items-center justify-center"
            >
              ›
            </button>
          )}
          
          {/* Image container */}
          <div 
            className="relative w-full h-full max-w-6xl max-h-[90vh] mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={validPhotos[currentImageIndex].url!}
              alt={
                validPhotos[currentImageIndex].alt ||
                `Event photo ${currentImageIndex + 1}`
              }
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>
          
          {/* Image counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm bg-black/50 px-4 py-2 rounded-full">
            {currentImageIndex + 1} / {validPhotos.length}
          </div>
        </div>
      )}
    </>
  );
}
