import CustomVideoPlayer from "@/Components/Common/CustomVideoPlayer";
import LiveStreamPlayer from "@/Components/Common/LiveStreamPlayer";
import { getStreamPlaybackUrl } from "@/lib/Services/cms_service";
import { CMSBossBeginningsHero, LiveStream } from "@/Types/cms";

const BossBeginningHero = ({
  data,
  liveStream,
  hasPendingStream = false,
}: {
  data?: CMSBossBeginningsHero;
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
    <section className="container text-center pt-7 md:pt-10 xl:pt-5 2xl:pt-8">
      <div className="flex items-center justify-center my-5 md:my-7 rounded-2xl lg:rounded-4xl xl:rounded-[40px] overflow-hidden max-w-6xl mx-auto">
        {isLive && streamSrc && liveStream ? (
          <LiveStreamPlayer
            src={streamSrc}
            streamId={liveStream.id}
            isLive={isLive}
          />
        ) : (
          <CustomVideoPlayer
            videoSrc={data?.video || "/home/hero-video.mp4"}
          />
        )}
      </div>
    </section>
  );
};

export default BossBeginningHero;
