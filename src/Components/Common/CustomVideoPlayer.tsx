"use client";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { MuteIcon, PlayIcon, SoundIcon } from "../Svg/SvgContainer";
import { cn } from "@/lib/utils";

export interface CustomVideoPlayerHandle {
  videoEl: HTMLVideoElement | null;
}

export default forwardRef<CustomVideoPlayerHandle, {
  videoSrc: string;
  className?: string;
  loop?: boolean;
  autoPlay?: boolean;
  onEnded?: () => void;
  /** When true the video is muted regardless of the mute toggle state (used during transitions). */
  forceMuted?: boolean;
  /** Inline styles on the outer wrapper div. */
  style?: React.CSSProperties;
  /** Additional inline styles forwarded to the <video>. */
  videoStyle?: React.CSSProperties;
  /** Additional class on the <video> element. */
  videoClassName?: string;
}>(function CustomVideoPlayer(
  {
    videoSrc,
    className,
    loop = false,
    autoPlay = false,
    onEnded,
    forceMuted = false,
    style,
    videoStyle,
    videoClassName,
  },
  ref,
) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(true);

  // Expose the underlying <video> element to parent via ref
  useImperativeHandle(ref, () => ({
    videoEl: videoRef.current,
  }));

  // Sync isPlaying when autoPlay starts
  useEffect(() => {
    if (autoPlay && videoRef.current) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay, videoSrc]);

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

  const handleEnded = () => {
    setIsPlaying(false);
    onEnded?.();
  };

  return (
    <div
      className={cn(
        // `isolate` forces its own stacking context so a playing <video>'s
        // composited layer can never escape this wrapper and block pointer
        // events on content below (Chromium quirk with overflow-hidden +
        // border-radius ancestors).
        "relative w-full h-full overflow-hidden isolate 2xl:px-5 3xl:px-5",
        className,
      )}
      style={style}
    >
      <video
        ref={videoRef}
        src={videoSrc}
        muted={forceMuted || isMuted}
        playsInline
        loop={loop}
        autoPlay={autoPlay}
        className={cn("w-full h-full object-cover", videoClassName)}
        style={videoStyle}
        onClick={togglePlay}
        onEnded={handleEnded}
      />

      {/* Overlay (only when paused and not force-muted during transition) */}
      {!isPlaying && !forceMuted && (
        <div
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/20 cursor-pointer z-10"
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
});
