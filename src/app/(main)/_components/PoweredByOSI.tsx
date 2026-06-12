import { CMSFeature } from "@/Types/cms";
import Image from "next/image";

const PoweredByOSI = ({ data }: { data?: CMSFeature }) => {
  return (
    <section className="w-full h-[280px] md:h-[360px] xl:h-[420px] overflow-hidden flex items-center relative">
      <Image
        src={data?.bg || "/home/home-banner-1.jpg"}
        fill
        alt="home banner"
        className="object-cover w-full"
      />

      <div className="w-full h-full absolute top-0 bg-black/70">
        {/* Added text-center and px-4 to prevent text from hitting the edges on smaller heights */}
        <div className="flex flex-col container w-full mx-auto h-full items-center justify-center text-center px-4">
          <h2 className="section_title !text-white">{data?.title}</h2>

          <p className="section_sub_title max-w-[1280px] mx-auto !text-[#F5F5F7] mt-2 md:mt-4">
            {data?.description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PoweredByOSI;
