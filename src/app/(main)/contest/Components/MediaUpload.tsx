import Image from "next/image";
import React from "react";

interface MediaUploadProps {
  spotlight?: any;
}

export default function MediaUpload({ spotlight }: MediaUploadProps) {
  const s = spotlight;
  if (!s) return null;

  // Support both artist and business media field names
  const artworkPhotos: string[] =
    s?.media?.artwork_photos ?? s?.media?.product_service_photos ?? [];
  const behindScenesPhoto: string | null =
    s?.media?.behind_scenes_photo ?? s?.media?.storefront_workspace_photo ?? null;
  const portraitPhoto: string | null = s?.media?.portrait_photo ?? null;
  const teamPhoto: string | null = s?.media?.team_photo ?? null;

  const allImages = [...artworkPhotos];
  if (behindScenesPhoto && !allImages.includes(behindScenesPhoto)) {
    allImages.push(behindScenesPhoto);
  }
  if (portraitPhoto && !allImages.includes(portraitPhoto)) {
    allImages.push(portraitPhoto);
  }
  if (teamPhoto && !allImages.includes(teamPhoto)) {
    allImages.push(teamPhoto);
  }

  // No media available — hide the section entirely.
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
