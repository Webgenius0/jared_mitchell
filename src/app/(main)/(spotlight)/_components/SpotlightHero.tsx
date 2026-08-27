"use client";

import { useCallback, useRef, useState } from "react";
import Container from "@/Components/Common/Container";
import CustomVideoPlayer, { CustomVideoPlayerHandle } from "@/Components/Common/CustomVideoPlayer";
import LiveStreamPlayer from "@/Components/Common/LiveStreamPlayer";
import { getStreamPlaybackUrl } from "@/lib/Services/cms_service";
import { CMSArtistSpotlightVideo, LiveStream, VideoChannelItem } from "@/Types/cms";

const SpotlightHero = ({
  data,
  liveStream,
  hasPendingStream = false,
  videoChannelVideos = [],
}: {
  data?: CMSArtistSpotlightVideo;
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
      <section className="section">
        <Container>
          <div className="w-full h-[200px] md:h-[350px] lg:h-[400px] xl:h-[627px] sm:px-5 2xl:px-0">
            <LiveStreamPlayer
              src={streamSrc}
              streamId={liveStream.id}
              isLive={isLive}
              className={"!rounded-[20px] md:!rounded-[40px] w-full h-full"}
            />
          </div>
          {data?.sub_title && (
            <p className="text-center text-sm md:text-base lg:text-lg xl:text-xl text-secondary-black mt-3 md:mt-4 max-w-[900px] mx-auto">
              {data.sub_title}
            </p>
          )}
        </Container>
      </section>
    );
  }

  // Not live — show video channel videos with crossfade transition
  if (total > 0) {
    const currentVideo = videoChannelVideos[currentIndex];

    return (
      <section className="section">
        <Container>
          <div className="relative w-full h-[200px] md:h-[350px] lg:h-[400px] xl:h-[627px] rounded-xl md:rounded-[32px] lg:rounded-[40px] overflow-hidden sm:px-5 2xl:px-0">
            {/* Current video (fades out during transition) */}
            <CustomVideoPlayer
              key={`current-${currentVideo.id}`}
              videoSrc={currentVideo.video_url}
              autoPlay
              onEnded={handleEnded}
              forceMuted={isTransitioning}
              className="absolute inset-0 w-full h-full rounded-[20px] md:rounded-[40px] z-10"
              videoClassName="w-full h-full object-cover rounded-[20px] md:rounded-[40px]"
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
                className="absolute inset-0 w-full h-full rounded-[20px] md:rounded-[40px] z-0"
                videoClassName="w-full h-full object-cover rounded-[20px] md:rounded-[40px]"
                style={{
                  opacity: isTransitioning ? 1 : 0,
                  transition: "opacity 0.6s ease-in-out",
                }}
              />
            )}
          </div>
          {data?.sub_title && (
            <p className="text-center text-sm md:text-base lg:text-lg xl:text-xl text-secondary-black mt-3 md:mt-4 max-w-[900px] mx-auto">
              {data.sub_title}
            </p>
          )}
        </Container>
      </section>
    );
  }

  return null;
};

export default SpotlightHero;
