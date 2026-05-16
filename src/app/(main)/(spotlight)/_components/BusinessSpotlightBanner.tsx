import spotlightBg from "@/Assets/spotlightBg.png";
import { CMSBusinessSpotlightHero } from "@/Types/cms";

const BusinessSpotlightBanner = ({ data }: { data?: CMSBusinessSpotlightHero }) => {
  const bgImage = data?.image || spotlightBg.src;
  return (
    <section
      style={{
        backgroundImage: `
          linear-gradient(0deg, rgba(0,0,0,0.4), rgba(0,0,0,0.4)),
          url(${bgImage})
        `,
      }}
      className="h-[300px] md:h-[400px] xl:h-[500px] bg-no-repeat bg-center bg-cover"
    >
      <div className="h-full container flex flex-col items-center justify-center text-center">
        <h2 className="text-3xl md:text-5xl xl:text-[70px] font-bold text-white">
          {data?.title || "Local Business Spotlights"}
        </h2>

        <p className="text-[#F5F5F7] text-lg md:text-xl xl:text-[26px] pt-5 max-w-[900px]">
          {data?.sub_title || "Celebrating the entrepreneurs, small businesses, and community leaders shaping our neighborhoods."}
        </p>
      </div>
    </section>
  );
};

export default BusinessSpotlightBanner;
