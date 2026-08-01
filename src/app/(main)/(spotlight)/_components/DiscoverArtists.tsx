"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/Components/Common/Container";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { resolveMediaUrl } from "@/lib/utils";
import { getItem, setItem } from "@/lib/localStorage";
import toast from "react-hot-toast";

import {
  useGetNominatedSpotlights,
  useCurrentSpotlightWeek,
} from "@/Hooks/api/cms_api";
import { apiToggleSpotlightLike } from "@/Hooks/api/events_api";
import useAuth from "@/Hooks/useAuth";

const SPOTLIGHT_ENGAGEMENT_KEY = "spotlight_engagements";

type EngagementValue = {
  is_liked: boolean;
  likes_count: number;
};

type EngagementMap = Record<number, EngagementValue>;

const loadPersistedEngagements = (): EngagementMap => {
  try {
    const raw = getItem(SPOTLIGHT_ENGAGEMENT_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as EngagementMap;
  } catch {
    return {};
  }
};

const persistEngagements = (map: EngagementMap) => {
  try {
    setItem(SPOTLIGHT_ENGAGEMENT_KEY, JSON.stringify(map));
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

  const nominees = nominatedData?.data?.nominees || [];

  const [actionLoading, setActionLoading] = useState<Record<string, boolean>>(
    {}
  );
  const [localEngagements, setLocalEngagements] = useState<EngagementMap>(
    () => loadPersistedEngagements()
  );

  // Seed localEngagements from server data on initial load
  useEffect(() => {
    if (nominees?.length) {
      setLocalEngagements((prev) => {
        const updated = { ...prev };
        let changed = false;
        for (const n of nominees) {
          const spotlight = n.spotlight || {};
          const sid = spotlight.id;
          if (sid && !prev[sid]) {
            updated[sid] = {
              is_liked: spotlight.is_liked ?? false,
              likes_count: spotlight.likes_count ?? spotlight.like_count ?? 0,
            };
            changed = true;
          }
        }
        if (changed) persistEngagements(updated);
        return changed ? updated : prev;
      });
    }
  }, [nominees]);

  // Sync localEngagements to localStorage whenever it changes
  useEffect(() => {
    if (Object.keys(localEngagements).length > 0) {
      persistEngagements(localEngagements);
    }
  }, [localEngagements]);

  const getEngagement = useCallback(
    (item: any) => {
      const spotlight = item.spotlight || {};
      const sid = spotlight.id;
      const local = sid ? localEngagements[sid] : undefined;
      return {
        is_liked: local?.is_liked ?? spotlight.is_liked ?? false,
        likes_count:
          local?.likes_count ?? spotlight.likes_count ?? spotlight.like_count ?? 0,
      };
    },
    [localEngagements]
  );

  const getDetailsHref = (item: any) => {
    const basePath =
      type === "artist" ? "/spotlight-artist" : "/spotlight-business";
    // Use spotlight ID (the detail pages expect a spotlight/artist ID, not a nominee entry ID)
    return `${basePath}/${item.spotlight?.id || item.id}`;
  };

  const handleToggleLike = async (spotlightId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (!token) {
      window.location.href = "/auth/login";
      return;
    }

    const loadingKey = `like-${spotlightId}`;
    if (actionLoading[loadingKey]) return;
    setActionLoading((prev) => ({ ...prev, [loadingKey]: true }));

    const prevEngagement = localEngagements[spotlightId] || {
      is_liked: false,
      likes_count: 0,
    };

    // Optimistic update
    setLocalEngagements((prevState) => ({
      ...prevState,
      [spotlightId]: {
        is_liked: !prevEngagement.is_liked,
        likes_count: prevEngagement.is_liked
          ? Math.max(0, prevEngagement.likes_count - 1)
          : prevEngagement.likes_count + 1,
      },
    }));

    try {
      const res = await apiToggleSpotlightLike(type, spotlightId);
      if (res?.success && res?.message) toast.success(res.message);
      // Optimistic update already set the correct state — keep it
    } catch {
      // Revert on error
      setLocalEngagements((prevState) => ({
        ...prevState,
        [spotlightId]: {
          is_liked: prevEngagement.is_liked,
          likes_count: prevEngagement.likes_count,
        },
      }));
      toast.error("Failed to toggle like");
    } finally {
      setActionLoading((prev) => ({ ...prev, [loadingKey]: false }));
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
              const sid = spotlight.id;
              const location = spotlight.city && spotlight.state
                ? `${spotlight.city}, ${spotlight.state}`
                : "";
              const engagement = sid ? getEngagement(nominee) : { is_liked: false, likes_count: 0 };

              return (
                <Link
                  key={nominee.id || index}
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
                        <h4 className="text-lg text-white font-semibold drop-shadow-sm">
                          {name}
                        </h4>
                        {location && (
                          <p className="text-sm text-white/85 line-clamp-2 mt-1 drop-shadow-sm">
                            {location}
                          </p>
                        )}
                      </div>

                      {/* Like button */}
                      {sid && (
                        <button
                          type="button"
                          onClick={(e) => handleToggleLike(sid, e)}
                          disabled={actionLoading[`like-${sid}`]}
                          className="flex items-center gap-1 group/btn shrink-0"
                          aria-label={engagement.is_liked ? "Unlike" : "Like"}
                        >
                          <div
                            className={`flex items-center justify-center size-8 aspect-square rounded-full bg-white custom_shadow custom_border transition-all duration-300 ${
                              engagement.is_liked
                                ? "!bg-red-50 !border-red-200"
                                : "group-hover/btn:!bg-red-50 group-hover/btn:!border-red-200"
                            }`}
                          >
                            {engagement.is_liked ? (
                              <AiFillLike className="size-[16px] text-red-500 transition-all duration-300 scale-110" />
                            ) : (
                              <AiOutlineLike className="size-[16px] text-primary-black transition-all duration-300 group-hover/btn:scale-110" />
                            )}
                          </div>
                          <span className="text-xs font-semibold text-white drop-shadow-sm">
                            {engagement.likes_count.toLocaleString()}
                          </span>
                        </button>
                      )}
                    </div>
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
