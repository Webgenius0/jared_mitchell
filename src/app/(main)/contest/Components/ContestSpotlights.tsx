import React from "react";
import { CiAlarmOn } from "react-icons/ci";
import { FiUsers } from "react-icons/fi";
import { SlBadge } from "react-icons/sl";
import { HiMiniArrowTrendingUp } from "react-icons/hi2";

export default function ContestSpotlights() {
  return (
    <section className="pt-20">
      <div className="container mx-auto">
        <div className="rounded-2xl border border-black/15 bg-white shadow-[0_4px_20px_0_rgba(0,0,0,0.07)] py-6 sm:py-8 px-4 sm:px-6">
          <h3 className="text-2xl sm:text-3xl font-medium text-[#101828]">Spotlights</h3>
          <h4 className="text-sm sm:text-base lg:text-lg font-normal text-[#1D1D1F] mt-1">
            OSI panel first involvement. Identify the strongest contenders for
            the final.
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 xl:gap-0 mt-6 sm:mt-8">
            <div className="flex gap-3 sm:gap-4 items-center">
              <div className="w-14 h-14 sm:w-17 sm:h-17 rounded-full bg-[#1977DD29] flex justify-center items-center shrink-0">
                <FiUsers className="size-5 sm:size-6 text-blue-400" />
              </div>
              <div>
                <h5 className="text-base sm:text-lg lg:text-xl font-normal text-[#364153]">
                  Participants
                </h5>
                <h6 className="text-base sm:text-lg lg:text-xl font-normal text-[#0F172B]">15</h6>
              </div>
            </div>
            <div className="flex gap-3 sm:gap-4 items-center">
              <div className="w-14 h-14 sm:w-17 sm:h-17 rounded-full bg-[#1977DD29] flex justify-center items-center shrink-0">
                <HiMiniArrowTrendingUp className="size-5 sm:size-6 text-blue-400" />
              </div>
              <div>
                <h5 className="text-base sm:text-lg lg:text-xl font-normal text-[#364153]">
                  Advancing
                </h5>
                <h6 className="text-base sm:text-lg lg:text-xl font-normal text-[#0F172B]">03 (20%)</h6>
              </div>
            </div>
            <div className="flex gap-3 sm:gap-4 items-center">
              <div className="w-14 h-14 sm:w-17 sm:h-17 rounded-full bg-[#1977DD29] flex justify-center items-center shrink-0">
                <CiAlarmOn className="size-5 sm:size-6 text-blue-400" />
              </div>
              <div>
                <h5 className="text-base sm:text-lg lg:text-xl font-normal text-[#364153]">
                  Time Left
                </h5>
                <h6 className="text-base sm:text-lg lg:text-xl font-normal text-[#0F172B]">
                  1 weeks 2 days
                </h6>
              </div>
            </div>
            <div className="flex gap-3 sm:gap-4 items-center">
              <div className="w-14 h-14 sm:w-17 sm:h-17 rounded-full bg-[#1977DD29] flex justify-center items-center shrink-0">
                <SlBadge className="size-5 sm:size-6 text-blue-400" />
              </div>
              <div>
                <h5 className="text-base sm:text-lg lg:text-xl font-normal text-[#364153]">
                  Voting Weight
                </h5>
                <h6 className="text-base sm:text-lg lg:text-xl font-normal text-[#0F172B]">
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
