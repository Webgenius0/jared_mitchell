import React from "react";
import { AiOutlineLike } from "react-icons/ai";
import { SiFirebase } from "react-icons/si";
import { GoHeart } from "react-icons/go";

export default function WinnersDetails() {
  return (
    <section className="py-20">
      <div className="container mx-auto">
        <div className="flex gap-6">
          <div className="w-3/4 ">
            <div className="bg-[#F5F5F7] rounded-xl p-6 flex flex-col gap-8">
              <h2 className="text-5xl font-medium">About</h2>
              <p className="text-2xl font-normal text-[#364153]">
                A cozy neighborhood café combining specialty coffee with a
                curated flower shop. We source beans from fair-trade roasters
                and partner with local flower farms to bring beauty and warmth
                to our community.
              </p>
              <div className="">
                <h4 className="text-2xl font-normal text-[#1D1D1F]">
                  Website:
                </h4>
                <h5 className="text-2xl font-normal text-[#364153] pt-3">
                  www.abc.com
                </h5>
              </div>
              <div className="flex gap-5 items-center">
                <div className="">
                  <h4 className="text-2xl font-normal text-[#1D1D1F]">
                    Website:
                  </h4>
                  <h5 className="text-2xl font-normal text-[#364153] pt-3">
                    www.abc.com
                  </h5>
                </div>
                <div className="">
                  <h4 className="text-2xl font-normal text-[#1D1D1F]">
                    Facebook
                  </h4>
                  <h5 className="text-2xl font-normal text-[#364153] pt-3">
                    facebook@abc.com
                  </h5>
                </div>
                <div className="">
                  <h4 className="text-2xl font-normal text-[#1D1D1F]">
                    instagram
                  </h4>
                  <h5 className="text-2xl font-normal text-[#364153] pt-3">
                    instagram@abc.com
                  </h5>
                </div>
              </div>
            </div>
            <div className="border border-gray-200 p-6 rounded-xl mt-5">
              <h2 className="text-5xl font-medium">Vote Breakdown</h2>
              <div className="grid grid-cols-2 gap-5 mt-8">
                <div className="p-3 bg-[#EFF6FF] border border-gray-200 rounded-xl">
                  <h6 className="text-xl font-normal text-[#364153]">
                    Claps (×1)
                  </h6>
                  <h4 className="text-2xl font-normal text-[#1D1D1F]">342</h4>
                </div>
                <div className="p-3 bg-[#FAF5FF] border border-gray-200 rounded-xl">
                  <h6 className="text-xl font-normal text-[#364153]">
                    Saves (×3)
                  </h6>
                  <h4 className="text-2xl font-normal text-[#1D1D1F]">89</h4>
                </div>
                <div className="p-3 bg-[#FFFCF5] border border-gray-200 rounded-xl">
                  <h6 className="text-xl font-normal text-[#364153]">
                    Shares (×5)
                  </h6>
                  <h4 className="text-2xl font-normal text-[#1D1D1F]">54</h4>
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/4 bg-[#F5F5F7] rounded-xl p-6 h-fit">
            <h4 className="text-2xl font-semibold text-[#1D1D1F]">
              Support This Business
            </h4>
            <div className="my-4 bg-[#1977DD] p-6 w-full rounded-xl">
              <p className="text-white font-normal text-balance text-center">
                Total Points
              </p>
              <h3 className="text-2xl font-normal text-white text-center">
                1,004
              </h3>
            </div>
            <div className="flex gap-5">
              <div className="border border-gray-200 w-full p-3 rounded-xl flex flex-col gap-2 items-center bg-white">
                <AiOutlineLike />
                <p className="text-base font-normal text-[#364153]">Clap</p>
                <p className="text-base font-normal text-[#364153]">1</p>
              </div>
              <div className="border border-gray-200 w-full p-3 rounded-xl flex flex-col gap-2 items-center bg-white">
                <GoHeart />
                <p className="text-base font-normal text-[#364153]">Love</p>
                <p className="text-base font-normal text-[#364153]">1</p>
              </div>
              <div className="border border-gray-200 w-full p-3 rounded-xl flex flex-col gap-2 items-center bg-white">
                <SiFirebase />
                <p className="text-base font-normal text-[#364153]">Fire</p>
                <p className="text-base font-normal text-[#364153]">5</p>
              </div>
            </div>
            <div className="mt-8 p-5 bg-white rounded-xl">
              <div className="">
                <h3 className="text-lg font-bold text-[#364153]">
                  Voting Rules:
                </h3>
                <ul className="flex flex-col gap-1 mt-3">
                  <li className="font-normal text-base text-[#364153]">
                    • 1 free clap per business per quarter
                  </li>
                  <li className="font-normal text-base text-[#364153]">
                    • Save counts once (3 votes)
                  </li>
                  <li className="font-normal text-base text-[#364153]">
                    • Share via OSI buttons (5 votes)
                  </li>
                  <li className="font-normal text-base text-[#364153]">
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
