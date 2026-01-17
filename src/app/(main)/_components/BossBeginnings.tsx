import { Button } from "@/Components/Common/Button";
import Image from "next/image";
import { GoGift } from "react-icons/go";

const BossBeginnings = () => {
  return (
    <section className="text-center bg-[#F5F5F7] py-12">
      <div className="container">
        <h2 className="text-primary-black text-4xl sm:text-7xl font-bold leading-[140px] tracking-[-1.28px] mb-5">
          Boss Beginnings
        </h2>
        <h3 className="section_title">A Business Shower</h3>

        <div className="relative flex items-center max-w-[1179px] w-full h-[682px] justify-center my-7 rounded-[40px] overflow-hidden mx-auto">
          <div className="absolute top-0 left-0 size-full bg-black/40" />
          <Image
            src={"/home/boss-beginnings-banner.jpg"}
            width={1179}
            height={682}
            alt="boss beginnings"
            className="object-cover size-full"
          />
        </div>
        <p className="text-secondary-black text-2xl">
          Boss Beginnings is our signature celebration for brand‑new
          entrepreneurs. We highlight their story, support their launch, and
          bring the community together to give resources and opportunities.
        </p>
        <div className="space-x- md:space-x-14 mt-12">
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
