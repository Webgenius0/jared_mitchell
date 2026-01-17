import Image from "next/image";
import osi from "@/Assets/osi.png";

const WhyChoose = () => {
  return (
    <div className="container py-20">
      <div className="mb-10">
        <h2 className="section_title uppercase">Why Choose OSI?</h2>

        <p className="section_sub_title">
          Fostering a culture of support, respect, and shared progress.
        </p>
      </div>

      <section className="w-full max-h-[580px] h-full overflow-hidden flex items-center relative rounded">
        <Image
          src={osi}
          width={1920}
          height={580}
          alt="home banner"
          className="object-cover w-full rounded"
        />

        <div className="w-full h-full absolute top-0 bg-black/25 rounded">
          <div className="flex flex-col w-full mx-auto h-full items-center justify-center">
            <h2 className="section_title !text-white">Creators</h2>

            <h4 className="text-white text-3xl font-medium mb-4">
              Build exposure without chasing algorithms
            </h4>

            <p className="section_sub_title max-w-[1280px] mx-auto !text-[#f5f5f7d3]">
              Share your work through OSI spotlights, features, and campaigns
              that help your story reach the right audience.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyChoose;
