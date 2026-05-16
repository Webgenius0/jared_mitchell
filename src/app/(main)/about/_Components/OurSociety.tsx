import Image from "next/image";
import a1 from "@/Assets/a1.png";
import { CMSAboutSociety } from "@/Types/cms";

const OurSociety = ({ data }: { data?: CMSAboutSociety }) => {
  return (
    <section className="py-10 lg:py-20">
      <div className="container grid md:grid-cols-2 gap-5 md:gap-10 xl:gap-20 items-center">
        {/* Left */}
        <div>
          <h2 className="text-primary-black text-xl md:text-3xl xl:text-5xl font-bold leading-[140%] max-w-[602px] mb-3 md:mb-4 xl:mb-7">
            {data?.title || "We Are the Image of Our Society"}
          </h2>

          <p className="md:text-xl xl:text-2xl text-[#364153] leading-[150%]">
            {data?.description || `Our Social Image (OSI) is more than a platform — it is a movement
            designed to uplift voices, celebrate creativity, and build stronger
            communities. We highlight the culture, stories, and entrepreneurial
            spirit that often go unseen, giving everyday people a place to be
            recognized, supported, and celebrated.`}
          </p>
        </div>

        {/* Right */}
        <div className="h-[320px] md:h-[480px] w-full rounded-xl">
          <Image
            src={data?.image || a1}
            alt="a1"
            width={800}
            height={480}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default OurSociety;
