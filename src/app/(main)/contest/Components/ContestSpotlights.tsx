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
    <section className="pt-8 md:pt-10 lg:pt-12 xl:pt-20">
      <div className="container mx-auto">
        <div className=" border border-black/15 bg-white shadow-[0_4px_20px_0_rgba(0,0,0,0.07)] py-3 sm:py-4 lg:py-5 xl:py-8 px-2.5 sm:px-3 lg:px-5">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-medium text-[#101828]">Spotlights</h3>
          <h4 className="text-[10px] sm:text-xs lg:text-sm font-normal text-[#1D1D1F] mt-0.5">
            OSI panel first involvement. Identify the strongest contenders for
            the final.
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 lg:gap-3 xl:gap-0 mt-3 sm:mt-4 lg:mt-5 xl:mt-8">
            <div className="flex gap-2 sm:gap-2.5 lg:gap-3 items-center">
              <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full bg-[#1977DD29] flex justify-center items-center shrink-0">
                <FiUsers className="size-4 sm:size-5 lg:size-6 text-blue-400" />
              </div>
              <div>
                <h5 className="text-[10px] sm:text-xs lg:text-sm font-normal text-[#364153]">
                  Participants
                </h5>
                <h6 className="text-xs sm:text-sm lg:text-base font-normal text-[#0F172B]">
                  {participants}
                </h6>
              </div>
            </div>
            <div className="flex gap-3 sm:gap-4 items-center">
              <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full bg-[#1977DD29] flex justify-center items-center shrink-0">
                <HiMiniArrowTrendingUp className="size-4 sm:size-5 lg:size-6 text-blue-400" />
              </div>
              <div>
                <h5 className="text-[10px] sm:text-xs lg:text-sm font-normal text-[#364153]">
                  Advancing
                </h5>
                <h6 className="text-xs sm:text-sm lg:text-base font-normal text-[#0F172B]">
                  {advancingLabel}
                </h6>
              </div>
            </div>
            <div className="flex gap-3 sm:gap-4 items-center">
              <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full bg-[#1977DD29] flex justify-center items-center shrink-0">
                <CiAlarmOn className="size-4 sm:size-5 lg:size-6 text-blue-400" />
              </div>
              <div>
                <h5 className="text-[10px] sm:text-xs lg:text-sm font-normal text-[#364153]">
                  Time Left
                </h5>
                <h6 className="text-xs sm:text-sm lg:text-base font-normal text-[#0F172B]">
                  {timeLeft || "—"}
                </h6>
              </div>
            </div>
            <div className="flex gap-3 sm:gap-4 items-center">
              <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full bg-[#1977DD29] flex justify-center items-center shrink-0">
                <SlBadge className="size-4 sm:size-5 lg:size-6 text-blue-400" />
              </div>
              <div>
                <h5 className="text-[10px] sm:text-xs lg:text-sm font-normal text-[#364153]">
                  Voting Weight
                </h5>
                <h6 className="text-xs sm:text-sm lg:text-base font-normal text-[#0F172B]">
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
