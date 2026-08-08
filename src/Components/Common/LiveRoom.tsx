"use client";

import { useEffect, useRef } from "react";
import type { ZegoUIKitPrebuilt as ZegoUIKitPrebuiltType } from "@zegocloud/zego-uikit-prebuilt";

/* ------------------------------------------------------------------ */
/*  LiveRoom                                                           */
/* ------------------------------------------------------------------ */
// ZegoCloud's Live Streaming Kit wraps their Express Engine with a
// prebuilt UI (camera controls, viewer list, chat), so no WebRTC
// plumbing is needed here. The `kitToken` is fetched from the backend
// (or generated client-side as a dev fallback) and proves who is
// allowed into the room — "host" publishes camera + mic, "audience"
// watches and can react/chat.
//
// The SDK is imported dynamically inside the effect so it never ends up
// in the server bundle (it touches `window` at import time).

interface LiveRoomProps {
  roomId: string;
  userId: string;
  userName: string;
  role: "host" | "audience";
  kitToken: string;
}

export default function LiveRoom({
  roomId,
  userId,
  userName,
  role,
  kitToken,
}: LiveRoomProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let instance: ZegoUIKitPrebuiltType | null = null;
    let cancelled = false;

    (async () => {
      const { ZegoUIKitPrebuilt } = await import(
        "@zegocloud/zego-uikit-prebuilt"
      );

      if (cancelled || !containerRef.current) return;

      instance = ZegoUIKitPrebuilt.create(kitToken);

      instance.joinRoom({
        container: containerRef.current,
        scenario: {
          mode: ZegoUIKitPrebuilt.LiveStreaming,
          config: {
            role:
              role === "host"
                ? ZegoUIKitPrebuilt.Host
                : ZegoUIKitPrebuilt.Audience,
          },
        },
        sharedLinks: [
          {
            name: "Copy link",
            url: `${window.location.origin}/live/${roomId}?role=audience`,
          },
        ],
        showScreenSharingButton: role === "host",
        turnOnCameraWhenJoining: role === "host",
        turnOnMicrophoneWhenJoining: role === "host",
      });
    })();

    return () => {
      cancelled = true;
      instance?.destroy();
    };
  }, [roomId, kitToken, role]);

  return <div ref={containerRef} className="w-full h-full" />;
}
