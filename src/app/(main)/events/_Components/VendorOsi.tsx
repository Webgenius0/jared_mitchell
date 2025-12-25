import {
  CheckSvg,
  DotSvg,
  PFiveSvg,
  PFourSvg,
  POneSvg,
  PSixSvg,
  PThreeSvg,
  PTwoSvg,
} from "@/Components/Svg/SvgContainer";

const VendorOsi = () => {
  return (
    <section className="py-20 container">
      <h2 className="section_title 2xl:text-7xl 2xl:font-bold">
        Vendor With OSI
      </h2>

      <p className="text-xl text-[#1D1D1F] text-center mb-12">
        Showcase your products and services at OSI events. Get exposure, connect
        with customers, and grow your business.
      </p>

      <div className="grid grid-cols-3 gap-5">
        {/* Column 1 */}
        <div className="border border-[#00000015] rounded-xl shadow-[0_4px_20px_0_rgba(0,0,0,0.07)] py-4 px-3">
          <h3 className="text-[#1D1D1F] text-2xl font-semibold mb-4">
            Pricing
          </h3>

          <div className="border border-[#0000000e] rounded-xl shadow-[0_4px_20px_0_rgba(0,0,0,0.07)] p-3">
            <div className="flex gap-3 items-center">
              <p className="size-14 bg-[#EFF6FF] rounded-full grid place-items-center mb-5">
                <POneSvg />
              </p>
              <div>
                <h3 className="text-xl mb-1">Standard Booth</h3>
                <p className="text-primary-blue">$50 – $75 per event</p>
              </div>
            </div>

            <p className="text-[#364153d5] text-lg">
              Ideal for small brands, craft sellers, new entrepreneurs, and
              service providers.
            </p>
          </div>

          <div className="border border-[#0000000e] rounded-xl shadow-[0_4px_20px_0_rgba(0,0,0,0.07)] p-3 my-3">
            <div className="flex gap-3 items-center">
              <p className="size-14 bg-[#EFF6FF] rounded-full grid place-items-center mb-5">
                <PTwoSvg />
              </p>
              <div>
                <h3 className="text-xl mb-1">Premium Booth</h3>
                <p className="text-primary-blue">$50 – $75 per event</p>
              </div>
            </div>

            <p className="text-[#364153d5] text-lg">
              Larger display area, priority placement, and upgraded visibility.
            </p>
          </div>

          <div className="border border-[#0000000e] rounded-xl shadow-[0_4px_20px_0_rgba(0,0,0,0.07)] p-3">
            <div className="flex gap-3 items-center">
              <p className="size-14 bg-[#EFF6FF] rounded-full grid place-items-center mb-5">
                <PThreeSvg />
              </p>
              <div>
                <h3 className="text-xl mb-1">Member Discounts</h3>
                <p className="text-primary-blue">$50 – $75 per event</p>
              </div>
            </div>

            <p className="text-[#364153d5] text-lg">
              Growth Members: 10% off Pro Business Members: 20% off + priority
              access
            </p>
          </div>
        </div>

        {/* Column 2 */}
        <div className="border border-[#00000015] rounded-xl shadow-[0_4px_20px_0_rgba(0,0,0,0.07)] py-4 px-3">
          <h3 className="text-[#1D1D1F] text-2xl font-semibold mb-4">
            Benefits Included With Every Booth
          </h3>

          <div className="border border-[#0000000e] rounded-xl shadow-[0_4px_20px_0_rgba(0,0,0,0.07)] p-3 space-y-5">
            {Array.from({ length: 6 })?.map((_, idx) => (
              <div key={idx}>
                <p className="flex gap-2 items-center mb-2">
                  <span className="size-7 bg-[#EFF6FF] rounded-full grid place-items-center">
                    <CheckSvg />
                  </span>
                  <h4 className="text-lg font-medium text-[#364153]">
                    Exposure to a growing OSI community
                  </h4>
                </p>
                <p className="text-[#364153c7]">
                  customers who want to support small businesses, creatives, and
                  local entrepreneurs.
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Column 3 */}
        <div className="border border-[#00000015] rounded-xl shadow-[0_4px_20px_0_rgba(0,0,0,0.07)] py-4 px-3">
          <h3 className="text-[#1D1D1F] text-2xl font-semibold mb-4">
            Member Perks
          </h3>

          <div className="border border-[#0000000e] rounded-xl shadow-[0_4px_20px_0_rgba(0,0,0,0.07)] p-3 space-y-5">
            {Array.from({ length: 5 })?.map((_, idx) => (
              <div key={idx}>
                <p className="flex gap-2 items-center mb-2">
                  <span className="size-7 bg-[#EFF6FF] rounded-full grid place-items-center">
                    <CheckSvg />
                  </span>
                  <h4 className="text-lg font-medium text-[#364153]">
                    Exposure to a growing OSI community
                  </h4>
                </p>
                <p className="text-[#364153c7]">
                  customers who want to support small businesses, creatives, and
                  local entrepreneurs.
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Column 4 */}
        <div className="border border-[#00000015] rounded-xl shadow-[0_4px_20px_0_rgba(0,0,0,0.07)] py-4 px-3">
          <div className="flex gap-3 items-center mb-5">
            <p className="size-14 bg-[#EFF6FF] rounded-full grid place-items-center">
              <PFourSvg />
            </p>
            <h3 className="text-[#1D1D1F] text-2xl font-semibold">
              Member Perks
            </h3>
          </div>

          <div className="border border-[#0000000e] rounded-xl shadow-[0_4px_20px_0_rgba(0,0,0,0.07)] p-3 space-y-5">
            {Array.from({ length: 6 })?.map((_, idx) => (
              <div key={idx} className="flex gap-2 items-center mb-2">
                <DotSvg />
                <p className="text-[#364153c7] text-lg">
                  customers who want to support small businesses, creatives, and
                  local entrepreneurs.
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Column 5 */}
        <div className="border border-[#00000015] rounded-xl shadow-[0_4px_20px_0_rgba(0,0,0,0.07)] py-4 px-3">
          <div className="flex gap-3 items-center mb-5">
            <p className="size-14 bg-[#EFF6FF] rounded-full grid place-items-center">
              <PFiveSvg />
            </p>
            <h3 className="text-[#1D1D1F] text-2xl font-semibold">
              What Vendors Provide
            </h3>
          </div>

          <div className="border border-[#0000000e] rounded-xl shadow-[0_4px_20px_0_rgba(0,0,0,0.07)] p-3 space-y-5">
            {Array.from({ length: 4 })?.map((_, idx) => (
              <div key={idx} className="flex gap-2 items-center mb-2">
                <DotSvg />
                <p className="text-[#364153c7] text-lg">
                  customers who want to support small businesses, creatives, and
                  local entrepreneurs.
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Column 6 */}
        <div className="border border-[#00000015] rounded-xl shadow-[0_4px_20px_0_rgba(0,0,0,0.07)] py-4 px-3">
          <div className="flex gap-3 items-center mb-5">
            <p className="size-14 bg-[#EFF6FF] rounded-full grid place-items-center">
              <PSixSvg />
            </p>
            <h3 className="text-[#1D1D1F] text-2xl font-semibold">
              Why Vendors Love Working With OSI
            </h3>
          </div>

          <div className="border border-[#0000000e] rounded-xl shadow-[0_4px_20px_0_rgba(0,0,0,0.07)] p-3 space-y-5">
            {Array.from({ length: 5 })?.map((_, idx) => (
              <div key={idx} className="flex gap-2 items-center mb-2">
                <DotSvg />
                <p className="text-[#364153c7] text-lg">
                  customers who want to support small businesses, creatives, and
                  local entrepreneurs.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VendorOsi;
