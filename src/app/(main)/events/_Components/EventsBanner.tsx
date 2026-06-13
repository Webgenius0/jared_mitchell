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
      className="h-[500px] bg-no-repeat bg-center bg-cover"
    >
      <div className="h-full container flex flex-col items-center justify-center">
        <h2 className="text-[70px] font-bold text-white">
          {data?.title ?? "OSI Events"}
        </h2>

        <p className="text-[#F5F5F7] text-[26px] pt-5">
          {data?.sub_title ??
            "Workshops, markets, pop-ups, community gatherings, and creative experiences."}
        </p>
      </div>
    </section>
  );
};

export default EventsBanner;
