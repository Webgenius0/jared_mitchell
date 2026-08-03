"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/Components/Common/Container";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { resolveMediaUrl } from "@/lib/utils";
import { getItem, setItem } from "@/lib/localStorage";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import {
  useGetNominatedSpotlights,
  useCurrentSpotlightWeek,
} from "@/Hooks/api/cms_api";
import { apiVoteNominee } from "@/Hooks/api/events_api";
import useAuth from "@/Hooks/useAuth";

const SPOTLIGHT_VOTE_KEY = "spotlight_votes";

type VoteValue = {
  voted: boolean;
};

type VoteMap = Record<number, VoteValue>;

const loadPersistedVotes = (): VoteMap => {
  try {
    const raw = getItem(SPOTLIGHT_VOTE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as VoteMap;
  } catch {
    return {};
  }
};

const persistVotes = (map: VoteMap) => {
  try {
    setItem(SPOTLIGHT_VOTE_KEY, JSON.stringify(map));
  } catch {
    // silently fail
  }
};

const DiscoverArtists = ({
  type = "artist",
  data: cmsData,
}: {
  type?: "artist" | "business";
  data?: any;
}) => {
  // Resolve the active spotlight week dynamically (falls back to 2 if unavailable)
  // The nominated query re-fetches automatically when weekId changes (cache key includes it).
  const { data: currentWeekData } = useCurrentSpotlightWeek();
  const weekId = currentWeekData?.data?.week?.id ?? 2;
  const { data: nominatedData, isLoading } = useGetNominatedSpotlights(
    weekId,
    type,
  );
  const { token } = useAuth();
  const queryClient = useQueryClient();

  const nominees = nominatedData?.data?.nominees || [];

  const [actionLoading, setActionLoading] = useState<Record<string, boolean>>(
    {},
  );
  const [localVotes, setLocalVotes] = useState<VoteMap>(() =>
    loadPersistedVotes(),
  );

  // Helper to extract vote count from a nominee (votes.total is at the nominee level)
  const getNomineeVoteCount = useCallback((nominee: any): number => {
    return (
      nominee.votes?.total ??
      nominee.spotlight?.voting_history?.[0]?.votes?.total ??
      nominee.spotlight?.voting_summary?.total_votes_received ??
      0
    );
  }, []);

  // Seed voted flags for nominees we haven't seen yet
  useEffect(() => {
    if (nominees?.length) {
      setLocalVotes(prev => {
        const updated = { ...prev };
        let changed = false;
        for (const n of nominees) {
          const nomineeId = n.id;
          if (nomineeId && !prev[nomineeId]) {
            updated[nomineeId] = { voted: false };
            changed = true;
          }
        }
        if (changed) persistVotes(updated);
        return changed ? updated : prev;
      });
    }
  }, [nominees]);

  // Sync localVotes to localStorage whenever it changes
  useEffect(() => {
    if (Object.keys(localVotes).length > 0) {
      persistVotes(localVotes);
    }
  }, [localVotes]);

  const getVoteData = useCallback(
    (item: any) => {
      const nomineeId = item.id;
      const local = nomineeId ? localVotes[nomineeId] : undefined;
      return {
        voted: local?.voted ?? false,
        // Vote count always reflects the server response (nominee.votes.total),
        // never the local/optimistic state.
        vote_count: getNomineeVoteCount(item),
      };
    },
    [localVotes, getNomineeVoteCount],
  );

  const getDetailsHref = (item: any) => {
    const basePath =
      type === "artist" ? "/spotlight-artist" : "/spotlight-business";
    // Use spotlight ID (the detail pages expect a spotlight/artist ID, not a nominee entry ID)
    return `${basePath}/${item.spotlight?.id || item.id}`;
  };

  const handleVote = async (nomineeId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (!token) {
      window.location.href = "/auth/login";
      return;
    }

    const loadingKey = `vote-${nomineeId}`;
    if (actionLoading[loadingKey]) return;
    setActionLoading(prev => ({ ...prev, [loadingKey]: true }));

    const prevVoted = localVotes[nomineeId]?.voted ?? false;

    // Optimistic update — mark as voted (vote count stays driven by server)
    setLocalVotes(prevState => ({
      ...prevState,
      [nomineeId]: { voted: !prevVoted },
    }));

    try {
      const res = await apiVoteNominee(nomineeId);
      if (res?.success) {
        if (res?.message) toast.success(res.message);
        // Refetch so the card shows the fresh server vote total
        queryClient.invalidateQueries({
          queryKey: ["nominated-spotlights", weekId, type],
        });
      } else {
        // API rejected — revert
        setLocalVotes(prevState => ({
          ...prevState,
          [nomineeId]: { voted: prevVoted },
        }));
        if (res?.message) toast.error(res.message);
      }
    } catch {
      // Revert on error
      setLocalVotes(prevState => ({
        ...prevState,
        [nomineeId]: { voted: prevVoted },
      }));
      toast.error("Failed to cast vote. Please try again.");
    } finally {
      setActionLoading(prev => ({ ...prev, [loadingKey]: false }));
    }
  };

  return (
    <section className="section">
      <Container>
        <h2 className="section_title">
          {cmsData?.title ||
            `Discover More ${type === "artist" ? "Artists" : "Businesses"}`}
        </h2>
        <p className="section_sub_title">
          {cmsData?.sub_title || (
            <>
              Meet the {type === "artist" ? "creatives" : "businesses"} shaping
              our neighborhoods.
              <br />
              From innovative startups to community anchors, these stories
              highlight the courage, creativity, and commitment behind every
              brand.
            </>
          )}
        </p>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={idx}
                className="h-[300px] bg-gray-100 animate-pulse rounded-2xl"
              />
            ))}
          </div>
        ) : nominees.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-dashed border-gray-200 bg-gray-50 py-16 px-6 text-center">
            <p className="text-4xl mb-4">🎨</p>
            <h4 className="text-xl font-semibold text-primary-black mb-2">
              No {type === "artist" ? "artists" : "businesses"} available yet
            </h4>
            <p className="text-secondary-black max-w-md mx-auto">
              There are no active{" "}
              {type === "artist" ? "artist spotlights" : "business spotlights"}{" "}
              to display right now. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {nominees.map((nominee: any, index: number) => {
              const spotlight = nominee.spotlight || {};
              const rawImage = spotlight.headshot || "";
              const image = resolveMediaUrl(rawImage);
              const name = spotlight.name || "";
              const location =
                spotlight.city && spotlight.state
                  ? `${spotlight.city}, ${spotlight.state}`
                  : "";
              const nomineeId = nominee.id;
              const voteData = nomineeId
                ? getVoteData(nominee)
                : { voted: false, vote_count: 0 };

              return (
                <Link
                  key={nomineeId || index}
                  href={getDetailsHref(nominee)}
                  className="group relative block rounded-2xl overflow-hidden custom_shadow bg-white transition-shadow duration-300 hover:shadow-lg cursor-pointer"
                >
                  {/* Image */}
                  <div className="relative w-full aspect-[4/3]">
                    {image ? (
                      <Image
                        src={image}
                        alt={name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                        <span className="text-slate-400 text-4xl font-bold">
                          {name.charAt(0) || "?"}
                        </span>
                      </div>
                    )}

                    {/* Overlay for text legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  </div>

                  {/* Text content */}
                  <div className="absolute inset-x-0 bottom-0 px-5 pb-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <h4 className="text-lg text-white font-semibold drop-shadow-sm capitalize">
                          {name}
                        </h4>
                        {location && (
                          <p className="text-sm text-white/85 line-clamp-2 mt-1 drop-shadow-sm">
                            {location}
                          </p>
                        )}
                      </div>

                      {/* Vote button */}
                      {nomineeId && (
                        <button
                          type="button"
                          onClick={e => handleVote(nomineeId, e)}
                          disabled={actionLoading[`vote-${nomineeId}`]}
                          className="flex items-center gap-1 group/btn shrink-0 mt-1"
                          aria-label="Vote"
                        >
                          <div
                            className={`flex items-center justify-center size-9 aspect-square rounded-full bg-white/90 backdrop-blur-sm custom_shadow custom_border transition-all duration-300 ${
                              voteData.voted
                                ? "!bg-blue-500 !border-blue-400"
                                : "group-hover/btn:!bg-blue-500 group-hover/btn:!border-blue-400"
                            }`}
                          >
                            {voteData.voted ? (
                              <AiFillLike className="size-[18px] text-white transition-all duration-300 scale-110" />
                            ) : (
                              <AiOutlineLike className="size-[18px] text-primary-black transition-all duration-300 group-hover/btn:!text-white group-hover/btn:scale-110" />
                            )}
                          </div>
                        </button>
                      )}
                    </div>

                    {/* Total votes badge — prominently displayed */}
                    {nomineeId && (
                      <div className="mt-2 flex items-center gap-2">
                        <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 px-3 py-1">
                          <AiFillLike className="size-3.5 text-white/90" />
                          <span className="text-sm font-bold text-white drop-shadow-sm">
                            {voteData.vote_count.toLocaleString()}
                          </span>
                          <span className="text-[10px] text-white/70 font-medium uppercase tracking-wider">
                            Votes
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </Container>
    </section>
  );
};

export default DiscoverArtists;
