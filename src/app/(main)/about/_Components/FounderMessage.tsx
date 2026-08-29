import author from "@/Assets/author.png";
import Image from "next/image";
import { CMSAboutFounderMessage } from "@/Types/cms";

const FounderMessage = ({ data }: { data?: CMSAboutFounderMessage }) => {
  const founder = data?.metadata?.[0];
  return (
    <section className="py-8 md:py-8 lg:py-10 container">
      <h2 className="text-primary-black text-xl md:text-2xl lg:text-3xl xl:text-5xl font-bold leading-[140%] text-center mb-6 md:mb-7 lg:mb-8 xl:mb-14">
        {data?.title || "A Message From the Founder"}
      </h2>

      <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-5 lg:gap-6 xl:gap-14 items-center">
        {/* Left */}
        <figure className="w-full md:w-[240px] lg:w-[260px] xl:w-[300px] h-[300px] md:h-[320px] lg:h-[350px] xl:h-[400px] shrink-0 relative">
          <Image
            src={founder?.image || author}
            alt="author"
            fill
            className="w-full h-full object-cover"
          />
        </figure>

        {/* Right */}
        <div className="rounded-xl max-w-[666.672px] p-4 md:p-5 lg:p-6 xl:p-12 border-l-4 md:border-l-6 lg:border-l-8 border-l-primary-blue shadow-[0_4px_20px_0_rgba(0,0,0,0.07)]">
          <blockquote className="text-[#364153] leading-[150%] text-sm md:text-base lg:text-lg xl:text-2xl mb-4 lg:mb-5">
            "{founder?.message || `Our Social Image was built with love, purpose, and belief in
            people. This platform exists to highlight the culture of our society
            — the hustlers, the artists, the entrepreneurs, the dreamers, and
            the creatives. Together, we are rewriting what community looks like:
            supportive, collaborative, and powerful.`}"
          </blockquote>

          <p className="text-[#1D1D1F] text-sm md:text-base lg:text-lg xl:text-2xl font-medium mb-1">
            — {founder?.name || "Jared Mitchell Sr."}{founder?.designation ? `, ${founder.designation}` : ", Founder & CEO"}
          </p>

          <p className="text-[#364153] text-sm md:text-base lg:text-lg">{founder?.sub_label || "Our Social Image"}</p>
        </div>
      </div>
    </section>
  );
};

export default FounderMessage;
