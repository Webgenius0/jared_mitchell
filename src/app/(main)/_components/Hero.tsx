import CustomVideoPlayer from "@/Components/Common/CustomVideoPlayer";
import { CMSHero } from "@/Types/cms";

const Hero = ({ data }: { data?: CMSHero }) => {
  return (
    <section className="container text-center pt-7 md:pt-10 xl:pt-5  2xl:pt-8">
      <h1 className="text-primary-black text-3xl md:text-4xl xl:text-[70px] font-bold xl:leading-[70px] tracking-[-1.28px] pb-3 xl:pb-0">
        {data?.title}
      </h1>

      <p className="text-secondary-black text-xl md:text-xl xl:text-2xl lg:mt-5">
        {data?.sub_title}
      </p>

      <div className="flex items-center justify-center my-5 md:my-7 rounded-2xl lg:rounded-4xl xl:rounded-[40px] overflow-hidden max-w-6xl mx-auto">
        <CustomVideoPlayer videoSrc={data?.video || "/home/hero-video.mp4"} />
      </div>

      <p className="text-secondary-black md:text-lg lg:text-xl xl:text-2xl">
        {data?.description}
      </p>

      <div className="space-x-2 md:space-x-3 mt-4 md:mt-5">
        <button className="bg-primary-blue text-white border border-primary-blue rounded-full px-4 md:px-6 xl:px-8 py-1 md:py-1.5 xl:py-2 text-sm lg:text-xl font-medium transition-all">
          Join OSI
        </button>

        <button className="bg-white text-primary-blue border border-[#D1D5DC] rounded-full px-4 md:px-6 xl:px-8 py-1 md:py-1.5 xl:py-2 text-sm lg:text-xl font-medium transition-all">
          Sponsor Us
        </button>
      </div>
    </section>
  );
};

export default Hero;
