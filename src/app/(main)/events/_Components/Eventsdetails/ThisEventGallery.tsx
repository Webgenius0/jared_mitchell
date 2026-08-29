import React, { useState } from "react";
import { PiPlayCircle } from "react-icons/pi";

interface EventMedia {
  id: number;
  event_id: number;
  full_url: string;
  created_at: string;
}

interface ThisEventGalleryProps {
  media?: EventMedia[];
  promoVideoUrl?: string | null;
}

export default function ThisEventGallery({
  media = [],
  promoVideoUrl,
}: ThisEventGalleryProps) {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const isVideo = (url: string) => {
    return (
      /\.(mp4|webm|ogg|mov)$/i.test(url) ||
      url.includes("/videos/") ||
      (url.includes("/media/") && url.endsWith(".mp4"))
    );
  };

  // Filter and prepare gallery items
  const galleryItems = media.map(item => ({
    id: item.id,
    type: isVideo(item.full_url) ? "video" : "image",
    src: item.full_url,
  }));

  if (galleryItems.length === 0 && !promoVideoUrl) {
    return null;
  }

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Header Section */}
        <div className="mb-8">
          <h3 className="text-4xl md:text-5xl font-bold pb-3 text-black tracking-tight">
            Event Gallery
          </h3>
          <p className="text-gray-600 text-lg md:text-xl font-normal leading-relaxed max-w-2xl">
            See the promo videos, photos, and highlights from this event.
          </p>
        </div>

        {/* Gallery Grid Structure */}
        <div className="space-y-6">
          {/* Main Top Promo Video/Featured Media */}
          {promoVideoUrl && (
            <div className="w-full max-w-6xl overflow-hidden shadow-md max-h-[650px] aspect-video relative group">
              <video
                src={promoVideoUrl}
                controls
                className="w-full h-full object-cover"
                poster={media.find(m => !isVideo(m.full_url))?.full_url || ""}
                preload="metadata"
              />
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold">
                Promo Video
              </div>
            </div>
          )}

          {/* Grid for Event Media */}
          {galleryItems.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-6xl">
              {galleryItems.map(item => (
                <div
                  key={item.id}
                  className="relative group aspect-square w-full overflow-hidden bg-gray-900 shadow-sm border border-gray-100"
                >
                  {item.type === "video" ? (
                    activeVideo === item.src ? (
                      <video
                        src={item.src}
                        controls
                        autoPlay
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div
                        className="relative w-full h-full cursor-pointer"
                        onClick={() => setActiveVideo(item.src)}
                      >
                        <video
                          src={item.src}
                          className="w-full h-full object-cover opacity-80"
                          preload="metadata"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/45 transition-colors duration-300">
                          <PiPlayCircle className="text-white size-12 transform transition-transform group-hover:scale-110 drop-shadow-lg" />
                        </div>
                      </div>
                    )
                  ) : (
                    <a
                      href={item.src}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full h-full cursor-zoom-in"
                    >
                      <img
                        src={item.src}
                        alt="Event gallery image"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
