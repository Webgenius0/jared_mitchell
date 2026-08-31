"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/Components/Common/Button";
import { getEventGallery } from "@/lib/Services/cms_service";
import { EventGalleryItem } from "@/Types/cms";
import { HiPlay, HiX, HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { HiOutlinePhoto } from "react-icons/hi2";

const ITEMS_PER_PAGE = 9;

const EventGallery = () => {
  const [gallery, setGallery] = useState<EventGalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getEventGallery()
      .then(res => setGallery(res.gallery))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Separate images & videos for layout
  const images = gallery.filter(item => item.media_type === "image");
  const videos = gallery.filter(item => item.media_type === "video");
  const allMedia = gallery;

  // Pagination
  const totalPages = Math.ceil(gallery.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedGallery = gallery.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % allMedia.length);
  };

  const goPrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + allMedia.length) % allMedia.length);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxIndex]);

  if (loading) {
    return (
      <section className="py-8 md:py-10 lg:py-12 xl:py-20 container">
        <h2 className="section_title text-xl md:text-3xl lg:text-4xl xl:text-6xl 2xl:text-7xl 2xl:font-bold">
          Event Gallery
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-5 mt-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-[180px] sm:h-[250px] md:h-[300px] xl:h-[369px] bg-gray-100 animate-pulse"
            />
          ))}
        </div>
      </section>
    );
  }

  if (gallery.length === 0) {
    return (
      <section className="py-8 md:py-10 lg:py-12 xl:py-20 container">
        <h2 className="section_title text-xl md:text-3xl lg:text-4xl xl:text-6xl 2xl:text-7xl 2xl:font-bold">
          Event Gallery
        </h2>
        <p className="text-sm md:text-base lg:text-lg xl:text-xl text-[#1D1D1F] text-center mb-4 md:mb-5 lg:mb-6 xl:mb-12 max-w-[90%] md:max-w-[70%] mx-auto">
          Explore photos and videos from past OSI events. See the energy,
          creativity, and community that makes each gathering special.
        </p>
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <HiOutlinePhoto className="size-16 mb-4" />
          <p className="text-lg">No gallery media available yet.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="event-gallery" className="py-10 md:py-16 xl:py-20 container ">
      <h2 className="section_title text-2xl md:text-4xl xl:text-6xl 2xl:text-7xl 2xl:font-bold">
        Event Gallery
      </h2>

      <p className="text-base md:text-lg xl:text-xl text-[#1D1D1F] text-center mb-6 md:mb-8 xl:mb-12 max-w-[90%] md:max-w-[70%] mx-auto">
        Explore photos and videos from past OSI events. See the energy,
        creativity, and community that makes each gathering special.
      </p>

      {/* Stats bar */}
      <div className="flex items-center justify-center gap-5 mb-5 md:mb-6 text-xs md:text-sm text-gray-500">
        <span className="flex items-center gap-1.5">
          <HiOutlinePhoto className="size-4" />
          {images.length} {images.length === 1 ? "Photo" : "Photos"}
        </span>
        {videos.length > 0 && (
          <span className="flex items-center gap-1.5">
            <HiPlay className="size-4" />
            {videos.length} {videos.length === 1 ? "Video" : "Videos"}
          </span>
        )}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 md:gap-3.5 lg:gap-4 md:w-[80%] 2xl:w-full mx-auto">
        {paginatedGallery.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => openLightbox(startIndex + idx)}
            className="group relative h-[150px] sm:h-[200px] md:h-[230px] lg:h-[260px] xl:h-[369px] overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue focus-visible:ring-offset-2"
          >
            {item.media_type === "video" ? (
              <>
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                <div className="absolute inset-0 z-20 flex items-center justify-center">
                  <div className="flex items-center justify-center size-14 md:size-16 rounded-full bg-white/90 shadow-lg transition-transform duration-300 group-hover:scale-110">
                    <HiPlay className="size-6 md:size-7 text-primary-blue ml-0.5" />
                  </div>
                </div>
                {/* Video badge */}
                <span className="absolute bottom-2 left-2 z-20 bg-black/70 text-white text-[10px] md:text-xs font-medium px-2 py-0.5 rounded">
                  Video
                </span>
              </>
            ) : (
              <>
                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20 z-10" />
                <Image
                  src={item.full_url}
                  alt={item.file_name || "Gallery image"}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </>
            )}
          </button>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-10">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="flex items-center justify-center size-10 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            aria-label="Previous page"
          >
            <HiChevronLeft className="size-5" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => {
                setCurrentPage(page);
                // Scroll gallery into view
                document.getElementById("event-gallery")?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className={`flex items-center justify-center size-10 rounded-lg text-sm font-medium transition-colors ${
                currentPage === page
                  ? "bg-primary-blue text-white shadow-md"
                  : "border border-gray-300 text-gray-600 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="flex items-center justify-center size-10 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            aria-label="Next page"
          >
            <HiChevronRight className="size-5" />
          </button>
        </div>
      )}

      {/* View Full Gallery Button */}
      <div className="flex justify-center mt-10">
        <Button size="xl" onClick={() => openLightbox(0)}>
          View Full Gallery
        </Button>
      </div>

      {/* ─── Lightbox ─────────────────────────────────────────────── */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center">
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 flex items-center justify-center size-10 md:size-12 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close lightbox"
          >
            <HiX className="size-6" />
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-4 z-10 text-white/80 text-sm md:text-base font-medium">
            {lightboxIndex + 1} / {allMedia.length}
          </div>

          {/* Previous */}
          {allMedia.length > 1 && (
            <button
              onClick={goPrev}
              className="absolute left-2 md:left-6 z-10 flex items-center justify-center size-10 md:size-12 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Previous"
            >
              <HiChevronLeft className="size-6" />
            </button>
          )}

          {/* Media */}
          <div className="max-w-[90vw] max-h-[85vh] flex items-center justify-center">
            {allMedia[lightboxIndex].media_type === "video" ? (
              <video
                src={allMedia[lightboxIndex].full_url}
                controls
                autoPlay
                className="max-w-full max-h-[85vh] rounded-lg"
              >
                Your browser does not support the video tag.
              </video>
            ) : (
              <div className="relative w-[80vw] h-[75vh]">
                <Image
                  src={allMedia[lightboxIndex].full_url}
                  alt={allMedia[lightboxIndex].file_name || "Gallery image"}
                  fill
                  className="object-contain"
                  sizes="80vw"
                  priority
                />
              </div>
            )}
          </div>

          {/* Next */}
          {allMedia.length > 1 && (
            <button
              onClick={goNext}
              className="absolute right-2 md:right-6 z-10 flex items-center justify-center size-10 md:size-12 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Next"
            >
              <HiChevronRight className="size-6" />
            </button>
          )}
        </div>
      )}
    </section>
  );
};

export default EventGallery;
