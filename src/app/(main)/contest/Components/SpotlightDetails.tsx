import Image from "next/image";
import React from "react";
import { AiOutlineLike } from "react-icons/ai";
import { GoHeart } from "react-icons/go";
import { SiFirebase } from "react-icons/si";

export default function SpotlightDetails() {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Main content */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-8 w-full lg:w-[70%]">
            <div className="w-24 h-24 md:w-28 md:h-28 lg:w-30 lg:h-30 rounded-full shrink-0 mx-auto md:mx-0">
              <Image
                src={"/profile.png"}
                alt="profile"
                width={100}
                height={100}
                className="h-full w-full shrink-0 rounded-full"
              />
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-normal text-[#1D1D1F] text-center md:text-left">
                jared Mitchell
              </h3>
              <p className="text-base md:text-lg lg:text-xl font-normal text-[#364153] py-4 md:py-5">
                A cozy neighborhood café combining specialty coffee with a
                curated flower shop. We source beans from fair-trade roasters
                and partner with local flower farms to bring beauty and warmth
                to our community.
              </p>
              <div className="flex flex-col gap-4 md:gap-5">
                {/* Date of birth + Category */}
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8">
                  <div className="rounded-[14.205px] border-[0.5px] border-black/15 bg-[#F9FAFB] p-3 md:p-4 w-full">
                    <h3 className="text-base md:text-xl font-bold text-[#364153]">
                      Date of birth:
                    </h3>
                    <p className="text-sm md:text-base font-normal text-[#364153] pt-2 md:pt-3">
                      12 Apr 1998
                    </p>
                  </div>
                  <div className="rounded-[14.205px] border-[0.5px] border-black/15 bg-[#F9FAFB] p-3 md:p-4 w-full">
                    <h3 className="text-base md:text-xl font-bold text-[#364153]">
                      Category:{" "}
                    </h3>
                    <p className="text-sm md:text-base font-normal text-[#364153] pt-2 md:pt-3">
                      Visual Artist{" "}
                    </p>
                  </div>
                </div>

                {/* Contact info row */}
                <div className="rounded-[14.205px] border-[0.5px] border-black/15 bg-[#F9FAFB] p-3 md:p-4 w-full">
                  <div className="flex flex-wrap gap-4 md:gap-6 lg:gap-10 items-start md:items-center">
                    <div>
                      <h3 className="text-sm md:text-xl font-bold text-[#364153]">
                        Email:{" "}
                      </h3>
                      <p className="text-xs md:text-base font-normal text-[#364153] pt-1 md:pt-3">
                        mitchel@gmail.com{" "}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm md:text-xl font-bold text-[#364153]">
                        Phone:{" "}
                      </h3>
                      <p className="text-xs md:text-base font-normal text-[#364153] pt-1 md:pt-3">
                        01299***10200{" "}
                      </p>
                    </div>
                    <div className="hidden md:block w-px h-12 bg-gray-200"></div>
                    <div>
                      <h3 className="text-sm md:text-xl font-bold text-[#364153]">City: </h3>
                      <p className="text-xs md:text-base font-normal text-[#364153] pt-1 md:pt-3">
                        London{" "}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm md:text-xl font-bold text-[#364153]">
                        State:{" "}
                      </h3>
                      <p className="text-xs md:text-base font-normal text-[#364153] pt-1 md:pt-3">
                        New York{" "}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social links */}
                <div className="rounded-[14.205px] border-[0.5px] border-black/15 bg-[#F9FAFB] p-3 md:p-4 w-full">
                  <h3 className="text-base md:text-xl font-bold text-[#364153] pb-3 md:pb-4">
                    Contact
                  </h3>
                  <div className="flex flex-wrap gap-4 md:gap-6 lg:gap-10 items-center">
                    <div>
                      <h3 className="text-sm md:text-xl font-bold text-[#364153]">
                        Website
                      </h3>
                      <p className="text-xs md:text-base font-normal text-[#364153] pt-1 md:pt-3">
                        www.abc.com
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm md:text-xl font-bold text-[#364153]">
                        Facebook
                      </h3>
                      <p className="text-xs md:text-base font-normal text-[#364153] pt-1 md:pt-3">
                        facebook@abc.com
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm md:text-xl font-bold text-[#364153]">
                        Instagram
                      </h3>
                      <p className="text-xs md:text-base font-normal text-[#364153] pt-1 md:pt-3">
                        instagram@abc.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-[30%] rounded-[14.205px] border-[0.5px] border-black/15 bg-[#F9FAFB] p-4 md:p-5 flex flex-col gap-4 md:gap-5">
            <h3 className="text-lg md:text-xl font-bold text-[#364153]">
              Support This Business
            </h3>
            <div className="bg-[#1977DD] p-4 md:p-6 w-full rounded-xl">
              <p className="text-white font-normal text-balance text-center text-sm md:text-base">
                Total Points
              </p>
              <h3 className="text-xl md:text-2xl font-normal text-white text-center">
                1,004
              </h3>
            </div>
            <div className="flex gap-3 md:gap-5">
              <div className="border border-gray-200 w-full p-3 rounded-xl flex flex-col gap-2 items-center bg-white">
                <AiOutlineLike className="size-5 md:size-6" />
                <p className="text-sm md:text-base font-normal text-[#364153]">Clap</p>
                <p className="flex flex-col sm:flex-row gap-1 sm:gap-2 font-bold text-black text-xs md:text-sm text-center">
                  Total Vote
                  <span className="text-sm md:text-base font-normal text-[#364153]">
                    1*12 = 12
                  </span>
                </p>
              </div>
            </div>
            <div className="p-4 md:p-5 bg-white rounded-xl">
              <div>
                <h3 className="text-base md:text-lg font-bold text-[#364153]">
                  Voting Rules:
                </h3>
                <ul className="flex flex-col gap-1 mt-3">
                  <li className="font-normal text-sm md:text-base text-[#364153]">
                    • 1 free clap per business per quarter
                  </li>
                  <li className="font-normal text-sm md:text-base text-[#364153]">
                    • Support Votes apply instantly
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
