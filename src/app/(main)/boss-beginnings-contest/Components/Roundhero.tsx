import CustomVideoPlayer from "@/Components/Common/CustomVideoPlayer";
import { CMSBase } from "@/Types/cms";

const Roundhero = ({
  data,
  videoSrc,
}: {
  data?: CMSBase;
  videoSrc?: string | null;
}) => {
  const resolvedVideoSrc = videoSrc || data?.video || null;

  return (
    <section className="container text-center pt-5 md:pt-6 lg:pt-7 xl:pt-5 2xl:pt-8">
      <div className="w-full h-[40vh] md:h-[50vh] lg:h-[55vh] xl:h-[60vh] my-3 md:my-4 lg:my-5 xl:my-7 rounded-xl lg:rounded-2xl xl:rounded-[40px] overflow-hidden bg-black relative isolate z-0">
        {resolvedVideoSrc ? (
          <CustomVideoPlayer videoSrc={resolvedVideoSrc} />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-white/70 text-sm md:text-base">
              Contestant Not Uploaded Video Yet.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Roundhero;
