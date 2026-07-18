import React from "react";

export default function RoundTwoAbout() {
  return (
    <section className="py-20">
      <div className="container mx-auto">
        <h3 className="text-3xl font-normal text-[#101828]">Round 2</h3>
        <h5 className="">Phase 4</h5>
        <div className="flex gap-6 mt-10">
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
          </div>
        </div>
      </div>
    </section>
  );
}
