"use client";

import React, { useMemo, useState } from "react";
import {
  BadgeCheck,
  CalendarDays,
  Crown,
  Loader2,
  Store,
  Trophy,
  Users,
} from "lucide-react";
import { getActiveSeasonRounds } from "@/Hooks/api/cms_api";
import { useMyContestRounds } from "@/Hooks/api/dashboard_api";
import { richTextToPlainText } from "@/lib/business";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface RoundBusiness {
  contestant_id: number;
  business_id: number;
  business_name: string;
  slug: string;
  owner_founder_name: string | null;
  story: string | null;
  total_points: number;
  avatar_url: string | null;
  media?: {
    primary_image?: string | null;
    images?: { url: string; mime_type?: string }[];
  } | null;
  current_status?: string;
  in_round?: boolean;
  points?: number | null;
  rank?: number | null;
  status?: string;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function formatDate(dateStr?: string | null): string {
  if (!dateStr) return "—";
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

function rankLabel(rank?: number | null): string {
  if (rank == null) return "—";
  const n = Number(rank);
  const mod100 = n % 100;
  const suffix =
    mod100 >= 11 && mod100 <= 13
      ? "th"
      : n % 10 === 1
        ? "st"
        : n % 10 === 2
          ? "nd"
          : n % 10 === 3
            ? "rd"
            : "th";
  return `${n}${suffix}`;
}

function statusLabel(status?: string): string {
  if (!status) return "—";
  return status
    .split("_")
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

const STATUS_STYLES: Record<string, string> = {
  competing: "bg-emerald-50 text-emerald-600",
  in_round: "bg-emerald-50 text-emerald-600",
  eliminated: "bg-red-50 text-red-500",
  not_in_round: "bg-slate-100 text-slate-500",
  winner: "bg-amber-50 text-amber-600",
  active: "bg-emerald-50 text-emerald-600",
};

const RANK_STYLES: Record<number, string> = {
  1: "bg-amber-50 text-amber-600 ring-1 ring-inset ring-amber-100",
  2: "bg-slate-100 text-slate-600 ring-1 ring-inset ring-slate-200",
  3: "bg-orange-50 text-orange-600 ring-1 ring-inset ring-orange-100",
};

/* ------------------------------------------------------------------ */
/*  Small building blocks                                              */
/* ------------------------------------------------------------------ */

function BusinessAvatar({
  url,
  name,
}: {
  url?: string | null;
  name: string;
}) {
  const [failed, setFailed] = useState(false);

  if (!url || failed) {
    return (
      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
        <Store className="w-5 h-5 text-blue-500" />
      </div>
    );
  }

  return (
    <img
      src={url}
      alt={name}
      onError={() => setFailed(true)}
      className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-100 shrink-0"
    />
  );
}

function RankBadge({ rank }: { rank?: number | null }) {
  const isPodium = rank != null && rank >= 1 && rank <= 3;
  return (
    <div
      className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold ${
        isPodium
          ? (RANK_STYLES[rank as number] ?? "bg-slate-50 text-slate-500")
          : "bg-slate-50 text-slate-500"
      }`}
      title={`Rank ${rankLabel(rank)}`}
    >
      {rank == null ? "—" : rank}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

// Pick the best thumbnail for a business: prefer the first non-video image
// (the API can serve an .mp4 as primary_image/avatar_url), then fall back
// to the primary image, then the avatar.
function resolveBusinessImage(b: RoundBusiness): string | null | undefined {
  const firstImage = (b.media?.images ?? []).find(
    i => !i.mime_type?.startsWith("video/"),
  );
  return firstImage?.url || b.media?.primary_image || b.avatar_url;
}

export default function CurrentRoundBusinessList({
  roundNumber,
}: {
  roundNumber?: number;
}) {
  const {
    data: seasonData,
    isLoading: isSeasonLoading,
    isError: isSeasonError,
    refetch: refetchSeason,
  } = getActiveSeasonRounds();

  const rounds = seasonData?.data?.rounds ?? [];

  // With `roundNumber` provided (a specific round page) resolve that round;
  // otherwise fall back to the current active round (round 1 / first round
  // when nothing is flagged active yet).
  const targetRound = useMemo(() => {
    if (roundNumber != null) {
      return rounds.find((r: any) => r.round_number === roundNumber) ?? null;
    }
    return (
      rounds.find((r: any) => r.is_active) ??
      rounds.find((r: any) => r.round_number === 1) ??
      rounds[0]
    );
  }, [rounds, roundNumber]);

  const roundId = targetRound?.id ?? null;
  const { data, isLoading, isError, refetch } = useMyContestRounds(roundId);

  // Prefer the live round payload from my-rounds, fall back to the season round.
  const round = data?.data?.round ?? targetRound;
  const businesses: RoundBusiness[] = data?.data?.businesses ?? [];

  const sortedBusinesses = useMemo(
    () =>
      [...businesses].sort((a, b) => {
        const ra = a.rank ?? Number.MAX_SAFE_INTEGER;
        const rb = b.rank ?? Number.MAX_SAFE_INTEGER;
        return ra - rb;
      }),
    [businesses],
  );

  if (isSeasonLoading) {
    return (
      <div className="bg-white border border-slate-100 shadow-[0_1px_2px_rgba(16,24,40,0.04)] flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
        <span className="ml-3 text-sm text-slate-500">Loading round...</span>
      </div>
    );
  }

  if (isSeasonError) {
    return (
      <div className="bg-white border border-slate-100 shadow-[0_1px_2px_rgba(16,24,40,0.04)] text-center py-16 px-6">
        <Trophy className="w-10 h-10 text-slate-300 mx-auto mb-3" />
        <p className="text-sm text-slate-500">Could not load this round.</p>
        <button
          type="button"
          onClick={() => refetchSeason()}
          className="mt-4 inline-flex items-center gap-1.5 bg-blue-500 text-white text-xs font-medium px-4 py-2 rounded-full hover:bg-blue-600 transition-colors"
        >
          <Loader2 className="w-3.5 h-3.5" />
          Retry
        </button>
      </div>
    );
  }

  if (!targetRound) {
    return (
      <div className="bg-white border border-slate-100 shadow-[0_1px_2px_rgba(16,24,40,0.04)] text-center py-20">
        <Trophy className="w-10 h-10 text-slate-300 mx-auto mb-3" />
        <p className="text-sm text-slate-500">
          {roundNumber != null
            ? `Round ${roundNumber} is not available yet.`
            : "No active round found."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Round header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-5 md:px-7 py-5 md:py-6 shadow-[0_4px_14px_rgba(37,99,235,0.18)]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/15 flex items-center justify-center shrink-0">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-blue-100">
                Round {round?.round_number ?? roundNumber ?? "—"}
              </p>
              <h2 className="text-lg md:text-xl font-bold text-white leading-snug">
                {round?.title ||
                  (roundNumber != null
                    ? `Round ${roundNumber}`
                    : "Current round")}
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-900 bg-emerald-300/90 rounded-full px-3 py-1">
              <BadgeCheck className="w-3.5 h-3.5" />
              {round?.is_active ? "Active" : "Inactive"}
            </span>
            {businesses.length > 0 && (
              <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-blue-50 bg-white/10 rounded-full px-3 py-1">
                <Users className="w-3.5 h-3.5" />
                {businesses.length} businesses
              </span>
            )}
          </div>
        </div>
        {(round?.starts_at || round?.ends_at) && (
          <div className="mt-3 flex items-center gap-1.5 text-xs md:text-sm text-blue-100">
            <CalendarDays className="w-3.5 h-3.5 shrink-0" />
            <span>
              {formatDate(round?.starts_at)} — {formatDate(round?.ends_at)}
            </span>
          </div>
        )}
      </div>

      {/* Businesses table */}
      <div className="bg-white border border-slate-100 shadow-[0_1px_2px_rgba(16,24,40,0.04)] overflow-hidden">
        <div className="px-5 md:px-6 py-4 border-b border-slate-100">
          <h3 className="text-sm md:text-base font-semibold text-slate-900">
            Businesses in this round
          </h3>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
            <span className="ml-3 text-sm text-slate-500">
              Loading businesses...
            </span>
          </div>
        ) : isError ? (
          <div className="text-center py-16 px-6">
            <p className="text-sm text-slate-500">
              Could not load the round businesses.
            </p>
            <button
              type="button"
              onClick={() => refetch()}
              className="mt-4 inline-flex items-center gap-1.5 bg-blue-500 text-white text-xs font-medium px-4 py-2 rounded-full hover:bg-blue-600 transition-colors"
            >
              <Loader2 className="w-3.5 h-3.5" />
              Retry
            </button>
          </div>
        ) : sortedBusinesses.length === 0 ? (
          <div className="text-center py-16 text-sm text-slate-400">
            No businesses in this round yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left text-xs md:text-sm font-medium text-slate-500 px-5 md:px-6 py-3 md:py-4 whitespace-nowrap">
                    Rank
                  </th>
                  <th className="text-left text-xs md:text-sm font-medium text-slate-500 px-5 md:px-6 py-3 md:py-4 whitespace-nowrap">
                    Business
                  </th>
                  <th className="text-left text-xs md:text-sm font-medium text-slate-500 px-5 md:px-6 py-3 md:py-4 whitespace-nowrap">
                    Owner / Founder
                  </th>
                  <th className="text-left text-xs md:text-sm font-medium text-slate-500 px-5 md:px-6 py-3 md:py-4 whitespace-nowrap">
                    Points
                  </th>
                  <th className="text-left text-xs md:text-sm font-medium text-slate-500 px-5 md:px-6 py-3 md:py-4 whitespace-nowrap">
                    Total points
                  </th>
                  <th className="text-left text-xs md:text-sm font-medium text-slate-500 px-5 md:px-6 py-3 md:py-4 whitespace-nowrap">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sortedBusinesses.map(b => (
                  <tr
                    key={b.contestant_id ?? b.business_id}
                    className="hover:bg-slate-50/60 transition-colors"
                  >
                    <td className="px-5 md:px-6 py-3.5 md:py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <RankBadge rank={b.rank} />
                        {b.rank === 1 && (
                          <Crown className="w-4 h-4 text-amber-500" />
                        )}
                      </div>
                    </td>
                    <td className="px-5 md:px-6 py-3.5 md:py-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <BusinessAvatar
                          url={resolveBusinessImage(b)}
                          name={b.business_name}
                        />
                        <div className="min-w-0">
                          <p className="text-sm md:text-base font-medium text-slate-800 truncate max-w-[220px]">
                            {b.business_name}
                          </p>
                          {b.story && (
                            <p className="text-xs text-slate-400 truncate max-w-[220px] mt-0.5">
                              {richTextToPlainText(b.story)}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 md:px-6 py-3.5 md:py-4 text-sm md:text-base text-slate-600 whitespace-nowrap">
                      {b.owner_founder_name || "—"}
                    </td>
                    <td className="px-5 md:px-6 py-3.5 md:py-4 text-sm md:text-base font-semibold text-slate-800 whitespace-nowrap">
                      {b.points ?? "—"}
                    </td>
                    <td className="px-5 md:px-6 py-3.5 md:py-4 text-sm md:text-base text-slate-600 whitespace-nowrap">
                      {b.total_points ?? "—"}
                    </td>
                    <td className="px-5 md:px-6 py-3.5 md:py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          STATUS_STYLES[(b.status || "").toLowerCase()] ??
                          "bg-slate-50 text-slate-500"
                        }`}
                      >
                        {statusLabel(b.status)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
