"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/Components/Common/Container";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";

import { getArtists, getBusinessSpotlights } from "@/Hooks/api/cms_api";
import { apiToggleArtistLike } from "@/Hooks/api/events_api";
import useAuth from "@/Hooks/useAuth";
import toast from "react-hot-toast";
import { getItem, setItem } from "@/lib/localStorage";

const ARTIST_ENGAGEMENT_KEY = "artist_engagements";

type EngagementValue = {
  is_liked: boolean;
  likes_count: number;
};

type EngagementMap = Record<number, EngagementValue>;

const loadPersistedEngagements = (): EngagementMap => {
  try {
    const raw = getItem(ARTIST_ENGAGEMENT_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as EngagementMap;
  } catch {
    return {};
  }
};

const persistEngagements = (map: EngagementMap) => {
  try {
    setItem(ARTIST_ENGAGEMENT_KEY, JSON.stringify(map));
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
  const { data: artistData, isLoading: artistLoading } = getArtists();
  const { data: businessData, isLoading: businessLoading } =
    getBusinessSpotlights();
  const { token } = useAuth();

  const [actionLoading, setActionLoading] = useState<Record<string, boolean>>(
    {}
  );
  const [localEngagements, setLocalEngagements] = useState<EngagementMap>(
    () => loadPersistedEngagements()
  );

  const artists = artistData?.data?.artists;
  const data = type === "artist" ? artists : businessData?.data;
  const isLoading = type === "artist" ? artistLoading : businessLoading;

  // Seed localEngagements from server data on initial load
  useEffect(() => {
    if (type === "artist" && artists?.length) {
      setLocalEngagements((prev) => {
        const updated = { ...prev };
        let changed = false;
        for (const a of artists) {
          if (a.id && a.is_liked !== undefined && !prev[a.id]) {
            updated[a.id] = {
              is_liked: a.is_liked,
              likes_count: a.likes_count ?? a.like_count ?? 0,
            };
            changed = true;
          }
        }
        if (changed) persistEngagements(updated);
        return changed ? updated : prev;
      });
    }
  }, [artists, type]);

  const getEngagement = useCallback(
    (item: any) => {
      const local = localEngagements[item.id];
      return {
        is_liked: local?.is_liked ?? item.is_liked ?? false,
        likes_count:
          local?.likes_count ?? item.likes_count ?? item.like_count ?? 0,
      };
    },
    [localEngagements]
  );

  const handleToggleLike = async (artistId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (!token) {
      window.location.href = "/auth/login";
      return;
    }

    const loadingKey = `like-${artistId}`;
    if (actionLoading[loadingKey]) return;
    setActionLoading((prev) => ({ ...prev, [loadingKey]: true }));

    const artistItem = artists?.find((a: any) => a.id === artistId);
    const prev = artistItem
      ? getEngagement(artistItem)
      : { is_liked: false, likes_count: 0 };

    // Optimistic update
    setLocalEngagements((prevState) => ({
      ...prevState,
      [artistId]: {
        is_liked: !prev.is_liked,
        likes_count: prev.is_liked
          ? prev.likes_count - 1
          : prev.likes_count + 1,
      },
    }));

    try {
      const res = await apiToggleArtistLike(artistId);
      if (res?.success) {
        setLocalEngagements((prevState) => ({
          ...prevState,
          [artistId]: {
            is_liked: res.data.is_liked,
            likes_count: res.data.is_liked
              ? prev.likes_count + 1
              : Math.max(0, prev.likes_count - 1),
          },
        }));
        if (res.message) toast.success(res.message);
      }
    } catch {
      // Revert on error
      setLocalEngagements((prevState) => ({
        ...prevState,
        [artistId]: {
          is_liked: prev.is_liked,
          likes_count: prev.likes_count,
        },
      }));
      toast.error("Failed to toggle like");
    } finally {
      setLocalEngagements((current) => {
        persistEngagements(current);
        return current;
      });
      setActionLoading((prev) => ({ ...prev, [loadingKey]: false }));
    }
  };

  const getDetailsHref = (item: any) => {
    const basePath =
      type === "artist" ? "/artist-details" : "/spotlight-business";
    return `${basePath}/${item.id}`;
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
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {data?.map((item: any, index: number) => {
              const image =
                type === "artist" ? item.avatar : item.images?.portrait_photo;
              const name = type === "artist" ? item.name : item.business_name;
              const description =
                type === "artist" ? item.biography : item.business_story;
              const engagement = getEngagement(item);

              return (
                <Link
                  key={item.id || index}
                  href={getDetailsHref(item)}
                  className="group relative block rounded-2xl overflow-hidden custom_shadow bg-white transition-shadow duration-300 hover:shadow-lg cursor-pointer"
                >
                  {/* Image */}
                  <div className="relative w-full aspect-[4/3]">
                    <Image
                      src={image}
                      alt={name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

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
                        <p className="text-sm text-white/85 line-clamp-2 mt-1 drop-shadow-sm">
                          {description}
                        </p>
                      </div>

                      {/* Like button - matching events like system */}
                      {type === "artist" && (
                        <button
                          type="button"
                          onClick={(e) => handleToggleLike(item.id, e)}
                          disabled={actionLoading[`like-${item.id}`]}
                          className="flex items-center gap-1 group shrink-0"
                          aria-label={engagement.is_liked ? "Unlike" : "Like"}
                        >
                          <div
                            className={`flex items-center justify-center size-6 aspect-square rounded-full bg-white custom_shadow custom_border transition-all duration-300 ${
                              engagement.is_liked
                                ? "!bg-red-50 !border-red-200"
                                : "group-hover:!bg-red-50 group-hover:!border-red-200"
                            }`}
                          >
                            {engagement.is_liked ? (
                              <AiFillLike className="size-[14px] text-red-500 transition-all duration-300 scale-110" />
                            ) : (
                              <AiOutlineLike className="size-[14px] text-primary-black transition-all duration-300 group-hover:scale-110" />
                            )}
                          </div>
                          <span className="text-xs font-medium text-white drop-shadow-sm">
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
