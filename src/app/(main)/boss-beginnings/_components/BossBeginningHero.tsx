"use client";

import { useCallback, useRef, useState } from "react";
import CustomVideoPlayer, { CustomVideoPlayerHandle } from "@/Components/Common/CustomVideoPlayer";
import LiveStreamPlayer from "@/Components/Common/LiveStreamPlayer";
import { getStreamPlaybackUrl } from "@/lib/Services/cms_service";
import { CMSBossBeginningsHero, LiveStream, VideoChannelItem } from "@/Types/cms";

const BossBeginningHero = ({
  data,
  liveStream,
  hasPendingStream = false,
  videoChannelVideos = [],
}: {
  data?: CMSBossBeginningsHero;
  liveStream?: LiveStream;
  hasPendingStream?: boolean;
  videoChannelVideos?: VideoChannelItem[];
}) => {
  const streamSrc = getStreamPlaybackUrl(liveStream);
  const isLive = liveStream?.status === "live";

  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextRef = useRef<CustomVideoPlayerHandle>(null);

  const total = videoChannelVideos.length;

  const handleEnded = useCallback(() => {
    if (total === 0) return;
    const next = currentIndex < total - 1 ? currentIndex + 1 : 0;
    setNextIndex(next);
    setIsTransitioning(true);

    nextRef.current?.videoEl?.play().catch(() => {});

    setTimeout(() => {
      setCurrentIndex(next);
      setNextIndex(null);
      setIsTransitioning(false);
    }, 600);
  }, [currentIndex, total]);

  // Live stream — show the live player
  if (isLive && streamSrc && liveStream) {
    return (
      <section className="container text-center pt-7 md:pt-10 xl:pt-5 2xl:pt-8">
        <div className="flex items-center justify-center my-5 md:my-7 rounded-2xl lg:rounded-4xl xl:rounded-[40px] overflow-hidden max-w-6xl mx-auto">
          <LiveStreamPlayer
            src={streamSrc}
            streamId={liveStream.id}
            isLive={isLive}
          />
        </div>
      </section>
    );
  }

  // Not live — show video channel videos with crossfade transition
  if (total > 0) {
    const currentVideo = videoChannelVideos[currentIndex];

    return (
      <section className="container text-center pt-7 md:pt-10 xl:pt-5 2xl:pt-8">
        <div className="relative flex items-center justify-center my-5 md:my-7 rounded-2xl lg:rounded-4xl xl:rounded-[40px] overflow-hidden max-w-6xl mx-auto">
          {/* Current video (fades out during transition) */}
          <CustomVideoPlayer
            key={`current-${currentVideo.id}`}
            videoSrc={currentVideo.video_url}
            autoPlay
            onEnded={handleEnded}
            forceMuted={isTransitioning}
            className="w-full h-auto relative z-10"
            videoClassName="w-full h-auto object-cover"
            style={{
              opacity: isTransitioning ? 0 : 1,
              transition: "opacity 0.6s ease-in-out",
            }}
          />

          {/* Next video (fades in during transition) */}
          {nextIndex !== null && (
            <CustomVideoPlayer
              ref={nextRef}
              key={`next-${videoChannelVideos[nextIndex].id}`}
              videoSrc={videoChannelVideos[nextIndex].video_url}
              autoPlay
              forceMuted
              className="absolute inset-0 w-full h-full z-0"
              videoClassName="w-full h-full object-cover"
              style={{
                opacity: isTransitioning ? 1 : 0,
                transition: "opacity 0.6s ease-in-out",
              }}
            />
          )}
        </div>
      </section>
    );
  }

  return null;
};

export default BossBeginningHero;
