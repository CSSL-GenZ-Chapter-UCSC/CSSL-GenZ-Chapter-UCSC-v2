"use client";

import { useState } from "react";
import Image from "next/image";

interface Photo {
  url?: string;
  alt?: string;
}

interface PhotoGalleryWithLightboxProps {
  photos: Photo[];
  mobileGridClass: string;
  gridClass: string;
  mobilePhotoClasses: string[];
  photoClasses: string[];
}

export default function PhotoGalleryWithLightbox({
  photos,
  mobileGridClass,
  gridClass,
  mobilePhotoClasses,
  photoClasses,
}: PhotoGalleryWithLightboxProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "auto";
  };

  return (
    <>
      <div
        className={`grid ${mobileGridClass} md:${gridClass} md:grid-rows-2 gap-3 auto-rows-fr`}
      >
        {photos.map(
          (photo, index) =>
            photo.url && (
              <div
                key={index}
                onClick={() => openLightbox(index)}
                className={`rounded-xl overflow-hidden border border-white/5 bg-white/5 cursor-pointer hover:opacity-90 transition-opacity relative ${mobilePhotoClasses[index] || ""} md:${photoClasses[index] || ""}`}
              >
                <Image
                  src={photo.url}
                  alt={photo.alt || `Event photo ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            )
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 z-50"
          >
            ×
          </button>
          <div className="relative w-full h-full">
            <Image
              src={photos[currentImageIndex].url!}
              alt={
                photos[currentImageIndex].alt ||
                `Event photo ${currentImageIndex + 1}`
              }
              fill
              className="object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </>
  );
}
