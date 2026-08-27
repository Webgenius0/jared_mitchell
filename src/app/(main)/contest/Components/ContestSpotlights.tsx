import React from "react";
import { CiAlarmOn } from "react-icons/ci";
import { FiUsers } from "react-icons/fi";
import { SlBadge } from "react-icons/sl";
import { HiMiniArrowTrendingUp } from "react-icons/hi2";

interface ContestSpotlightsProps {
  /** Total contestants competing in the current spotlight week */
  participants: number;
  /** Contestants advancing to the next stage (winners of this week) */
  advancing: number;
  /** Advancing as a percentage of participants (null when there are none) */
  advancingPct: number | null;
  /** Human-readable time until voting closes, e.g. "1 week 2 days" */
  timeLeft: string | null;
}

export default function ContestSpotlights({
  participants,
  advancing,
  advancingPct,
  timeLeft,
}: ContestSpotlightsProps) {
  const advancingLabel =
    advancingPct != null
      ? `${String(advancing).padStart(2, "0")} (${advancingPct}%)`
      : String(advancing).padStart(2, "0");

  return (
    <section className="pt-10 md:pt-14 lg:pt-16 xl:pt-20">
      <div className="container mx-auto">
        <div className="rounded-xl lg:rounded-2xl border border-black/15 bg-white shadow-[0_4px_20px_0_rgba(0,0,0,0.07)] py-4 sm:py-5 lg:py-6 xl:py-8 px-3 sm:px-4 lg:px-6">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-medium text-[#101828]">Spotlights</h3>
          <h4 className="text-xs sm:text-sm lg:text-base font-normal text-[#1D1D1F] mt-1">
            OSI panel first involvement. Identify the strongest contenders for
            the final.
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 xl:gap-0 mt-4 sm:mt-5 lg:mt-6 xl:mt-8">
            <div className="flex gap-2.5 sm:gap-3 lg:gap-4 items-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full bg-[#1977DD29] flex justify-center items-center shrink-0">
                <FiUsers className="size-4 sm:size-5 lg:size-6 text-blue-400" />
              </div>
              <div>
                <h5 className="text-xs sm:text-sm lg:text-base font-normal text-[#364153]">
                  Participants
                </h5>
                <h6 className="text-sm sm:text-base lg:text-lg font-normal text-[#0F172B]">
                  {participants}
                </h6>
              </div>
            </div>
            <div className="flex gap-3 sm:gap-4 items-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full bg-[#1977DD29] flex justify-center items-center shrink-0">
                <HiMiniArrowTrendingUp className="size-4 sm:size-5 lg:size-6 text-blue-400" />
              </div>
              <div>
                <h5 className="text-xs sm:text-sm lg:text-base font-normal text-[#364153]">
                  Advancing
                </h5>
                <h6 className="text-sm sm:text-base lg:text-lg font-normal text-[#0F172B]">
                  {advancingLabel}
                </h6>
              </div>
            </div>
            <div className="flex gap-3 sm:gap-4 items-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full bg-[#1977DD29] flex justify-center items-center shrink-0">
                <CiAlarmOn className="size-4 sm:size-5 lg:size-6 text-blue-400" />
              </div>
              <div>
                <h5 className="text-xs sm:text-sm lg:text-base font-normal text-[#364153]">
                  Time Left
                </h5>
                <h6 className="text-sm sm:text-base lg:text-lg font-normal text-[#0F172B]">
                  {timeLeft || "—"}
                </h6>
              </div>
            </div>
            <div className="flex gap-3 sm:gap-4 items-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full bg-[#1977DD29] flex justify-center items-center shrink-0">
                <SlBadge className="size-4 sm:size-5 lg:size-6 text-blue-400" />
              </div>
              <div>
                <h5 className="text-xs sm:text-sm lg:text-base font-normal text-[#364153]">
                  Voting Weight
                </h5>
                <h6 className="text-sm sm:text-base lg:text-lg font-normal text-[#0F172B]">
                  50% Community
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
