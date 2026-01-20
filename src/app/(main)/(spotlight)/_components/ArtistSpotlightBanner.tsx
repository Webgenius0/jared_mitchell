import aboutBg from "@/Assets/about.jpg";

const ArtistSpotlightBanner = () => {
  return (
    <section
      style={{
        backgroundImage: `
          linear-gradient(0deg, rgba(0,0,0,0.4), rgba(0,0,0,0.4)),
          url(${aboutBg.src})
        `,
      }}
      className="h-[500px] bg-no-repeat bg-center bg-cover"
    >
      <div className="h-full container flex flex-col items-center justify-center">
        <h2 className="text-[70px] font-bold text-white">Artist Spotlights</h2>

        <p className="text-[#F5F5F7] text-[26px] pt-5">
          Discover talented artists shaping the culture through music, visuals,
          performance, and creativity.
        </p>
      </div>
    </section>
  );
};

export default ArtistSpotlightBanner;
