import Image from "next/image";
import React from "react";

interface MediaUploadProps {
  spotlight?: any;
}

// Fallback images for when no spotlight data is provided
import Media1 from "../../../../Assets/Rectangle 4437 (1).png";
import Media2 from "../../../../Assets/Rectangle 4437.png";
import Media3 from "../../../../Assets/Rectangle 4438.png";

export default function MediaUpload({ spotlight }: MediaUploadProps) {
  const s = spotlight;

  if (s) {
    const artworkPhotos: string[] = s?.media?.artwork_photos ?? [];
    const behindScenesPhoto: string | null = s?.media?.behind_scenes_photo ?? null;

    const allImages = [...artworkPhotos];
    if (behindScenesPhoto && !allImages.includes(behindScenesPhoto)) {
      allImages.push(behindScenesPhoto);
    }

    if (allImages.length === 0) return null;

    return (
      <section className="py-12 md:py-20">
        <div className="container px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {allImages.map((src, index) => (
              <div key={index} className="overflow-hidden rounded-[16px]">
                <Image
                  src={src}
                  alt={`Media ${index + 1}`}
                  width={500}
                  height={300}
                  className="h-full w-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Fallback: original hardcoded images
  return (
    <section className="py-12 md:py-20">
      <div className="container px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {[Media1, Media2, Media3, Media2, Media1, Media3].map((image, index) => (
            <div key={index} className="overflow-hidden rounded-[16px]">
              <Image
                src={image}
                alt={`Media ${index + 1}`}
                width={500}
                height={300}
                className="h-full w-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
