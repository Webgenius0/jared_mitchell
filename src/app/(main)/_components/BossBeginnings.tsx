import { Button } from "@/Components/Common/Button";
import Image from "next/image";
import { GoGift } from "react-icons/go";
import { CMSBossBeginnings } from "@/Types/cms";

const BossBeginnings = ({ data }: { data?: CMSBossBeginnings }) => {
  return (
    <section className="text-center bg-[#F5F5F7] py-8 2xl:py-12">
      <div className="container">
        <h2 className="text-primary-black  text-3xl md:text-4xl lg:text-5xl 2xl:text-7xl font-bold xl:leading-[140px] tracking-[-1.28px]  mb-3 lg:mb-5">
          {data?.title || "Boss Beginnings"}
        </h2>

        <h3 className="section_title">{data?.sub_title || "A Business Shower"}</h3>

        <div className="relative flex items-center max-w-[1179px] w-full h-[300px] md:h-[400px] lg:h-[500px] xl:h-[682px] justify-center my-7 rounded-2xl md:rounded-[40px] overflow-hidden mx-auto">
          <div className="absolute top-0 left-0 size-full bg-black/40" />
          <Image
            src={data?.image || "/home/boss-beginnings-banner.jpg"}
            fill
            alt="boss beginnings"
            className="object-cover size-full"
          />
        </div>

        <p className="text-secondary-black md:text-lg xl:text-2xl">
          {data?.description || `Boss Beginnings is our signature celebration for brand‑new
          entrepreneurs. We highlight their story, support their launch, and
          bring the community together to give resources and opportunities.`}
        </p>

        <div className="space-x-3 space-y-3 lg:space-x-8 xl:space-x-14 mt-8 xl:mt-12">
          <Button>
            <div className="flex items-center justify-center size-6 shrink-0 aspect-square rounded-lg custom_border bg-gray-100">
              <GoGift className="text-primary-blue" />
            </div>
            Learn More
          </Button>
          <Button variant={"outline"}>Nominate a Business</Button>
          <Button variant={"outline"}>Sponsor Event</Button>
        </div>
      </div>
    </section>
  );
};

export default BossBeginnings;
