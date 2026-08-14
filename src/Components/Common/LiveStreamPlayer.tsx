"use client";
import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { FaEye } from "react-icons/fa";
import { axiosPublic } from "@/Hooks/useAxiosPublic";
import { MuteIcon, SoundIcon } from "../Svg/SvgContainer";
import { cn } from "@/lib/utils";

// How often a viewer reports in while the stream is live.
const HEARTBEAT_INTERVAL_MS = 15_000;

// Plays an HLS (m3u8) live stream — hls.js on Chrome/Firefox/Edge,
// native HLS on Safari. The stream auto-plays muted (browser autoplay
// rules) with a sound toggle and a LIVE badge.
//
// While mounted it also sends a viewer heartbeat to
// POST /v1/live-streams/:id/heartbeat every 15s so the backend can count
// live viewers; the returned viewer_count is shown on the player.
export default function LiveStreamPlayer({
  src,
  streamId,
  className,
}: {
  src: string;
  streamId: number;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [viewerCount, setViewerCount] = useState<number | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    let hls: Hls | null = null;

    const startPlayback = () => {
      video.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    };

    if (Hls.isSupported()) {
      hls = new Hls({ liveDurationInfinity: true });
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, startPlayback);
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Safari / iOS — native HLS
      video.src = src;
      startPlayback();
    }

    return () => {
      if (hls) hls.destroy();
    };
  }, [src]);

  // Viewer heartbeat — report in every 15s while the stream is open.
  // Skipped while the tab is hidden so background tabs don't inflate the count.
  useEffect(() => {
    if (!streamId) return;

    let cancelled = false;

    const sendHeartbeat = async () => {
      if (document.visibilityState === "hidden") return;
      try {
        const res = await axiosPublic.post(
          `/v1/live-streams/${streamId}/heartbeat`,
        );
        if (!cancelled && typeof res.data?.viewer_count === "number") {
          setViewerCount(res.data.viewer_count);
        }
      } catch {
        // Heartbeat failures must never break playback — stay silent.
      }
    };

    sendHeartbeat();
    const timer = window.setInterval(sendHeartbeat, HEARTBEAT_INTERVAL_MS);

    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") sendHeartbeat();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      cancelled = true;
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [streamId]);

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div
      className={cn(
        "relative w-full h-full overflow-hidden isolate",
        className,
      )}
    >
      <video
        ref={videoRef}
        muted={isMuted}
        playsInline
        autoPlay
        className="w-full h-full object-cover"
      />

      {/* LIVE badge */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 rounded-full bg-red-600 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-md">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
        </span>
        Live
      </div>

      {/* Viewer count (from heartbeat responses) */}
      {viewerCount != null && (
        <div className="absolute top-4 left-[5rem] z-10 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white shadow-md">
          <FaEye className="text-xs" />
          {viewerCount}
        </div>
      )}

      {/* Sound toggle */}
      <button
        onClick={toggleMute}
        aria-label={isMuted ? "Unmute" : "Mute"}
        className="absolute top-4 right-4 z-10 rounded-full bg-black/60 p-2 text-white hover:bg-black/80"
      >
        {isMuted ? <MuteIcon /> : <SoundIcon />}
      </button>

      {/* Offline/loading fallback overlay (only while nothing is playing) */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none">
          <p className="text-sm font-medium text-white/90">
            Starting live stream…
          </p>
        </div>
      )}
    </div>
  );
}
