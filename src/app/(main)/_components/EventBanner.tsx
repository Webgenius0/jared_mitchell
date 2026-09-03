import { CMSEventsPageHero } from "@/Types/cms";
import aboutBg from "@/Assets/events.jpg";

const EventBanner = ({ data }: { data?: CMSEventsPageHero }) => {
  const bgImage = data?.image ?? aboutBg.src;

  return (
    <section
      style={{
        backgroundImage: `
          linear-gradient(0deg, rgba(0,0,0,0.7), rgba(0,0,0,0.7)),
          url(${bgImage})
        `,
      }}
      className="min-h-[260px] md:h-[340px] lg:h-[380px] xl:h-[500px] bg-no-repeat bg-center bg-cover flex items-center justify-center"
    >
      <div className="container flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[70px] font-bold text-white text-center leading-tight">
          {data?.title ?? "Events"}
        </h2>

        <p className="text-[#F5F5F7] text-xs sm:text-sm md:text-base lg:text-lg xl:text-[26px] pt-2 md:pt-3 text-center max-w-[90%] md:max-w-[80%] lg:max-w-full">
          {data?.sub_title ??
            "Workshops, markets, pop-ups, community gatherings, and creative experiences."}
        </p>
      </div>
    </section>
  );
};

export default EventBanner;
