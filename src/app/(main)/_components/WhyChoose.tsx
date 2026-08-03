import Image from "next/image";
import osi from "@/Assets/osi.png";
import { CMSWhyChoose } from "@/Types/cms";

const WhyChoose = ({ data }: { data?: CMSWhyChoose }) => {
  const item = data?.metadata?.[0];

  return (
    <div className="container py-6 md:py-8 xl:py-12">
      <div className="mb-6 md:mb-8">
        <h2 className="section_title uppercase">{data?.title || "Why Choose OSI?"}</h2>

        <p className="section_sub_title">
          {data?.sub_title || "Fostering a culture of support, respect, and shared progress."}
        </p>
      </div>

      <section className="w-full h-[320px] lg:h-[380px] xl:h-[460px] overflow-hidden flex items-center relative rounded">
        <Image
          src={item?.image || osi}
          fill
          alt="home banner"
          className="object-cover w-full rounded"
        />

        <div className="w-full h-full absolute top-0 bg-black/25 rounded">
          <div className="flex flex-col w-full mx-auto h-full items-center justify-center">
            <h2 className="section_title !text-white">{item?.title || "Creators"}</h2>

            <h4 className="text-white text-lg md:text-2xl text-center font-medium mb-2 md:mb-3">
              {item?.sub_title || "Build exposure without chasing algorithms"}
            </h4>

            <p className="section_sub_title max-w-[1280px] mx-auto !text-[#f5f5f7d3]">
              {item?.description || "Share your work through OSI spotlights, features, and campaigns that help your story reach the right audience."}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyChoose;
