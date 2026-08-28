"use client";

import shopBg from "@/Assets/shop.png";
import { RightSvg } from "@/Components/Svg/SvgContainer";
import { CMSShopPageHero } from "@/Types/cms";

interface ShopBannerProps {
  data?: CMSShopPageHero;
}

const ShopBanner = ({ data }: ShopBannerProps) => {
  const bgImage = data?.bg ?? shopBg.src;

  const handleShopProductsClick = () => {
    document
      .getElementById("featured-shop")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      style={{
        backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.1), rgba(0,0,0,0.1)), url(${bgImage})`,
      }}
      className="relative min-h-[400px] md:min-h-[450px] lg:min-h-[500px] w-full bg-no-repeat bg-center bg-cover flex items-center justify-center py-8 md:py-10 lg:py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Title */}
        <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
          {data?.title ?? "The OSI Shop"}
        </h1>

        {/* Subtitle */}
        <p className="text-white font-semibold text-base sm:text-lg md:text-xl lg:text-2xl pt-2 sm:pt-3 pb-1.5 sm:pb-2 max-w-2xl sm:max-w-none">
          {data?.sub_title ??
            "Support the culture. Fund community programs. Elevate small businesses."}
        </p>

        {/* Description */}
        <p className="text-white text-sm sm:text-base md:text-lg text-center max-w-3xl mx-auto leading-relaxed pb-6 md:pb-8 opacity-90">
          {data?.description ??
            "Every purchase helps power OSI spotlights, OSI Top Business Award celebrations, local events, and tools for artists and businesses."}
        </p>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
          <button
            onClick={handleShopProductsClick}
            className="w-full sm:w-auto bg-primary-blue text-white border border-primary-blue rounded-full px-5 sm:px-6 lg:px-8 py-2 sm:py-2.5 text-sm sm:text-base lg:text-lg flex gap-2 items-center justify-center transition-all duration-200 hover:opacity-90 active:scale-95"
          >
            <span>Shop Products</span>
            <RightSvg />
          </button>

          {/* <button className="w-full sm:w-auto bg-white text-[#101828] border border-[#D1D5DC] rounded-full px-6 sm:px-8 lg:px-12 py-3 text-base sm:text-lg lg:text-xl flex gap-2.5 items-center justify-center transition-all duration-200 hover:bg-gray-50 active:scale-95">
            <span>Shop Digital Tools</span>
            <RightSvg />
          </button> */}
        </div>
      </div>
    </section>
  );
};

export default ShopBanner;
