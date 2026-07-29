"use client";

import Image from "next/image";
import Link from "next/link";
import { getBusinessSpotlightDetails } from "@/Hooks/api/cms_api";
import { resolveMediaUrl } from "@/lib/utils";
import { BsArrowLeft } from "react-icons/bs";

export default function BusinessSpotlightDetailsContent({
  id,
}: {
  id: number;
}) {
  const { data: res, isLoading } = getBusinessSpotlightDetails(id);
  const spotlight = res?.data?.spotlight || res?.data?.business;

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

  if (!spotlight) {
    return (
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold text-[#1D1D1F]">
            Business not found
          </h2>
          <Link
            href="/spotlight-business"
            className="inline-flex items-center gap-2 mt-4 text-primary-blue hover:underline"
          >
            <BsArrowLeft /> Back to Businesses
          </Link>
        </div>
      </section>
    );
  }

  const logoUrl = resolveMediaUrl(spotlight.media?.portrait_photo || spotlight.media?.headshot) || "/profile.png";

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        {/* Back button */}
        <Link
          href="/spotlight-business"
          className="inline-flex items-center gap-2 text-[#364153] hover:text-primary-blue transition-colors mb-6"
        >
          <BsArrowLeft className="text-lg" />
          <span className="font-medium">Back to Businesses</span>
        </Link>

        {/* Main content - full width */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-8 w-full max-w-4xl">
          {/* Logo / Portrait */}
          <div className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full shrink-0 mx-auto md:mx-0 overflow-hidden border-2 border-gray-100">
            <Image
              src={logoUrl}
              alt={spotlight.business_name}
              width={128}
              height={128}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="flex-1">
            <h3 className="text-2xl md:text-3xl font-semibold text-[#1D1D1F] text-center md:text-left">
              {spotlight.business_name}
            </h3>

            {spotlight.owner_founder_name && (
              <p className="text-base md:text-lg text-primary-blue font-medium mt-1 text-center md:text-left">
                Owned by {spotlight.owner_founder_name}
              </p>
            )}

            <p className="text-base md:text-lg lg:text-xl font-normal text-[#364153] py-4 md:py-5">
              {spotlight.business_story || spotlight.products_services || "No description available."}
            </p>

            <div className="flex flex-col gap-4 md:gap-5">
              {/* Category */}
              <div className="rounded-[14.205px] border-[0.5px] border-black/15 bg-[#F9FAFB] p-3 md:p-4 w-full">
                <h3 className="text-base md:text-xl font-bold text-[#364153]">
                  Category
                </h3>
                <p className="text-sm md:text-base font-normal text-[#364153] pt-2 md:pt-3">
                  {spotlight.business_category || spotlight.category?.name || "N/A"}
                </p>
              </div>

              {/* Location */}
              {(spotlight.city || spotlight.state) && (
                <div className="rounded-[14.205px] border-[0.5px] border-black/15 bg-[#F9FAFB] p-3 md:p-4 w-full">
                  <h3 className="text-base md:text-xl font-bold text-[#364153]">
                    Location
                  </h3>
                  <p className="text-sm md:text-base font-normal text-[#364153] pt-2 md:pt-3">
                    {[spotlight.city, spotlight.state].filter(Boolean).join(", ")}
                  </p>
                </div>
              )}

              {/* Website */}
              {(spotlight.business_website || spotlight.website_url) && (
                <div className="rounded-[14.205px] border-[0.5px] border-black/15 bg-[#F9FAFB] p-3 md:p-4 w-full">
                  <h3 className="text-base md:text-xl font-bold text-[#364153]">
                    Website
                  </h3>
                  <a
                    href={spotlight.business_website || spotlight.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm md:text-base font-normal text-primary-blue hover:underline pt-2 md:pt-3 inline-block"
                  >
                    {spotlight.business_website || spotlight.website_url}
                  </a>
                </div>
              )}

              {/* Engagement stats */}
              <div className="rounded-[14.205px] border-[0.5px] border-black/15 bg-[#F9FAFB] p-3 md:p-4 w-full">
                <div className="flex flex-wrap gap-6 md:gap-10 items-center">
                  <div>
                    <h3 className="text-sm md:text-xl font-bold text-[#364153]">
                      Likes
                    </h3>
                    <p className="text-xs md:text-base font-normal text-[#364153] pt-1 md:pt-3">
                      {spotlight.interactions?.likes_count ?? 0}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm md:text-xl font-bold text-[#364153]">
                      Bookmarks
                    </h3>
                    <p className="text-xs md:text-base font-normal text-[#364153] pt-1 md:pt-3">
                      {spotlight.interactions?.bookmarks_count ?? 0}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm md:text-xl font-bold text-[#364153]">
                      Shares
                    </h3>
                    <p className="text-xs md:text-base font-normal text-[#364153] pt-1 md:pt-3">
                      {spotlight.interactions?.shares_count ?? 0}
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
