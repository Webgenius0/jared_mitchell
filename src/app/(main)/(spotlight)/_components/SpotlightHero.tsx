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
  // Live channels play the IVS playback URL; only show the live player
  // when the stream status is actually "live".  Otherwise fall back to
  // the static CMS video (like before the live-stream integration).
  const streamSrc = getStreamPlaybackUrl(liveStream);
  const isLive = liveStream?.status === "live";

  // When a pending stream exists but nothing is broadcasting yet, show the
  // static video instead of hiding the section.

  return (
    <section className="section">
      <Container>
        <div className="w-full h-[300px] md:h-[500px] xl:h-[627px] sm:px-5 2xl:px-0">
          {isLive && streamSrc && liveStream ? (
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
