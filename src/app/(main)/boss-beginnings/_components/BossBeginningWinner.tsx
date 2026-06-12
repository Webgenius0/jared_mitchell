import CustomVideoPlayer from "@/Components/Common/CustomVideoPlayer";
import Image from "next/image";
import m1 from "@/Assets/m1.jpg";
import { CMSBossBeginningsVideoGallery } from "@/Types/cms";

interface BossBeginningWinnerProps {
  data: CMSBossBeginningsVideoGallery;
}

const BossBeginningWinner = ({ data }: BossBeginningWinnerProps) => {
  const gallery = data?.metadata?.gallery ?? [];
  const videoSrc = data?.video ?? "/home/hero-video.mp4";

  // fill up to 3 slots with fallback image
  const images = [
    gallery[0] ?? m1.src,
    gallery[1] ?? m1.src,
    gallery[2] ?? m1.src,
  ];

  return (
    <section className="container">
      <h2 className="section_title 2xl:!text-[76px]">
        {data?.title ?? "BOSS BEGINNINGS Winner"}
      </h2>
      <p className="text-3xl text-center text-primary-black">
        {data?.sub_title ??
          "See the joy, support, and community love from our previous Boss Beginnings events."}
      </p>
      <div className="w-full h-[808px] mt-12">
        <CustomVideoPlayer videoSrc={videoSrc} className={"!rounded-none"} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 items-center my-6 gap-6">
        <figure className="max-h-[808px] !h-full relative">
          <div className="size-full absolute bg-black/30" />
          <Image
            src={images[0]}
            width={762}
            height={808}
            alt=""
            className="size-full object-cover"
          />
        </figure>
        <figure className="max-h-[808px] !h-full relative">
          <div className="size-full absolute bg-black/30" />
          <Image
            src={images[1]}
            width={762}
            height={808}
            alt=""
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
          alt=""
          className="size-full object-cover"
        />
      </figure>
    </section>
  );
};

export default BossBeginningWinner;
