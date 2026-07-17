import Image from "next/image";
import React from "react";
import { AiOutlineLike } from "react-icons/ai";
import { GoHeart } from "react-icons/go";
import { SiFirebase } from "react-icons/si";

export default function SpotlightDetails() {
  return (
    <section className="py-10">
      <div className="container mx-auto">
        <div className="flex gap-8 ">
          <div className="flex gap-8 w-[70%]">
            <div className="w-25 h-25 rounded-full">
              <Image
                src={"/profile.png"}
                alt="profile"
                width={100}
                height={100}
              />
            </div>
            <div className="">
              <h3 className="text-3xl font-normal text-[#1D1D1F]">
                jared Mitchell
              </h3>
              <p className="text-xl font-normal text-[#364153] py-5">
                A cozy neighborhood café combining specialty coffee with a
                curated flower shop. We source beans from fair-trade roasters
                and partner with local flower farms to bring beauty and warmth
                to our community.
              </p>
              <div className="flex flex-col gap-5">
                <div className="flex gap-8">
                  <div className="rounded-[14.205px] border-[0.5px] border-black/15 bg-[#F9FAFB] p-4 w-full">
                    <h3 className="text-xl font-bold text-[#364153]">
                      Date of birth:
                    </h3>
                    <p className="text-base font-normal text-[#364153] pt-3">
                      12 Apr 1998
                    </p>
                  </div>
                  <div className="rounded-[14.205px] border-[0.5px] border-black/15 bg-[#F9FAFB] p-4 w-full">
                    <h3 className="text-xl font-bold text-[#364153]">
                      Category:{" "}
                    </h3>
                    <p className="text-base font-normal text-[#364153] pt-3">
                      Visual Artist{" "}
                    </p>
                  </div>
                </div>
                <div className="rounded-[14.205px] border-[0.5px] border-black/15 bg-[#F9FAFB] p-4 w-fit flex gap-10 items-center">
                  <div className="">
                    <h3 className="text-xl font-bold text-[#364153]">
                      Email:{" "}
                    </h3>
                    <p className="text-base font-normal text-[#364153] pt-3">
                      mitchel@gmail.com{" "}
                    </p>
                  </div>
                  <div className="">
                    <h3 className="text-xl font-bold text-[#364153]">
                      Phone:{" "}
                    </h3>
                    <p className="text-base font-normal text-[#364153] pt-3">
                      01299***10200{" "}
                    </p>
                  </div>
                  <div className="w-px h-12 bg-gray-200"></div>
                  <div className="">
                    <h3 className="text-xl font-bold text-[#364153]">City: </h3>
                    <p className="text-base font-normal text-[#364153] pt-3">
                      London{" "}
                    </p>
                  </div>

                  <div className="">
                    <h3 className="text-xl font-bold text-[#364153]">
                      State:{" "}
                    </h3>
                    <p className="text-base font-normal text-[#364153] pt-3">
                      New York{" "}
                    </p>
                  </div>
                </div>
                <div className="rounded-[14.205px] border-[0.5px] border-black/15 bg-[#F9FAFB] p-4 w-fit">
                  <h3 className="text-xl font-bold text-[#364153] pb-4">
                    Contact
                  </h3>
                  <div className=" flex gap-10 items-center">
                    <div className="">
                      <h3 className="text-xl font-bold text-[#364153]">
                        Website
                      </h3>
                      <p className="text-base font-normal text-[#364153] pt-3">
                        www.abc.com
                      </p>
                    </div>

                    <div className="">
                      <h3 className="text-xl font-bold text-[#364153]">
                        Facebook
                      </h3>
                      <p className="text-base font-normal text-[#364153] pt-3">
                        facebook@abc.com
                      </p>
                    </div>

                    <div className="">
                      <h3 className="text-xl font-bold text-[#364153]">
                        instagram
                      </h3>
                      <p className="text-base font-normal text-[#364153] pt-3">
                        instagram@abc.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[30%] rounded-[14.205px] border-[0.5px] border-black/15 bg-[#F9FAFB] p-6 flex flex-col gap-5">
            <h3 className="text-xl font-bold text-[#364153]">
              Support This Business
            </h3>
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
                <p className="flex gap-2 font-bold text-black">
                  Total Vote
                  <span className="text-base font-normal text-[#364153]">
                    1*12 = 12
                  </span>
                </p>
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
