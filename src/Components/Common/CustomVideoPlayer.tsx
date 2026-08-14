"use client";
import { useRef, useState } from "react";
import { MuteIcon, PlayIcon, SoundIcon } from "../Svg/SvgContainer";
import { cn } from "@/lib/utils";

export default function CustomVideoPlayer({
  videoSrc,
  className,
  loop = false,
}: {
  videoSrc: string;
  className?: string;
  loop?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div
      className={cn(
        // `isolate` forces its own stacking context so a playing <video>'s
        // composited layer can never escape this wrapper and block pointer
        // events on content below (Chromium quirk with overflow-hidden +
        // border-radius ancestors).
        "relative w-full h-full overflow-hidden isolate",
        className,
      )}
    >
      <video
        ref={videoRef}
        src={videoSrc}
        muted={isMuted}
        playsInline
        loop={loop}
        className="w-full h-full object-cover"
        onClick={togglePlay}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Overlay (only when paused) */}
      {!isPlaying && (
        <div
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/20 cursor-pointer"
        >
          <PlayIcon />
        </div>
      )}

      {/* Sound toggle */}
      <button
        onClick={toggleMute}
        className="absolute top-4 right-4 z-10 rounded-full bg-black/60 p-2 text-white hover:bg-black/80"
      >
        {isMuted ? <MuteIcon /> : <SoundIcon />}
      </button>
    </div>
  );
}
