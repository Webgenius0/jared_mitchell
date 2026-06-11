import shopBg from "@/Assets/shop.png";
import { RightSvg } from "@/Components/Svg/SvgContainer";
import { CMSShopPageHero } from "@/Types/cms";

interface ShopBannerProps {
  data?: CMSShopPageHero;
}

const ShopBanner = ({ data }: ShopBannerProps) => {
  const bgImage = data?.bg ?? shopBg.src;

  return (
    <section
      style={{
        backgroundImage: `
          linear-gradient(0deg, rgba(0,0,0,0.1), rgba(0,0,0,0.1)),
          url(${bgImage})
        `,
      }}
      className="h-[500px] bg-no-repeat bg-center bg-cover"
    >
      <div className="h-full container flex flex-col items-center justify-center">
        <h2 className="text-6xl font-bold leading-[150%] text-white text-center max-w-[968px] mx-auto">
          {data?.title ?? "The OSI Shop"}
        </h2>

        <p className="text-white font-semibold text-3xl pt-4 pb-3">
          {data?.sub_title ??
            "Support the culture. Fund community programs. Elevate small businesses."}
        </p>

        <p className="text-white text-xl text-center max-w-3xl mx-auto leading-[150%] pb-10">
          {data?.description ??
            "Every purchase helps power OSI spotlights, Boss Beginnings celebrations, local events, and tools for artists and businesses."}
        </p>

        <div className="flex justify-center items-center gap-4">
          <button className="bg-primary-blue text-white border border-primary-blue rounded-full px-12 py-3 text-xl flex gap-2.5 items-center">
            Shop Products
            <RightSvg />
          </button>

          <button className="bg-white text-[#101828] border border-[#D1D5DC] rounded-full px-12 py-3 text-xl flex gap-2.5 items-center">
            Shop Digital Tools
            <RightSvg />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ShopBanner;
