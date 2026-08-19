"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Container from "@/Components/Common/Container";
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

  const currentRef = useRef<HTMLVideoElement>(null);
  const nextRef = useRef<HTMLVideoElement>(null);

  const total = videoChannelVideos.length;

  const handleEnded = useCallback(() => {
    if (total === 0) return;
    const next = currentIndex < total - 1 ? currentIndex + 1 : 0;
    setNextIndex(next);
    setIsTransitioning(true);

    nextRef.current?.play().catch(() => {});

    setTimeout(() => {
      setCurrentIndex(next);
      setNextIndex(null);
      setIsTransitioning(false);
    }, 600);
  }, [currentIndex, total]);

  useEffect(() => {
    if (isLive || total === 0 || !currentRef.current) return;

    const video = currentRef.current;
    video.addEventListener("ended", handleEnded);
    return () => video.removeEventListener("ended", handleEnded);
  }, [isLive, total, handleEnded, currentIndex]);

  // Live stream — show the live player
  if (isLive && streamSrc && liveStream) {
    return (
      <section className="section">
        <Container>
          <div className="w-full h-[300px] md:h-[500px] xl:h-[627px] sm:px-5 2xl:px-0">
            <LiveStreamPlayer
              src={streamSrc}
              streamId={liveStream.id}
              isLive={isLive}
              className={"!rounded-[20px] md:!rounded-[40px] w-full h-full"}
            />
          </div>
          {data?.sub_title && (
            <p className="text-center text-lg md:text-xl text-secondary-black mt-4 max-w-[900px] mx-auto">
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
          <div className="relative w-full h-[300px] md:h-[500px] xl:h-[627px] rounded-[20px] md:rounded-[40px] overflow-hidden sm:px-5 2xl:px-0">
            {/* Current video (fades out during transition) */}
            <video
              ref={currentRef}
              key={`current-${currentVideo.id}`}
              src={currentVideo.video_url}
              autoPlay
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover rounded-[20px] md:rounded-[40px] z-10"
              style={{
                opacity: isTransitioning ? 0 : 1,
                transition: "opacity 0.6s ease-in-out",
              }}
            />

            {/* Next video (fades in during transition) */}
            {nextIndex !== null && (
              <video
                ref={nextRef}
                key={`next-${videoChannelVideos[nextIndex].id}`}
                src={videoChannelVideos[nextIndex].video_url}
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover rounded-[20px] md:rounded-[40px] z-0"
                style={{
                  opacity: isTransitioning ? 1 : 0,
                  transition: "opacity 0.6s ease-in-out",
                }}
              />
            )}
          </div>
          {data?.sub_title && (
            <p className="text-center text-lg md:text-xl text-secondary-black mt-4 max-w-[900px] mx-auto">
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
