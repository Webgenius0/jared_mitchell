import React from "react";
import { AiOutlineLike } from "react-icons/ai";
import { SiFirebase } from "react-icons/si";
import { GoHeart } from "react-icons/go";

interface WinnersDetailsProps {
  hideVotingSections?: boolean;
  contestant?: any;
}

// website_social_media can be a JSON string, a plain URL, or null — normalize it
const parseWebsiteSocial = (raw: string | null | undefined) => {
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return raw;
  }
};

export default function WinnersDetails({
  hideVotingSections,
  contestant,
}: WinnersDetailsProps) {
  const s = contestant;

  const parsedSocial = parseWebsiteSocial(s?.website_social_media);
  const website =
    (typeof parsedSocial === "object" && parsedSocial !== null
      ? parsedSocial?.website || parsedSocial?.social
      : parsedSocial) || "";

  const facebook =
    typeof parsedSocial === "object" && parsedSocial !== null
      ? parsedSocial?.facebook ||
        parsedSocial?.social?.facebook ||
        parsedSocial?.facebook_url
      : "";
  const instagram =
    typeof parsedSocial === "object" && parsedSocial !== null
      ? parsedSocial?.instagram ||
        parsedSocial?.social?.instagram ||
        parsedSocial?.instagram_url
      : "";

  const aboutText =
    s?.story ||
    "A cozy neighborhood café combining specialty coffee with a curated flower shop. We source beans from fair-trade roasters and partner with local flower farms to bring beauty and warmth to our community.";

  const totalPoints =
    s?.interactions?.total_points ?? s?.total_score ?? 1004;
  const claps = s?.interactions?.likes_count ?? 342;
  const saves = s?.interactions?.bookmarks_count ?? 89;
  const shares = s?.interactions?.shares_count ?? 54;

  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main content */}
          <div className="w-full lg:w-3/4">
            <div className="bg-[#F5F5F7] rounded-xl p-4 md:p-6 flex flex-col gap-5 md:gap-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium">About</h2>
              <p className="text-lg md:text-xl lg:text-2xl font-normal text-[#364153]">
                {aboutText}
              </p>
              {website && (
                <div>
                  <h4 className="text-lg md:text-xl lg:text-2xl font-normal text-[#1D1D1F]">
                    Website:
                  </h4>
                  <h5 className="text-lg md:text-xl lg:text-2xl font-normal text-[#364153] pt-2 md:pt-3 break-all">
                    {website}
                  </h5>
                </div>
              )}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 sm:items-center">
                {website && (
                  <div>
                    <h4 className="text-lg md:text-xl lg:text-2xl font-normal text-[#1D1D1F]">
                      Website:
                    </h4>
                    <h5 className="text-lg md:text-xl lg:text-2xl font-normal text-[#364153] pt-2 md:pt-3 break-all">
                      {website}
                    </h5>
                  </div>
                )}
                {facebook && (
                  <div>
                    <h4 className="text-lg md:text-xl lg:text-2xl font-normal text-[#1D1D1F]">
                      Facebook
                    </h4>
                    <h5 className="text-lg md:text-xl lg:text-2xl font-normal text-[#364153] pt-2 md:pt-3 break-all">
                      {facebook}
                    </h5>
                  </div>
                )}
                {instagram && (
                  <div>
                    <h4 className="text-lg md:text-xl lg:text-2xl font-normal text-[#1D1D1F]">
                      Instagram
                    </h4>
                    <h5 className="text-lg md:text-xl lg:text-2xl font-normal text-[#364153] pt-2 md:pt-3 break-all">
                      {instagram}
                    </h5>
                  </div>
                )}
              </div>
            </div>

            {!hideVotingSections && (
              <div className="border border-gray-200 p-4 md:p-6 rounded-xl mt-4 md:mt-5">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium">Vote Breakdown</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 mt-5 md:mt-8">
                  <div className="p-3 bg-[#EFF6FF] border border-gray-200 rounded-xl">
                    <h6 className="text-base md:text-xl font-normal text-[#364153]">
                      Claps (×1)
                    </h6>
                    <h4 className="text-xl md:text-2xl font-normal text-[#1D1D1F]">
                      {claps.toLocaleString()}
                    </h4>
                  </div>
                  <div className="p-3 bg-[#FAF5FF] border border-gray-200 rounded-xl">
                    <h6 className="text-base md:text-xl font-normal text-[#364153]">
                      Saves (×3)
                    </h6>
                    <h4 className="text-xl md:text-2xl font-normal text-[#1D1D1F]">
                      {saves.toLocaleString()}
                    </h4>
                  </div>
                  <div className="p-3 bg-[#FFFCF5] border border-gray-200 rounded-xl">
                    <h6 className="text-base md:text-xl font-normal text-[#364153]">
                      Shares (×5)
                    </h6>
                    <h4 className="text-xl md:text-2xl font-normal text-[#1D1D1F]">
                      {shares.toLocaleString()}
                    </h4>
                  </div>
                </div>
              </div>
            )}
          </div>

          {!hideVotingSections && (
            <div className="w-full lg:w-1/4 bg-[#F5F5F7] rounded-xl p-4 md:p-6 h-fit">
              <h4 className="text-xl md:text-2xl font-semibold text-[#1D1D1F]">
                Support This Business
              </h4>
              <div className="my-4 bg-[#1977DD] p-4 md:p-6 w-full rounded-xl">
                <p className="text-white font-normal text-balance text-center text-sm md:text-base">
                  Total Points
                </p>
                <h3 className="text-xl md:text-2xl font-normal text-white text-center">
                  {totalPoints.toLocaleString()}
                </h3>
              </div>
              <div className="flex gap-3 md:gap-5">
                <div className="border border-gray-200 w-full p-2.5 md:p-3 rounded-xl flex flex-col gap-2 items-center bg-white">
                  <AiOutlineLike className="size-4 md:size-5" />
                  <p className="text-xs md:text-base font-normal text-[#364153]">Clap</p>
                  <p className="text-xs md:text-base font-normal text-[#364153]">
                    {claps.toLocaleString()}
                  </p>
                </div>
                <div className="border border-gray-200 w-full p-2.5 md:p-3 rounded-xl flex flex-col gap-2 items-center bg-white">
                  <GoHeart className="size-4 md:size-5" />
                  <p className="text-xs md:text-base font-normal text-[#364153]">Love</p>
                  <p className="text-xs md:text-base font-normal text-[#364153]">
                    {saves.toLocaleString()}
                  </p>
                </div>
                <div className="border border-gray-200 w-full p-2.5 md:p-3 rounded-xl flex flex-col gap-2 items-center bg-white">
                  <SiFirebase className="size-4 md:size-5" />
                  <p className="text-xs md:text-base font-normal text-[#364153]">Fire</p>
                  <p className="text-xs md:text-base font-normal text-[#364153]">
                    {shares.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="mt-6 md:mt-8 p-4 md:p-5 bg-white rounded-xl">
                <div>
                  <h3 className="text-base md:text-lg font-bold text-[#364153]">
                    Voting Rules:
                  </h3>
                  <ul className="flex flex-col gap-1 mt-3">
                    <li className="font-normal text-sm md:text-base text-[#364153]">
                      • 1 free clap per business per quarter
                    </li>
                    <li className="font-normal text-sm md:text-base text-[#364153]">
                      • Save counts once (3 votes)
                    </li>
                    <li className="font-normal text-sm md:text-base text-[#364153]">
                      • Share via OSI buttons (5 votes)
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
