import { CMSEventsPageHero } from "@/Types/cms";
import aboutBg from "@/Assets/events.jpg";

interface EventsBannerProps {
  data: CMSEventsPageHero;
}

const EventsBanner = ({ data }: EventsBannerProps) => {
  const bgImage = data?.image ?? aboutBg.src;

  return (
    <section
      style={{
        backgroundImage: `
          linear-gradient(0deg, rgba(0,0,0,0.7), rgba(0,0,0,0.7)),
          url(${bgImage})
        `,
      }}
      className="min-h-[300px] md:h-[400px] xl:h-[500px] bg-no-repeat bg-center bg-cover flex items-center justify-center"
    >
      <div className="container flex flex-col items-center justify-center text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[70px] font-bold text-white text-center leading-tight">
          {data?.title ?? "OSI Events"}
        </h2>

        <p className="text-[#F5F5F7] text-sm sm:text-base md:text-lg lg:text-xl xl:text-[26px] pt-3 md:pt-5 text-center max-w-[90%] md:max-w-[80%] lg:max-w-full">
          {data?.sub_title ??
            "Workshops, markets, pop-ups, community gatherings, and creative experiences."}
        </p>
      </div>
    </section>
  );
};

export default EventsBanner;
