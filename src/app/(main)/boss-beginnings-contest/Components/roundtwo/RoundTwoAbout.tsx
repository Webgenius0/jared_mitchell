import React from "react";

export default function RoundTwoAbout() {
  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <h3 className="text-2xl md:text-3xl font-normal text-[#101828]">Round 2</h3>
        <h5 className="text-sm md:text-base text-black/50">Phase 4</h5>
        <div className="flex flex-col lg:flex-row gap-6 mt-6 md:mt-10">
          <div className="w-full lg:w-3/4 ">
            <div className="bg-[#F5F5F7] rounded-xl p-4 md:p-6 flex flex-col gap-6 md:gap-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium">About</h2>
              <p className="text-lg md:text-xl lg:text-2xl font-normal text-[#364153]">
                A cozy neighborhood café combining specialty coffee with a
                curated flower shop. We source beans from fair-trade roasters
                and partner with local flower farms to bring beauty and warmth
                to our community.
              </p>
              <div>
                <h4 className="text-lg md:text-xl lg:text-2xl font-normal text-[#1D1D1F]">
                  Website:
                </h4>
                <h5 className="text-lg md:text-xl lg:text-2xl font-normal text-[#364153] pt-2 md:pt-3">
                  www.abc.com
                </h5>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 sm:items-center">
                <div>
                  <h4 className="text-lg md:text-xl lg:text-2xl font-normal text-[#1D1D1F]">
                    Website:
                  </h4>
                  <h5 className="text-lg md:text-xl lg:text-2xl font-normal text-[#364153] pt-2 md:pt-3">
                    www.abc.com
                  </h5>
                </div>
                <div>
                  <h4 className="text-lg md:text-xl lg:text-2xl font-normal text-[#1D1D1F]">
                    Facebook
                  </h4>
                  <h5 className="text-lg md:text-xl lg:text-2xl font-normal text-[#364153] pt-2 md:pt-3">
                    facebook@abc.com
                  </h5>
                </div>
                <div>
                  <h4 className="text-lg md:text-xl lg:text-2xl font-normal text-[#1D1D1F]">
                    Instagram
                  </h4>
                  <h5 className="text-lg md:text-xl lg:text-2xl font-normal text-[#364153] pt-2 md:pt-3">
                    instagram@abc.com
                  </h5>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/4 bg-[#F5F5F7] rounded-xl p-4 md:p-6 h-fit">
            <h4 className="text-xl md:text-2xl font-semibold text-[#1D1D1F]">
              Support This Business
            </h4>
            <div className="my-4 bg-[#1977DD] p-4 md:p-6 w-full rounded-xl">
              <p className="text-white font-normal text-balance text-center text-sm md:text-base">
                Total Points
              </p>
              <h3 className="text-xl md:text-2xl font-normal text-white text-center">
                1,004
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
