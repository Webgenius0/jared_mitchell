"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Radio,
  Loader2,
  Copy,
  Check,
  Lock,
  AlertTriangle,
  LogIn,
  Eye,
} from "lucide-react";
import LiveRoom from "@/Components/Common/LiveRoom";
import useAuth from "@/Hooks/useAuth";
import { useGetLiveKitToken } from "@/Hooks/api/live_api";

type LiveRole = "host" | "audience";

/* ------------------------------------------------------------------ */
/*  Small building blocks                                              */
/* ------------------------------------------------------------------ */

function CopyLinkButton({ roomId }: { roomId: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/live/${roomId}?role=audience`,
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable — ignore.
    }
  };

  return (
    <button
      onClick={copy}
      className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/60 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:border-slate-500 hover:text-white"
    >
      {copied ? (
        <Check className="w-4 h-4 text-emerald-400" />
      ) : (
        <Copy className="w-4 h-4" />
      )}
      {copied ? "Link copied!" : "Copy audience link"}
    </button>
  );
}

function RoomBadge({ roomId, role }: { roomId: string; role: LiveRole }) {
  return (
    <div className="absolute top-5 left-5 flex items-center gap-2">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3 py-1.5 text-xs font-medium text-slate-300 backdrop-blur">
        <Radio className="w-3.5 h-3.5 text-blue-400" />
        Room {roomId}
      </span>
      <span
        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium backdrop-blur ${
          role === "host"
            ? "bg-red-500/10 border-red-500/30 text-red-400"
            : "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
        }`}
      >
        {role === "host" ? (
          <Radio className="w-3.5 h-3.5" />
        ) : (
          <Eye className="w-3.5 h-3.5" />
        )}
        {role === "host" ? "Hosting" : "Audience"}
      </span>
    </div>
  );
}

function LiveLoading() {
  return (
    <div className="min-h-screen bg-[#0B1120] text-white flex flex-col items-center justify-center gap-4 p-6">
      <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
        <Radio className="w-6 h-6 text-blue-400" />
      </div>
      <div className="flex items-center gap-2 text-sm text-slate-300">
        <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
        Preparing your live room…
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Live view                                                          */
/* ------------------------------------------------------------------ */

function LiveView() {
  const { roomId } = useParams<{ roomId: string }>();
  const searchParams = useSearchParams();
  const role: LiveRole = searchParams.get("role") === "host" ? "host" : "audience";

  const { user, loading: authLoading } = useAuth();

  const appId = Number(process.env.NEXT_PUBLIC_ZEGO_APP_ID || 0);
  const serverSecret = process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET || "";

  // 1) Real backend token — flip `enabled` to true once the Laravel
  //    endpoint (/v1/live/token) exists. The client-side fallback below
  //    keeps the frontend working until then.
  const tokenQuery = useGetLiveKitToken(roomId, role, false);
  // Laravel wraps payloads in { success, message, data } — accept both
  // shapes so the flow keeps working whichever the backend returns.
  const backendToken = tokenQuery.data?.data?.token ?? tokenQuery.data?.token;

  // 2) Dev fallback: Zego's client-side test token generator.
  //    Safe for development only — the ServerSecret becomes visible in
  //    the browser bundle, so remove this once the backend ships.
  const [devToken, setDevToken] = useState<string | null>(null);
  const [devError, setDevError] = useState<string | null>(null);

  const identity = useMemo(() => {
    const userId = user?.id
      ? String(user.id)
      : `guest_${Math.random().toString(36).slice(2, 10)}`;
    const userName = user?.profile?.name ?? user?.name ?? "Guest";
    return { userId, userName };
  }, [user]);

  useEffect(() => {
    if (backendToken) {
      setDevToken(null);
      setDevError(null);
      return;
    }
    // Backend query is enabled but still in flight — wait for it.
    if (tokenQuery.isLoading) return;

    if (!appId || !serverSecret) {
      setDevToken(null);
      setDevError(
        "Live streaming isn't configured yet. Add NEXT_PUBLIC_ZEGO_APP_ID and NEXT_PUBLIC_ZEGO_SERVER_SECRET to your .env file, or wait for the /v1/live/token backend endpoint.",
      );
      return;
    }

    let cancelled = false;
    (async () => {
      const { ZegoUIKitPrebuilt } = await import(
        "@zegocloud/zego-uikit-prebuilt"
      );
      if (cancelled) return;
      const token = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appId,
        serverSecret,
        roomId,
        identity.userId,
        identity.userName,
      );
      setDevToken(token);
      setDevError(null);
    })();

    return () => {
      cancelled = true;
    };
  }, [
    backendToken,
    tokenQuery.isLoading,
    appId,
    serverSecret,
    roomId,
    identity,
  ]);

  const kitToken = backendToken ?? devToken;

  if (authLoading || (!backendToken && tokenQuery.isLoading)) {
    return <LiveLoading />;
  }

  /* Host gate — only signed-in users can broadcast. */
  if (role === "host" && !user) {
    return (
      <div className="relative min-h-screen bg-[#0B1120] text-white flex items-center justify-center p-6">
        <RoomBadge roomId={roomId} role={role} />
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-8 text-center">
          <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-5">
            <Lock className="w-5 h-5 text-red-400" />
          </div>
          <h1 className="text-xl font-semibold">Sign in to go live</h1>
          <p className="text-sm text-slate-400 mt-2 leading-relaxed">
            Only signed-in users can broadcast. Audiences can join a live
            room without an account.
          </p>
          <div className="mt-6 space-y-3">
            <Link
              href={`/auth/login?redirect=${encodeURIComponent(
                `/live/${roomId}?role=host`,
              )}`}
              className="flex items-center justify-center gap-2 w-full rounded-lg bg-blue-600 hover:bg-blue-500 transition px-4 py-2.5 text-sm font-semibold"
            >
              <LogIn className="w-4 h-4" />
              Sign in to start broadcasting
            </Link>
            <Link
              href={`/live/${roomId}?role=audience`}
              className="flex items-center justify-center gap-2 w-full rounded-lg border border-slate-700 hover:border-slate-500 transition px-4 py-2.5 text-sm font-medium text-slate-300"
            >
              <Eye className="w-4 h-4" />
              Join as audience instead
            </Link>
          </div>
        </div>
      </div>
    );
  }

  /* Not configured / waiting for a token. */
  if (!kitToken) {
    return (
      <div className="relative min-h-screen bg-[#0B1120] text-white flex items-center justify-center p-6">
        <RoomBadge roomId={roomId} role={role} />
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-8 text-center">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto mb-5">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
          </div>
          <h1 className="text-xl font-semibold">Live room unavailable</h1>
          <p className="text-sm text-slate-400 mt-2 leading-relaxed">
            {devError}
          </p>
          <div className="mt-5 rounded-lg bg-black/30 border border-white/10 p-3 text-left font-mono text-xs text-slate-400 leading-relaxed">
            <p>NEXT_PUBLIC_ZEGO_APP_ID=…</p>
            <p>NEXT_PUBLIC_ZEGO_SERVER_SECRET=…</p>
          </div>
          <div className="mt-6">
            <CopyLinkButton roomId={roomId} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen bg-[#0B1120] overflow-hidden">
      <LiveRoom
        roomId={roomId}
        userId={identity.userId}
        userName={identity.userName}
        role={role}
        kitToken={kitToken}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page (Suspense wrapper for useSearchParams)                        */
/* ------------------------------------------------------------------ */

export default function LivePage() {
  return (
    <Suspense fallback={<LiveLoading />}>
      <LiveView />
    </Suspense>
  );
}
