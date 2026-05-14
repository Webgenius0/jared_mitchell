import author from "@/Assets/author.png";
import Image from "next/image";

const FounderMessage = () => {
  return (
    <section className="py-10 container">
      <h2 className="text-primary-black text-2xl md:text-4xl xl:text-5xl font-bold leading-[140%] text-center mb-8 xl:mb-14">
        A Message From the Founder
      </h2>

      <div className="flex flex-col md:flex-row justify-center gap-5 md:gap-8 xl:gap-14 items-center">
        {/* Left */}
        <figure className="w-full md:w-[300px] h-[370px] xl:h-[400px] rounded-xl shrink-0">
          <Image
            src={author}
            alt="author"
            className="w-full h-full rounded-xl"
          />
        </figure>

        {/* Right */}
        <div className="rounded-xl max-w-[666.672px] p-5 md:p-8 xl:p-12 border-l-8 border-l-primary-blue shadow-[0_4px_20px_0_rgba(0,0,0,0.07)]">
          <blockquote className="text-[#364153] leading-[150%] md:text-xl xl:text-2xl mb-5">
            "Our Social Image was built with love, purpose, and belief in
            people. This platform exists to highlight the culture of our society
            — the hustlers, the artists, the entrepreneurs, the dreamers, and
            the creatives. Together, we are rewriting what community looks like:
            supportive, collaborative, and powerful."
          </blockquote>

          <p className="text-[#1D1D1F] md:text-xl xl:text-2xl font-medium mb-1">
            — Jared Mitchell Sr., Founder & CEO
          </p>

          <p className="text-[#364153] text-lg">Our Social Image</p>
        </div>
      </div>
    </section>
  );
};

export default FounderMessage;
