import CustomVideoPlayer from "@/Components/Common/CustomVideoPlayer";
import Image from "next/image";
import m1 from "@/Assets/m1.jpg";
import {
  CMSBossBeginningsVideoGallery,
  PastSixMonthsWinner,
} from "@/Types/cms";

interface BossBeginningWinnerProps {
  data: CMSBossBeginningsVideoGallery;
  winner: PastSixMonthsWinner | null;
}

const BossBeginningWinner = ({ data, winner }: BossBeginningWinnerProps) => {
  const gallery = data?.metadata?.gallery ?? [];
  const videoSrc = data?.video ?? "/home/hero-video.mp4";
  const winnerMedia = winner?.contestable?.media ?? [];

  // Priority: winner's own business media -> CMS gallery -> fallback image
  const images = [
    winnerMedia[0]?.file_path ?? gallery[0] ?? m1.src,
    winnerMedia[1]?.file_path ?? gallery[1] ?? m1.src,
    winnerMedia[2]?.file_path ?? gallery[2] ?? m1.src,
  ];

  return (
    <section className="container">
      <h2 className="section_title">
        {data?.title ?? "BOSS BEGINNINGS Winner"}
      </h2>
      <p className="text-3xl text-center text-primary-black">
        {data?.sub_title ??
          "See the joy, support, and community love from our previous Boss Beginnings events."}
      </p>

      <div className="w-full mt-12">
        <CustomVideoPlayer videoSrc={videoSrc} className={"!rounded-none"} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 items-center my-6 gap-6">
        <figure className="max-h-[808px] !h-full relative">
          <div className="size-full absolute bg-black/30" />
          <Image
            src={images[0]}
            width={762}
            height={808}
            alt={winner?.contestable?.business_name ?? ""}
            className="size-full object-cover"
          />
        </figure>
        <figure className="max-h-[808px] !h-full relative">
          <div className="size-full absolute bg-black/30" />
          <Image
            src={images[1]}
            width={762}
            height={808}
            alt={winner?.contestable?.business_name ?? ""}
            className="size-full object-cover"
          />
        </figure>
      </div>

      <figure className="h-[808px] relative">
        <div className="size-full absolute bg-black/30" />
        <Image
          src={images[2]}
          width={762}
          height={808}
          alt={winner?.contestable?.business_name ?? ""}
          className="size-full object-cover"
        />
        {winner && (
          <figcaption className="absolute bottom-6 left-6 z-10 text-white">
            <p className="text-sm uppercase tracking-wider text-white/70">
              {winner.season?.title}
            </p>
            <p className="text-2xl font-bold">
              {winner.contestable?.business_name}
            </p>
            <p className="text-sm text-white/80">
              by {winner.contestable?.owner_founder_name}
            </p>
          </figcaption>
        )}
      </figure>
    </section>
  );
};

export default BossBeginningWinner;
