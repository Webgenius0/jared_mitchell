"use client";
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
import { CMSEventsPageVendor } from "@/Types/cms";

const pricingIcons = [<POneSvg />, <PTwoSvg />, <PThreeSvg />];

interface VendorOsiProps {
  data?: CMSEventsPageVendor;
}

const VendorOsi = ({ data }: VendorOsiProps) => {
  const metadata = data?.metadata;

  const pricing = metadata?.pricing ?? [];
  const benefitsTitle =
    metadata?.benefits?.title ?? "Benefits Included With Every Booth";
  const memberPerksTop = metadata?.member_perks_top;
  const memberPerksBottom = metadata?.member_perks_bottom;
  const whatVendorsProvide = metadata?.what_vendors_provide;
  const whyVendorsLove = metadata?.why_vendors_love;

  return (
    <section className="py-20 container">
      <h2 className="section_title 2xl:text-7xl 2xl:font-bold">
        {data?.title ?? "Vendor With OSI"}
      </h2>

      <p className="text-xl text-[#1D1D1F] text-center mb-12">
        {data?.sub_title ??
          "Showcase your products and services at OSI events. Get exposure, connect with customers, and grow your business."}
      </p>

      <div className="grid grid-cols-3 gap-5">
        {/* Column 1 — Pricing */}
        <div className="border border-[#00000015] rounded-xl shadow-[0_4px_20px_0_rgba(0,0,0,0.07)] py-4 px-3">
          <h3 className="text-[#1D1D1F] text-2xl font-semibold mb-4">
            Pricing
          </h3>

          {pricing.map((item, idx) => (
            <div
              key={idx}
              className="border border-[#0000000e] rounded-xl shadow-[0_4px_20px_0_rgba(0,0,0,0.07)] p-3 mb-3 last:mb-0"
            >
              <div className="flex gap-3 items-center">
                <p className="size-14 bg-[#EFF6FF] rounded-full grid place-items-center mb-5">
                  {pricingIcons[idx] ?? <POneSvg />}
                </p>
                <div>
                  <h3 className="text-xl mb-1">{item.title}</h3>
                  <p className="text-primary-blue">${item.price} per event</p>
                </div>
              </div>
              <p className="text-[#364153d5] text-lg">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Column 2 — Benefits */}
        <div className="border border-[#00000015] rounded-xl shadow-[0_4px_20px_0_rgba(0,0,0,0.07)] py-4 px-3">
          <h3 className="text-[#1D1D1F] text-2xl font-semibold mb-4">
            {benefitsTitle}
          </h3>

          <div className="border border-[#0000000e] rounded-xl shadow-[0_4px_20px_0_rgba(0,0,0,0.07)] p-3 space-y-5">
            {Array.from({ length: 6 }).map((_, idx) => (
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

        {/* Column 3 — Member Perks (top) */}
        <div className="border border-[#00000015] rounded-xl shadow-[0_4px_20px_0_rgba(0,0,0,0.07)] py-4 px-3">
          <h3 className="text-[#1D1D1F] text-2xl font-semibold mb-4">
            {memberPerksTop?.title ?? "Member Perks"}
          </h3>

          {memberPerksTop?.condition && (
            <p className="text-[#364153c7] text-lg mb-3">
              {memberPerksTop.condition}
            </p>
          )}

          <div className="border border-[#0000000e] rounded-xl shadow-[0_4px_20px_0_rgba(0,0,0,0.07)] p-3 space-y-5">
            {Array.from({ length: 5 }).map((_, idx) => (
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

        {/* Column 4 — Member Perks (bottom) */}
        <div className="border border-[#00000015] rounded-xl shadow-[0_4px_20px_0_rgba(0,0,0,0.07)] py-4 px-3">
          <div className="flex gap-3 items-center mb-5">
            <p className="size-14 bg-[#EFF6FF] rounded-full grid place-items-center">
              <PFourSvg />
            </p>
            <h3 className="text-[#1D1D1F] text-2xl font-semibold">
              {memberPerksBottom?.title ?? "Member Perks"}
            </h3>
          </div>

          {memberPerksBottom?.description && (
            <p className="text-[#364153c7] text-lg mb-3">
              {memberPerksBottom.description}
            </p>
          )}

          <div className="border border-[#0000000e] rounded-xl shadow-[0_4px_20px_0_rgba(0,0,0,0.07)] p-3 space-y-5">
            {Array.from({ length: 6 }).map((_, idx) => (
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

        {/* Column 5 — What Vendors Provide */}
        <div className="border border-[#00000015] rounded-xl shadow-[0_4px_20px_0_rgba(0,0,0,0.07)] py-4 px-3">
          <div className="flex gap-3 items-center mb-5">
            <p className="size-14 bg-[#EFF6FF] rounded-full grid place-items-center">
              <PFiveSvg />
            </p>
            <h3 className="text-[#1D1D1F] text-2xl font-semibold">
              {whatVendorsProvide?.title ?? "What Vendors Provide"}
            </h3>
          </div>

          <div className="border border-[#0000000e] rounded-xl shadow-[0_4px_20px_0_rgba(0,0,0,0.07)] p-3 space-y-5">
            {Array.from({ length: 4 }).map((_, idx) => (
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

        {/* Column 6 — Why Vendors Love OSI */}
        <div className="border border-[#00000015] rounded-xl shadow-[0_4px_20px_0_rgba(0,0,0,0.07)] py-4 px-3">
          <div className="flex gap-3 items-center mb-5">
            <p className="size-14 bg-[#EFF6FF] rounded-full grid place-items-center">
              <PSixSvg />
            </p>
            <h3 className="text-[#1D1D1F] text-2xl font-semibold">
              {whyVendorsLove?.title ?? "Why Vendors Love Working With OSI"}
            </h3>
          </div>

          {whyVendorsLove?.description && (
            <p className="text-[#364153c7] text-lg mb-3">
              {whyVendorsLove.description}
            </p>
          )}

          <div className="border border-[#0000000e] rounded-xl shadow-[0_4px_20px_0_rgba(0,0,0,0.07)] p-3 space-y-5">
            {Array.from({ length: 5 }).map((_, idx) => (
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
