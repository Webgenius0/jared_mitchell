"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  getArtistSpotlightDetails,
  getArtistById,
} from "@/Hooks/api/cms_api";
import { apiToggleArtistLike } from "@/Hooks/api/events_api";
import useAuth from "@/Hooks/useAuth";
import toast from "react-hot-toast";
import { BsArrowLeft } from "react-icons/bs";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { FiInstagram } from "react-icons/fi";
import { FaFacebook, FaTiktok, FaGlobe, FaYoutube } from "react-icons/fa";

export default function ArtistDetailsContent({ id }: { id: number }) {
  // Try spotlight details first (rich data), fall back to basic artist
  const { data: spotlightRes, isLoading: spotlightLoading } =
    getArtistSpotlightDetails(id);
  const { data: basicRes, isLoading: basicLoading } = getArtistById(id);

  const spotlight = spotlightRes?.data?.spotlight;
  // Handle both possible API structures: data.artist (like existing code uses) or data directly
  const basicArtist = basicRes?.data?.artist || basicRes?.data;
  const showNotFound = !spotlightLoading && !basicLoading && !spotlight && !basicArtist;

  const { token } = useAuth();
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likesCount, setLikesCount] = useState<number>(0);
  const [likeLoading, setLikeLoading] = useState(false);

  // ── Derive display data ──────────────────────────────────────────
  // Use spotlight data if available; otherwise map from basic artist
  const usingSpotlight = !!spotlight;

  const displayName = spotlight
    ? spotlight.artist_stage_name || spotlight.full_legal_name
    : basicArtist?.name || "";

  const displayBio = spotlight
    ? spotlight.short_bio
    : basicArtist?.biography || "";

  const displayAvatar = spotlight
    ? spotlight.media?.headshot
    : basicArtist?.avatar || "/profile.png";

  const displayCategory = spotlight
    ? spotlight.category?.name
    : basicArtist?.category?.name || "N/A";

  const displayDateOfBirth = spotlight?.date_of_birth || null;

  const interactions = spotlight?.interactions || {
    likes_count: basicArtist?.likes_count ?? 0,
    bookmarks_count: basicArtist?.bookmarks_count ?? 0,
    shares_count: basicArtist?.shares_count ?? 0,
  };

  const votingSummary = spotlight?.voting_summary || null;

  const socialLinks = spotlight
    ? [
        {
          label: "Website",
          value: spotlight.website_portfolio_url,
          icon: <FaGlobe className="text-sm md:text-base" />,
        },
        {
          label: "Facebook",
          value: spotlight.facebook_url,
          icon: <FaFacebook className="text-sm md:text-base" />,
        },
        {
          label: "Instagram",
          value: spotlight.instagram_handle,
          icon: <FiInstagram className="text-sm md:text-base" />,
        },
        {
          label: "TikTok",
          value: spotlight.tiktok_handle,
          icon: <FaTiktok className="text-sm md:text-base" />,
        },
        {
          label: "YouTube",
          value: spotlight.youtube_url,
          icon: <FaYoutube className="text-sm md:text-base" />,
        },
      ].filter((s) => s.value)
    : [];

  // Sync likes count from whichever source
  useEffect(() => {
    if (usingSpotlight) {
      setLikesCount(spotlight.interactions?.likes_count ?? 0);
    } else if (basicArtist) {
      setLikesCount(basicArtist.likes_count ?? 0);
    }
  }, [usingSpotlight, spotlight, basicArtist]);

  const handleToggleLike = async () => {
    if (!token) {
      window.location.href = "/auth/login";
      return;
    }
    if (likeLoading) return;
    setLikeLoading(true);

    const prevLiked = isLiked;
    const prevCount = likesCount;

    // Optimistic
    setIsLiked(!prevLiked);
    setLikesCount(prevLiked ? prevCount - 1 : prevCount + 1);

    try {
      const res = await apiToggleArtistLike(id);
      if (res?.success) {
        if (res.message) toast.success(res.message);
      }
    } catch {
      setIsLiked(prevLiked);
      setLikesCount(prevCount);
      toast.error("Failed to toggle like");
    } finally {
      setLikeLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  // ── Loading State ────────────────────────────────────────────────
  if (spotlightLoading || basicLoading) {
    return (
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="animate-pulse space-y-6">
            <div className="h-8 w-32 bg-gray-200 rounded" />
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
              <div className="w-full lg:w-[70%] flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-8">
                <div className="w-24 h-24 md:w-28 md:h-28 lg:w-30 lg:h-30 rounded-full bg-gray-200 shrink-0 mx-auto md:mx-0" />
                <div className="flex-1 space-y-4">
                  <div className="h-8 w-64 bg-gray-200 rounded mx-auto md:mx-0" />
                  <div className="h-20 w-full bg-gray-200 rounded" />
                  <div className="h-32 w-full bg-gray-200 rounded" />
                </div>
              </div>
              <div className="w-full lg:w-[30%] h-64 bg-gray-200 rounded-[14.205px]" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ── Not Found State ──────────────────────────────────────────────
  if (showNotFound) {
    return (
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold text-[#1D1D1F]">
            Artist not found
          </h2>
          <Link
            href="/spotlight-artist"
            className="inline-flex items-center gap-2 mt-4 text-primary-blue hover:underline"
          >
            <BsArrowLeft /> Back to Artists
          </Link>
        </div>
      </section>
    );
  }

  // ── Render ───────────────────────────────────────────────────────
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        {/* Back button */}
        <Link
          href="/spotlight-artist"
          className="inline-flex items-center gap-2 text-[#364153] hover:text-primary-blue transition-colors mb-6"
        >
          <BsArrowLeft className="text-lg" />
          <span className="font-medium">Back to Artists</span>
        </Link>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* ─── Main Content (70%) ─────────────────────────────────── */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-8 w-full lg:w-[70%]">
            {/* Avatar */}
            <div className="w-24 h-24 md:w-28 md:h-28 lg:w-30 lg:h-30 rounded-full shrink-0 mx-auto md:mx-0 overflow-hidden border-2 border-gray-100">
              <Image
                src={displayAvatar}
                alt={displayName}
                width={120}
                height={120}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex-1">
              <h3 className="text-2xl md:text-3xl font-normal text-[#1D1D1F] text-center md:text-left">
                {displayName}
              </h3>

              <p className="text-base md:text-lg lg:text-xl font-normal text-[#364153] py-4 md:py-5">
                {displayBio || "No biography available."}
              </p>

              <div className="flex flex-col gap-4 md:gap-5">
                {/* Date of birth + Category */}
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8">
                  {usingSpotlight && (
                    <div className="rounded-[14.205px] border-[0.5px] border-black/15 bg-[#F9FAFB] p-3 md:p-4 w-full">
                      <h3 className="text-base md:text-xl font-bold text-[#364153]">
                        Date of birth:
                      </h3>
                      <p className="text-sm md:text-base font-normal text-[#364153] pt-2 md:pt-3">
                        {displayDateOfBirth
                          ? formatDate(displayDateOfBirth)
                          : "N/A"}
                      </p>
                    </div>
                  )}
                  <div className="rounded-[14.205px] border-[0.5px] border-black/15 bg-[#F9FAFB] p-3 md:p-4 w-full">
                    <h3 className="text-base md:text-xl font-bold text-[#364153]">
                      {usingSpotlight ? "Category:" : "Category"}
                    </h3>
                    <p className="text-sm md:text-base font-normal text-[#364153] pt-2 md:pt-3">
                      {displayCategory}
                    </p>
                  </div>
                </div>

                {/* Contact info row (spotlight only) */}
                {usingSpotlight && (
                  <>
                    {(spotlight.email ||
                      spotlight.phone_number ||
                      spotlight.city ||
                      spotlight.state) && (
                      <div className="rounded-[14.205px] border-[0.5px] border-black/15 bg-[#F9FAFB] p-3 md:p-4 w-full">
                        <div className="flex flex-wrap gap-4 md:gap-6 lg:gap-10 items-start md:items-center">
                          {spotlight.email && (
                            <div>
                              <h3 className="text-sm md:text-xl font-bold text-[#364153]">
                                Email:
                              </h3>
                              <p className="text-xs md:text-base font-normal text-[#364153] pt-1 md:pt-3 break-all">
                                {spotlight.email}
                              </p>
                            </div>
                          )}
                          {spotlight.phone_number && (
                            <div>
                              <h3 className="text-sm md:text-xl font-bold text-[#364153]">
                                Phone:
                              </h3>
                              <p className="text-xs md:text-base font-normal text-[#364153] pt-1 md:pt-3">
                                {spotlight.phone_number}
                              </p>
                            </div>
                          )}
                          {spotlight.email && spotlight.phone_number && (
                            <div className="hidden md:block w-px h-12 bg-gray-200" />
                          )}
                          {spotlight.city && (
                            <div>
                              <h3 className="text-sm md:text-xl font-bold text-[#364153]">
                                City:
                              </h3>
                              <p className="text-xs md:text-base font-normal text-[#364153] pt-1 md:pt-3">
                                {spotlight.city}
                              </p>
                            </div>
                          )}
                          {spotlight.state && (
                            <div>
                              <h3 className="text-sm md:text-xl font-bold text-[#364153]">
                                State:
                              </h3>
                              <p className="text-xs md:text-base font-normal text-[#364153] pt-1 md:pt-3">
                                {spotlight.state}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Social links (spotlight only) */}
                    {socialLinks.length > 0 && (
                      <div className="rounded-[14.205px] border-[0.5px] border-black/15 bg-[#F9FAFB] p-3 md:p-4 w-full">
                        <h3 className="text-base md:text-xl font-bold text-[#364153] pb-3 md:pb-4">
                          Contact
                        </h3>
                        <div className="flex flex-wrap gap-4 md:gap-6 lg:gap-10 items-center">
                          {socialLinks.map((link) => (
                            <div key={link.label}>
                              <h3 className="text-sm md:text-xl font-bold text-[#364153] flex items-center gap-1.5">
                                {link.icon} {link.label}
                              </h3>
                              <p className="text-xs md:text-base font-normal text-[#364153] pt-1 md:pt-3 break-all">
                                {link.value}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Voting summary (spotlight only) */}
                    {votingSummary &&
                      (votingSummary.total_weeks_nominated > 0 ||
                        votingSummary.total_wins > 0) && (
                        <div className="rounded-[14.205px] border-[0.5px] border-black/15 bg-[#F9FAFB] p-3 md:p-4 w-full">
                          <h3 className="text-base md:text-xl font-bold text-[#364153] pb-3 md:pb-4">
                            Spotlight Performance
                          </h3>
                          <div className="flex flex-wrap gap-4 md:gap-6 lg:gap-10 items-center">
                            {votingSummary.total_weeks_nominated > 0 && (
                              <div>
                                <h3 className="text-sm md:text-xl font-bold text-[#364153]">
                                  Nominations
                                </h3>
                                <p className="text-xs md:text-base font-normal text-[#364153] pt-1 md:pt-3">
                                  {votingSummary.total_weeks_nominated}
                                </p>
                              </div>
                            )}
                            {votingSummary.total_wins > 0 && (
                              <div>
                                <h3 className="text-sm md:text-xl font-bold text-[#364153]">
                                  Wins
                                </h3>
                                <p className="text-xs md:text-base font-normal text-[#364153] pt-1 md:pt-3">
                                  {votingSummary.total_wins}
                                </p>
                              </div>
                            )}
                            {votingSummary.total_votes_received > 0 && (
                              <div>
                                <h3 className="text-sm md:text-xl font-bold text-[#364153]">
                                  Total Votes
                                </h3>
                                <p className="text-xs md:text-base font-normal text-[#364153] pt-1 md:pt-3">
                                  {votingSummary.total_votes_received.toLocaleString()}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                  </>
                )}

                {/* Engagement stats (always show) */}
                <div className="rounded-[14.205px] border-[0.5px] border-black/15 bg-[#F9FAFB] p-3 md:p-4 w-full">
                  <div className="flex flex-wrap gap-4 md:gap-6 lg:gap-10 items-center">
                    <div>
                      <h3 className="text-sm md:text-xl font-bold text-[#364153]">
                        Likes
                      </h3>
                      <p className="text-xs md:text-base font-normal text-[#364153] pt-1 md:pt-3">
                        {likesCount.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm md:text-xl font-bold text-[#364153]">
                        Bookmarks
                      </h3>
                      <p className="text-xs md:text-base font-normal text-[#364153] pt-1 md:pt-3">
                        {interactions.bookmarks_count?.toLocaleString() ?? 0}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm md:text-xl font-bold text-[#364153]">
                        Shares
                      </h3>
                      <p className="text-xs md:text-base font-normal text-[#364153] pt-1 md:pt-3">
                        {interactions.shares_count?.toLocaleString() ?? 0}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ─── Sidebar (30%) ────────────────────────────────────────── */}
          {/* <div className="w-full lg:w-[30%] rounded-[14.205px] border-[0.5px] border-black/15 bg-[#F9FAFB] p-4 md:p-5 flex flex-col gap-4 md:gap-5">
            <h3 className="text-lg md:text-xl font-bold text-[#364153]">
              Support This Artist
            </h3>

            <div className="bg-[#1977DD] p-4 md:p-6 w-full rounded-xl">
              <p className="text-white font-normal text-balance text-center text-sm md:text-base">
                Total Likes
              </p>
              <h3 className="text-xl md:text-2xl font-normal text-white text-center">
                {likesCount.toLocaleString()}
              </h3>
            </div>

            <div className="flex gap-3 md:gap-5">
              <button
                type="button"
                onClick={handleToggleLike}
                disabled={likeLoading}
                className="border border-gray-200 w-full p-3 rounded-xl flex flex-col gap-2 items-center bg-white hover:bg-red-50 transition-colors duration-200 disabled:opacity-60"
                aria-label={isLiked ? "Unlike" : "Like"}
              >
                {isLiked ? (
                  <AiFillLike className="size-5 md:size-6 text-red-500" />
                ) : (
                  <AiOutlineLike className="size-5 md:size-6 text-[#364153]" />
                )}
                <p className="text-sm md:text-base font-normal text-[#364153]">
                  {isLiked ? "Liked" : "Clap"}
                </p>
                <p className="text-xs md:text-sm font-bold text-black text-center">
                  Total Likes:{" "}
                  <span className="text-sm md:text-base font-normal text-[#364153]">
                    {likesCount.toLocaleString()}
                  </span>
                </p>
              </button>
            </div>

            <div className="p-4 md:p-5 bg-white rounded-xl">
              <h3 className="text-base md:text-lg font-bold text-[#364153]">
                Voting Rules:
              </h3>
              <ul className="flex flex-col gap-1 mt-3">
                <li className="font-normal text-sm md:text-base text-[#364153]">
                  • 1 free clap per artist per quarter
                </li>
                <li className="font-normal text-sm md:text-base text-[#364153]">
                  • Support Votes apply instantly
                </li>
                <li className="font-normal text-sm md:text-base text-[#364153]">
                  • Share to help your favorite artist win
                </li>
              </ul>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}
