import Image from "next/image";
import a1 from "@/Assets/a1.png";
import { CMSAboutSociety } from "@/Types/cms";

const OurSociety = ({ data }: { data?: CMSAboutSociety }) => {
  return (
    <section className="py-8 md:py-8 lg:py-12 xl:py-20 px-10">
      <div className="container grid md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 xl:gap-20 items-center">
        {/* Left */}
        <div>
          <h2 className="text-primary-black text-xl md:text-2xl lg:text-3xl xl:text-5xl font-bold leading-[140%] max-w-[602px] mb-2 md:mb-3 lg:mb-4 xl:mb-7">
            {data?.title || "We Are the Image of Our Society"}
          </h2>

          <p className="text-base md:text-base lg:text-lg xl:text-2xl text-[#364153] leading-[150%]">
            {data?.description ||
              `Our Social Image (OSI) is more than a platform — it is a movement
            designed to uplift voices, celebrate creativity, and build stronger
            communities. We highlight the culture, stories, and entrepreneurial
            spirit that often go unseen, giving everyday people a place to be
            recognized, supported, and celebrated.`}
          </p>
        </div>

        {/* Right */}
        <div className="h-[260px] md:h-[340px] lg:h-[400px] xl:h-[480px] w-full">
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
