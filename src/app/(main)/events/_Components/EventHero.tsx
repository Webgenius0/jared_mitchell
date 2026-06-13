import CustomVideoPlayer from "@/Components/Common/CustomVideoPlayer";
import { CMSHero } from "@/Types/cms";

const Hero = ({ data }: { data?: CMSHero }) => {
  return (
    <section className="container text-center pt-7 md:pt-10 xl:pt-5  2xl:pt-8">
      <div className="flex items-center justify-center my-5 md:my-7 rounded-2xl lg:rounded-4xl xl:rounded-[40px] overflow-hidden max-w-6xl mx-auto">
        <CustomVideoPlayer videoSrc={data?.video || "/home/hero-video.mp4"} />
      </div>
    </section>
  );
};

export default Hero;
