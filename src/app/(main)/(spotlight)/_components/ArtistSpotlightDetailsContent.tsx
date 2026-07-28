"use client";

import Image from "next/image";
import Link from "next/link";
import { getArtistById } from "@/Hooks/api/cms_api";
import { BsArrowLeft } from "react-icons/bs";

export default function ArtistSpotlightDetailsContent({
  id,
}: {
  id: number;
}) {
  const { data: res, isLoading } = getArtistById(id);
  const artist = res?.data?.artist;

  if (isLoading) {
    return (
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="animate-pulse space-y-6">
            <div className="h-8 w-32 bg-gray-200 rounded" />
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-28 h-28 rounded-full bg-gray-200 shrink-0" />
              <div className="flex-1 space-y-4">
                <div className="h-8 w-64 bg-gray-200 rounded" />
                <div className="h-20 w-full bg-gray-200 rounded" />
                <div className="h-12 w-full bg-gray-200 rounded" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!artist) {
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

        {/* Main content - full width (no sidebar) */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-8 w-full max-w-4xl">
          {/* Avatar */}
          <div className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full shrink-0 mx-auto md:mx-0 overflow-hidden border-2 border-gray-100">
            <Image
              src={artist.avatar || "/profile.png"}
              alt={artist.name}
              width={128}
              height={128}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="flex-1">
            <h3 className="text-2xl md:text-3xl font-semibold text-[#1D1D1F] text-center md:text-left">
              {artist.name}
            </h3>

            {artist.tagline && (
              <p className="text-base md:text-lg text-primary-blue font-medium mt-1 text-center md:text-left">
                {artist.tagline}
              </p>
            )}

            <p className="text-base md:text-lg lg:text-xl font-normal text-[#364153] py-4 md:py-5">
              {artist.biography}
            </p>

            <div className="flex flex-col gap-4 md:gap-5">
              {/* Category */}
              <div className="rounded-[14.205px] border-[0.5px] border-black/15 bg-[#F9FAFB] p-3 md:p-4 w-full">
                <h3 className="text-base md:text-xl font-bold text-[#364153]">
                  Category
                </h3>
                <p className="text-sm md:text-base font-normal text-[#364153] pt-2 md:pt-3">
                  {artist.category?.name || "N/A"}
                </p>
              </div>

              {/* Username */}
              <div className="rounded-[14.205px] border-[0.5px] border-black/15 bg-[#F9FAFB] p-3 md:p-4 w-full">
                <h3 className="text-base md:text-xl font-bold text-[#364153]">
                  Username
                </h3>
                <p className="text-sm md:text-base font-normal text-[#364153] pt-2 md:pt-3">
                  @{artist.username}
                </p>
              </div>

              {/* Engagement stats */}
              <div className="rounded-[14.205px] border-[0.5px] border-black/15 bg-[#F9FAFB] p-3 md:p-4 w-full">
                <div className="flex flex-wrap gap-6 md:gap-10 items-center">
                  <div>
                    <h3 className="text-sm md:text-xl font-bold text-[#364153]">
                      Likes
                    </h3>
                    <p className="text-xs md:text-base font-normal text-[#364153] pt-1 md:pt-3">
                      {artist.likes_count ?? 0}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm md:text-xl font-bold text-[#364153]">
                      Bookmarks
                    </h3>
                    <p className="text-xs md:text-base font-normal text-[#364153] pt-1 md:pt-3">
                      {artist.bookmarks_count ?? 0}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm md:text-xl font-bold text-[#364153]">
                      Shares
                    </h3>
                    <p className="text-xs md:text-base font-normal text-[#364153] pt-1 md:pt-3">
                      {artist.shares_count ?? 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
