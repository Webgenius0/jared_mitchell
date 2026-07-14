import Image from "next/image";
import React from "react";
import { CiCircleCheck } from "react-icons/ci";
import { PiUser } from "react-icons/pi";

export default function AboutThisEvent() {
  return (
    <section className="py-10 xl:py-20">
      <div className="container mx-auto flex gap-6">
        <div className="w-3/4 p-8 rounded-[20px] bg-[#F5F5F7]">
          <div className="flex justify-between items-center">
            <h3 className="section_title">About This Event</h3>
            <div className="rounded-[30px] px-6 py-2 h-fit border-[0.5px] border-[#1977DD29] bg-[#1977DD1A] shadow-[0_4px_20px_0_rgba(0,0,0,0.07)] flex gap-2 items-center">
              <div className="h-4 w-4 rounded-full bg-[#1977DD]"></div>
              <p
                className="text-base font-normal
               text-[#1977DD]"
              >
                Online Event
              </p>
            </div>
          </div>
          <p className="text-base md:text-lg xl:text-xl text-[#1D1D1F]">
            Join us for an inspiring day of innovation, networking, and learning
            at the Tech Innovation Summit 2026. Connect with industry leaders,
            discover cutting-edge technologies, and gain insights that will
            shape the future of tech.
          </p>
          <div className="py-6">
            <h3 className="text-3xl font-medium text-black">
              Event Highlights
            </h3>
            <div className="flex gap-1 items-center mt-3">
              <CiCircleCheck className="text-[#1977DD] size-5" />
              <p className="text-base md:text-lg xl:text-xl text-[#364153]">
                Interactive workshops and sessions
              </p>
            </div>
          </div>
          <div className="pb-6">
            <h3 className="text-3xl font-medium text-black">
              Featured Speakers{" "}
            </h3>
            <div className="grid grid-cols-2 gap-4 justify-between items-center mt-3">
              <div className="bg-white rounded-lg p-3 flex gap-5 items-center">
                <Image src={"/user.png"} alt="Speaker" width={60} height={60} />
                <div className="flex flex-col">
                  <h4 className="text-lg font-bold text-black">John Doe</h4>
                  <p className="text-base ">CEO, Tech Corp</p>
                </div>
              </div>
              <div className="bg-white rounded-lg p-3 flex gap-5 items-center">
                <Image src={"/user.png"} alt="Speaker" width={60} height={60} />
                <div className="flex flex-col">
                  <h4 className="text-lg font-bold text-black">John Doe</h4>
                  <p className="text-base ">CEO, Tech Corp</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/4 p-8 rounded-[20px] bg-[#F5F5F7]">
          <h3 className="text-3xl font-medium text-black">Ticket type</h3>
          <div className="flex flex-col gap-5 my-5">
            <div className="bg-white p-4 rounded-2xl">
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-4">
                  <div className="flex gap-5 items-center">
                    <h3 className="text-xl font-medium text-black">Normal</h3>
                    <div className="rounded-[30px] px-6 py-1 h-fit border-[0.5px] border-[#1977DD29] bg-[#1977DD1A] shadow-[0_4px_20px_0_rgba(0,0,0,0.07)] ">
                      <p
                        className="text-base font-normal
               text-[#1977DD]"
                      >
                        Best Value
                      </p>
                    </div>
                  </div>
                  <p className="text-base text-[#1D1D1F] font-normal">
                    Limited time offer - Save 50% on general admission
                  </p>
                  <div className="flex gap-2 items-center">
                    <PiUser className=" shrink-0 size-5" />
                    <p className="text-lg sm:text-xl text-[#364153] font-normal">
                      50 seats available
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-5 my-5">
            <div className="bg-white p-4 rounded-2xl">
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-4">
                  <div className="flex gap-5 items-center">
                    <h3 className="text-xl font-medium text-black">Normal</h3>
                    <div className="rounded-[30px] px-6 py-1 h-fit border-[0.5px] border-[#1977DD29] bg-[#1977DD1A] shadow-[0_4px_20px_0_rgba(0,0,0,0.07)] ">
                      <p
                        className="text-base font-normal
               text-[#1977DD]"
                      >
                        Best Value
                      </p>
                    </div>
                  </div>
                  <p className="text-base text-[#1D1D1F] font-normal">
                    Limited time offer - Save 50% on general admission
                  </p>
                  <div className="flex gap-2 items-center">
                    <PiUser className=" shrink-0 size-5" />
                    <p className="text-lg sm:text-xl text-[#364153] font-normal">
                      50 seats available
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-5 my-5">
            <div className="bg-white p-4 rounded-2xl">
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-4">
                  <div className="flex gap-5 items-center">
                    <h3 className="text-xl font-medium text-black">Normal</h3>
                    <div className="rounded-[30px] px-6 py-1 h-fit border-[0.5px] border-[#1977DD29] bg-[#1977DD1A] shadow-[0_4px_20px_0_rgba(0,0,0,0.07)] ">
                      <p
                        className="text-base font-normal
               text-[#1977DD]"
                      >
                        Best Value
                      </p>
                    </div>
                  </div>
                  <p className="text-base text-[#1D1D1F] font-normal">
                    Limited time offer - Save 50% on general admission
                  </p>
                  <div className="flex gap-2 items-center">
                    <PiUser className=" shrink-0 size-5" />
                    <p className="text-lg sm:text-xl text-[#364153] font-normal">
                      50 seats available
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
