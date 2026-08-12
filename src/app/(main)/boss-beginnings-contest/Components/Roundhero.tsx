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
    <section className="container text-center pt-7 md:pt-10 xl:pt-5  2xl:pt-8">
      <div className="w-full h-[60vh] md:h-[70vh] lg:h-[75vh] my-5 md:my-7 rounded-2xl lg:rounded-4xl xl:rounded-[40px] overflow-hidden bg-black relative isolate z-0">
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
