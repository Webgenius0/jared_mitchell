import spotlightBg from "@/Assets/spotlightBg.png";

const BusinessSpotlightBanner = () => {
  return (
    <section
      style={{
        backgroundImage: `
          linear-gradient(0deg, rgba(0,0,0,0.4), rgba(0,0,0,0.4)),
          url(${spotlightBg.src})
        `,
      }}
      className="h-[500px] bg-no-repeat bg-center bg-cover"
    >
      <div className="h-full container flex flex-col items-center justify-center">
        <h2 className="text-[70px] font-bold text-white">
          Local Business Spotlights
        </h2>

        <p className="text-[#F5F5F7] text-[26px] pt-5">
          Celebrating the entrepreneurs, small businesses, and community leaders
          shaping our neighborhoods.
        </p>
      </div>
    </section>
  );
};

export default BusinessSpotlightBanner;
