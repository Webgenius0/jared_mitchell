import Image from "next/image";
import a1 from "@/Assets/a1.png";
import { CMSAboutSociety } from "@/Types/cms";

const OurSociety = ({ data }: { data?: CMSAboutSociety }) => {
  return (
    <section className="py-6 md:py-6 lg:py-8 xl:py-20">
      <div className="container grid md:grid-cols-2 gap-3 md:gap-5 lg:gap-6 xl:gap-20 items-center">
        {/* Left */}
        <div>
          <h2 className="text-primary-black text-lg md:text-xl lg:text-2xl xl:text-5xl font-bold leading-[140%] max-w-[602px] mb-1.5 md:mb-2 lg:mb-3 xl:mb-7">
            {data?.title || "We Are the Image of Our Society"}
          </h2>

          <p className="text-sm md:text-sm lg:text-base xl:text-2xl text-[#364153] leading-[150%]">
            {data?.description || `Our Social Image (OSI) is more than a platform — it is a movement
            designed to uplift voices, celebrate creativity, and build stronger
            communities. We highlight the culture, stories, and entrepreneurial
            spirit that often go unseen, giving everyday people a place to be
            recognized, supported, and celebrated.`}
          </p>
        </div>

        {/* Right */}
        <div className="h-[220px] md:h-[280px] lg:h-[340px] xl:h-[480px] w-full">
          <Image
            src={data?.image || a1}
            alt="a1"
            width={800}
            height={480}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default OurSociety;
