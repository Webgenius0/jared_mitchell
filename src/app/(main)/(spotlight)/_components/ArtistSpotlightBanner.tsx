import aboutBg from "@/Assets/about.jpg";
import { CMSArtistSpotlightHero } from "@/Types/cms";

const ArtistSpotlightBanner = ({ data }: { data?: CMSArtistSpotlightHero }) => {
  const bgImage = data?.image || aboutBg.src;
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
          {data?.title || "Artist Spotlights"}
        </h2>

        <p className="text-[#F5F5F7] text-lg md:text-xl xl:text-[26px] pt-5 max-w-[900px]">
          {data?.sub_title || "Discover talented artists shaping the culture through music, visuals, performance, and creativity."}
        </p>
      </div>
    </section>
  );
};

export default ArtistSpotlightBanner;
