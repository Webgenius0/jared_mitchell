import CustomVideoPlayer from "@/Components/Common/CustomVideoPlayer";
import { CMSHero } from "@/Types/cms";

const Hero = ({ data }: { data?: CMSHero }) => {
  return (
    <section className="container text-center pt-7 md:pt-10 xl:pt-5 pb-12 2xl:py-12">
      <h1 className="text-primary-black text-3xl md:text-4xl xl:text-[5vw] 2xl:text-[6vw] font-bold xl:leading-[140px] tracking-[-1.28px] pb-3 xl:pb-0">
        {data?.title || "Our Social Image"}
      </h1>

      <p className="text-secondary-black text-xl md:text-2xl xl:text-4xl xl:pb-3 2xl:py-5">
        {data?.sub_title || "We are the image of our society."}
      </p>

      <div className="flex items-center justify-center my-5 md:my-7 rounded-2xl lg:rounded-4xl xl:rounded-[40px] overflow-hidden">
        <CustomVideoPlayer videoSrc={data?.video || "/home/hero-video.mp4"} />
      </div>

      <p className="text-secondary-black md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">
        {data?.description || `Welcome to Our Social Image — the platform where creativity meets
        community. Here, we celebrate small businesses, artists, and cultural
        innovators shaping the world around us. Explore stories, attend events,
        and join a growing network of creators who believe in unity, progress,
        and purpose. Your image is our image — and together, we create something
        powerful.`}
      </p>

      <div className="space-x-3 md:space-x-4 mt-5 md:mt-8 lg:mt-12">
        <button className="bg-primary-blue text-white border border-primary-blue rounded-full px-7 md:px-10 xl:px-16 py-1.5 md:py-2 xl:py-3.5 text-sm md:text-base lg:text-lg xl:text-xl font-medium">
          Join OSI
        </button>

        <button className="bg-white text-primary-blue border border-[#D1D5DC] rounded-full px-7 md:px-10 xl:px-16 py-1.5 md:py-2 xl:py-3.5 text-sm md:text-base lg:text-lg xl:text-xl font-medium">
          Sponsor Us
        </button>
      </div>
    </section>
  );
};

export default Hero;
