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

const defaultItems: VideoItem[] = [
  { thumbnail: "/home/video-thumb-1.jpg", video: "/home/hero-video.mp4" },
  { thumbnail: "/home/video-thumb-2.jpg", video: "/home/hero-video.mp4" },
  { thumbnail: "/home/video-thumb-3.jpg", video: "/home/hero-video.mp4" },
];

const VideoTile = ({ item }: { item: VideoItem }) => {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className="rounded-2xl lg:rounded-3xl overflow-hidden aspect-[4/3]">
        <CustomVideoPlayer videoSrc={item.video} />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="relative w-full aspect-[4/3] rounded-2xl lg:rounded-3xl overflow-hidden group"
    >
      <Image
        src={item.thumbnail}
        alt="Video thumbnail"
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />

      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex items-center justify-center size-14 md:size-16 rounded-full bg-white/25 border-2 border-white backdrop-blur-sm transition-transform duration-200 group-hover:scale-110">
          <Play className="size-6 md:size-7 text-white fill-white ml-0.5" />
        </span>
      </span>
    </button>
  );
};

const RoundFourvieo = ({ data }: RoundFourvieoProps) => {
  const items = data && data.length > 0 ? data : defaultItems;

  return (
    <section className="container pt-7 md:pt-10 xl:pt-5 2xl:pt-8">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5 lg:gap-6 my-5 md:my-7">
        {items.map((item, i) => (
          <VideoTile key={i} item={item} />
        ))}
      </div>
    </section>
  );
};

export default RoundFourvieo;
