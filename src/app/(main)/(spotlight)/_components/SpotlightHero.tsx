import { Button } from "@/Components/Common/Button";
import Container from "@/Components/Common/Container";
import CustomVideoPlayer from "@/Components/Common/CustomVideoPlayer";
import LiveStreamPlayer from "@/Components/Common/LiveStreamPlayer";
import { getStreamPlaybackUrl } from "@/lib/Services/cms_service";
import { CMSArtistSpotlightVideo, LiveStream } from "@/Types/cms";

const SpotlightHero = ({
  data,
  liveStream,
  hasPendingStream = false,
}: {
  data?: CMSArtistSpotlightVideo;
  liveStream?: LiveStream;
  hasPendingStream?: boolean;
}) => {
  // Live channels play the IVS playback URL; ended channels play the VOD.
  const streamSrc = getStreamPlaybackUrl(liveStream);
  const isLive = liveStream?.status === "live";

  // A pending channel means a stream is scheduled but not broadcasting —
  // hide the section instead of showing the fallback video.
  if (hasPendingStream && !streamSrc) return null;

  return (
    <section className="section">
      <Container>
        <div className="w-full h-[300px] md:h-[500px] xl:h-[627px] sm:px-5 2xl:px-0">
          {streamSrc && liveStream ? (
            <LiveStreamPlayer
              src={streamSrc}
              streamId={liveStream.id}
              isLive={isLive}
              className={"!rounded-[20px] md:!rounded-[40px] w-full h-full"}
            />
          ) : (
            <CustomVideoPlayer
              videoSrc={data?.video || "/home/hero-video.mp4"}
              loop
              className={"!rounded-[20px] md:!rounded-[40px]"}
            />
          )}
        </div>
        {/* <h2 className='text-2xl md:text-3xl xl:text-[40px] font-bold text-center mt-8 md:mt-16'>
          {data?.title || "Taste of Indy Street Kitchen: A Family Legacy of Flavor and Heart"}
        </h2> */}
        {data?.sub_title && (
          <p className="text-center text-lg md:text-xl text-secondary-black mt-4 max-w-[900px] mx-auto">
            {data.sub_title}
          </p>
        )}
      </Container>
    </section>
  );
};

export default SpotlightHero;
