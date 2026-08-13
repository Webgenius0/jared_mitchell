"use client";

import Image from "next/image";
import React, { useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { FiInstagram, FiYoutube } from "react-icons/fi";
import { FaFacebook, FaTiktok, FaGlobe } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import useAuth from "@/Hooks/useAuth";
import { apiVoteNominee } from "@/Hooks/api/events_api";
import DOMPurify from "isomorphic-dompurify";

interface SpotlightDetailsProps {
  spotlight: any;
  type: "artist" | "business";
  isLoading: boolean;
  /** Explicit nominee id used for the vote API (falls back to spotlight.id) */
  nomineeId?: number;
}

function formatDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export default function SpotlightDetails({
  spotlight,
  type,
  isLoading,
  nomineeId: nomineeIdProp,
}: SpotlightDetailsProps) {
  const s = spotlight;

  const displayName =
    type === "artist"
      ? s?.artist_stage_name || s?.full_legal_name || ""
      : s?.business_name || s?.owner_name || "";

  const displayBio = type === "artist" ? s?.short_bio : s?.short_description;

  const displayAvatar = s?.media?.headshot || "/profile.png";
  const displayCategory = s?.category?.name || "N/A";
  const displayDateOfBirth = type === "artist" ? s?.date_of_birth : null;
  const displayEmail = s?.email;
  const displayPhone = s?.phone_number;
  const displayCity = s?.city;
  const displayState = s?.state;
  const displayWebsite = s?.website_portfolio_url || s?.website_url;
  const displayFacebook = s?.facebook_url;
  const displayInstagram = s?.instagram_handle;
  const displayTikTok = s?.tiktok_handle;
  const displayYoutube = s?.youtube_url;
  const totalPoints = s?.voting_summary?.total_votes_received ?? 0;
  const totalClaps =
    s?.voting_history?.[0]?.votes?.total ??
    s?.voting_summary?.total_votes_received ??
    0;

  const { token } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const hideSidebar = /^\/contest\/contestants\/[^/]+$/.test(pathname);
  const nomineeId =
    nomineeIdProp ?? s?.voting_history?.[0]?.nominee_id ?? s?.id;
  const [voting, setVoting] = useState(false);

  const handleClap = async () => {
    if (!token) {
      toast.error("Please login to vote");
      router.push("/auth/login");
      return;
    }
    if (voting) return;
    if (!nomineeId) return;

    setVoting(true);

    try {
      const res = await apiVoteNominee(nomineeId);
      if (res?.success) {
        if (res?.message) toast.success(res.message);
        // Re-fetch server data so the count reflects the authoritative server total
        router.refresh();
      } else {
        if (res?.message) toast.error(res.message);
      }
    } catch {
      toast.error("Failed to vote. Please try again.");
    } finally {
      setVoting(false);
    }
  };

  if (isLoading) {
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

  if (!s) {
    return (
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold text-[#1D1D1F]">
            {type === "artist" ? "Artist" : "Business"} not found
          </h2>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Main content */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-8 w-full lg:w-[70%]">
            <div className="w-24 h-24 md:w-28 md:h-28 lg:w-30 lg:h-30 rounded-full shrink-0 mx-auto md:mx-0 overflow-hidden">
              <Image
                src={displayAvatar}
                alt={displayName}
                width={100}
                height={100}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-normal text-[#1D1D1F] text-center md:text-left capitalize">
                {displayName}
              </h3>
              <p className="text-base md:text-lg lg:text-xl font-normal text-[#364153] py-4 md:py-5 capitalize">
                {/* {displayBio || "No description available."} */}
                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(displayBio) }} />
              </p>
              <div className="flex flex-col gap-4 md:gap-5">
                {/* Date of birth + Category */}
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8">
                  {type === "artist" && displayDateOfBirth && (
                    <div className="rounded-[14.205px] border-[0.5px] border-black/15 bg-[#F9FAFB] p-3 md:p-4 w-full">
                      <h3 className="text-base md:text-xl font-bold text-[#364153]">
                        Date of birth:
                      </h3>
                      <p className="text-sm md:text-base font-normal text-[#364153] pt-2 md:pt-3">
                        {formatDate(displayDateOfBirth)}
                      </p>
                    </div>
                  )}
                  <div className="rounded-[14.205px] border-[0.5px] border-black/15 bg-[#F9FAFB] p-3 md:p-4 w-full">
                    <h3 className="text-base md:text-xl font-bold text-[#364153]">
                      {type === "artist" ? "Category:" : "Category: "}
                    </h3>
                    <p className="text-sm md:text-base font-normal text-[#364153] pt-2 md:pt-3">
                      {displayCategory}
                    </p>
                  </div>
                </div>

                {/* Contact info row */}
                {(displayEmail ||
                  displayPhone ||
                  displayCity ||
                  displayState) && (
                  <div className="rounded-[14.205px] border-[0.5px] border-black/15 bg-[#F9FAFB] p-3 md:p-4 w-full">
                    <div className="flex flex-wrap gap-4 md:gap-6 lg:gap-10 items-start md:items-center">
                      {displayEmail && (
                        <div>
                          <h3 className="text-sm md:text-xl font-bold text-[#364153]">
                            Email:{" "}
                          </h3>
                          <p className="text-xs md:text-base font-normal text-[#364153] pt-1 md:pt-3 break-all">
                            {displayEmail}
                          </p>
                        </div>
                      )}
                      {displayPhone && (
                        <div>
                          <h3 className="text-sm md:text-xl font-bold text-[#364153]">
                            Phone:{" "}
                          </h3>
                          <p className="text-xs md:text-base font-normal text-[#364153] pt-1 md:pt-3">
                            {displayPhone}
                          </p>
                        </div>
                      )}
                      {displayEmail && displayPhone && (
                        <div className="hidden md:block w-px h-12 bg-gray-200"></div>
                      )}
                      {displayCity && (
                        <div>
                          <h3 className="text-sm md:text-xl font-bold text-[#364153]">
                            City:{" "}
                          </h3>
                          <p className="text-xs md:text-base font-normal text-[#364153] pt-1 md:pt-3">
                            {displayCity}
                          </p>
                        </div>
                      )}
                      {displayState && (
                        <div>
                          <h3 className="text-sm md:text-xl font-bold text-[#364153]">
                            State:{" "}
                          </h3>
                          <p className="text-xs md:text-base font-normal text-[#364153] pt-1 md:pt-3">
                            {displayState}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Social links */}
                {(displayWebsite ||
                  displayFacebook ||
                  displayInstagram ||
                  displayTikTok ||
                  displayYoutube) && (
                  <div className="rounded-[14.205px] border-[0.5px] border-black/15 bg-[#F9FAFB] p-3 md:p-4 w-full">
                    <h3 className="text-base md:text-xl font-bold text-[#364153] pb-3 md:pb-4">
                      Contact
                    </h3>
                    <div className="flex flex-wrap gap-4 md:gap-6 lg:gap-10 items-center">
                      {displayWebsite && (
                        <div>
                          <h3 className="text-sm md:text-xl font-bold text-[#364153] flex items-center gap-1.5">
                            <FaGlobe className="text-sm" /> Website
                          </h3>
                          <p className="text-xs md:text-base font-normal text-[#364153] pt-1 md:pt-3 break-all">
                            {displayWebsite}
                          </p>
                        </div>
                      )}
                      {displayFacebook && (
                        <div>
                          <h3 className="text-sm md:text-xl font-bold text-[#364153] flex items-center gap-1.5">
                            <FaFacebook className="text-sm" /> Facebook
                          </h3>
                          <p className="text-xs md:text-base font-normal text-[#364153] pt-1 md:pt-3 break-all">
                            {displayFacebook}
                          </p>
                        </div>
                      )}
                      {displayInstagram && (
                        <div>
                          <h3 className="text-sm md:text-xl font-bold text-[#364153] flex items-center gap-1.5">
                            <FiInstagram className="text-sm" /> Instagram
                          </h3>
                          <p className="text-xs md:text-base font-normal text-[#364153] pt-1 md:pt-3">
                            {displayInstagram}
                          </p>
                        </div>
                      )}
                      {displayTikTok && (
                        <div>
                          <h3 className="text-sm md:text-xl font-bold text-[#364153] flex items-center gap-1.5">
                            <FaTiktok className="text-sm" /> TikTok
                          </h3>
                          <p className="text-xs md:text-base font-normal text-[#364153] pt-1 md:pt-3">
                            {displayTikTok}
                          </p>
                        </div>
                      )}
                      {displayYoutube && (
                        <div>
                          <h3 className="text-sm md:text-xl font-bold text-[#364153] flex items-center gap-1.5">
                            <FiYoutube className="text-sm" /> YouTube
                          </h3>
                          <p className="text-xs md:text-base font-normal text-[#364153] pt-1 md:pt-3 break-all">
                            {displayYoutube}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          {!hideSidebar && (
            <div className="w-full lg:w-[30%] rounded-[14.205px] border-[0.5px] border-black/15 bg-[#F9FAFB] p-4 md:p-5 flex flex-col gap-4 md:gap-5">
              <h3 className="text-lg md:text-xl font-bold text-[#364153]">
                Support This {type === "artist" ? "Artist" : "Business"}
              </h3>
              {/* <div className="bg-[#1977DD] p-4 md:p-6 w-full rounded-xl">
                <p className="text-white font-normal text-balance text-center text-sm md:text-base">
                  Total Points
                </p>
                <h3 className="text-xl md:text-2xl font-normal text-white text-center">
                  {totalPoints.toLocaleString()}
                </h3>
              </div> */}
              <div className="flex gap-3 md:gap-5">
                <button
                  type="button"
                  onClick={handleClap}
                  disabled={voting}
                  className="border border-gray-200 w-full p-3 rounded-xl flex flex-col gap-2 items-center bg-white transition-colors hover:bg-blue-50 disabled:opacity-60 disabled:cursor-wait"
                >
                  <AiOutlineLike className="size-5 md:size-6" />
                  <p className="text-sm md:text-base font-normal text-[#364153]">
                    Clap
                  </p>
                  <p className="flex flex-col sm:flex-row gap-1 sm:gap-2 font-bold text-black text-xs md:text-sm text-center">
                    Total Vote
                    <span className="text-sm md:text-base font-normal text-[#364153]">
                      {voting ? "..." : totalClaps.toLocaleString()}
                    </span>
                  </p>
                </button>
              </div>
              <div className="p-4 md:p-5 bg-white rounded-xl">
                <div>
                  <h3 className="text-base md:text-lg font-bold text-[#364153]">
                    Voting Rules:
                  </h3>
                  <ul className="flex flex-col gap-1 mt-3">
                    <li className="font-normal text-sm md:text-base text-[#364153]">
                      • 1 free {type === "artist" ? "clap" : "vote"} per {type}{" "}
                      per quarter
                    </li>
                    <li className="font-normal text-sm md:text-base text-[#364153]">
                      • Support Votes apply instantly
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
