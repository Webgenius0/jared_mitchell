import Image from "next/image";
import { CMSCTA } from "@/Types/cms";

const EventBanner = ({ data }: { data?: CMSCTA }) => {
  return (
    <section className="w-full h-[250px] sm:h-[320px] md:h-[380px] lg:h-[420px] xl:h-[460px] overflow-hidden flex items-center relative">
      <Image
        src={data?.bg || "/home/home-banner-2.jpg"}
        width={1920}
        height={460}
        alt="home banner"
        className="object-cover w-full"
      />
      <div className="w-full h-full absolute top-0 bg-black/60">
        <div className="flex flex-col max-w-[1200px] w-full mx-auto h-full items-center justify-center text-center px-4">
          <h2 className="section_title !text-white 2xl:text-5xl">
            {data?.title || "Events"}
          </h2>
          <p className="section_sub_title !text-[#F5F5F7]">
            {data?.description || (
              <>
                Discover celebrations, workshops, and community moments.
                <br />A curated look at the newest and most important events
                happening inside Our Social Image.
              </>
            )}
          </p>
        </div>
      </div>
    </section>
  );
};

export default EventBanner;
