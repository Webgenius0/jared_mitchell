import CustomVideoPlayer from "@/Components/Common/CustomVideoPlayer";
import { CMSBase } from "@/Types/cms";

const Roundhero = ({
  data,
  videoSrc,
}: {
  data?: CMSBase;
  videoSrc?: string | null;
}) => {
  return (
    <section className="container text-center pt-7 md:pt-10 xl:pt-5  2xl:pt-8">
      <div className="w-full h-[60vh] md:h-[70vh] lg:h-[75vh] my-5 md:my-7 rounded-2xl lg:rounded-4xl xl:rounded-[40px] overflow-hidden bg-black">
        <CustomVideoPlayer
          videoSrc={videoSrc || data?.video || "/home/hero-video.mp4"}
        />
      </div>
    </section>
  );
};

export default Roundhero;
