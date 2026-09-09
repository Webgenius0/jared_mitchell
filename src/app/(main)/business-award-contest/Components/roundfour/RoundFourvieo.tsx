"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import CustomVideoPlayer from "@/Components/Common/CustomVideoPlayer";

interface VideoItem {
  thumbnail: string;
  video: string;
}

interface RoundFourvieoProps {
  data?: VideoItem[];
}

const VideoTile = ({ item }: { item: VideoItem }) => {
  const [playing, setPlaying] = useState(true);
  const hasVideo = Boolean(item.video);

  if (hasVideo && playing) {
    return (
      <div className="overflow-hidden aspect-video">
        <CustomVideoPlayer videoSrc={item.video} />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => hasVideo && setPlaying(true)}
      className={`relative w-full aspect-video overflow-hidden group ${
        hasVideo ? "" : "cursor-default"
      }`}
    >
      <Image
        src={item.thumbnail}
        alt="Media thumbnail"
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />

      {hasVideo && (
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex items-center justify-center size-14 md:size-16 rounded-full bg-white/25 border-2 border-white backdrop-blur-sm transition-transform duration-200 group-hover:scale-110">
            <Play className="size-6 md:size-7 text-white fill-white ml-0.5" />
          </span>
        </span>
      )}
    </button>
  );
};

const RoundFourvieo = ({ data }: RoundFourvieoProps) => {
  // No real media submitted — show an empty state instead of fabricated videos.
  if (!data || data.length === 0) {
    return (
      <section className="container pt-7 md:pt-10 xl:pt-5 2xl:pt-8">
        <div className="rounded-2xl border border-black/10 bg-white p-10 text-center text-sm sm:text-base text-black/50 my-5 md:my-7">
          No media submitted yet.
        </div>
      </section>
    );
  }

  return (
    <section className="container pt-7 md:pt-10 xl:pt-5 2xl:pt-8">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5 lg:gap-6 my-5 md:my-7">
        {data.map((item, i) => (
          <VideoTile key={i} item={item} />
        ))}
      </div>
    </section>
  );
};

export default RoundFourvieo;
