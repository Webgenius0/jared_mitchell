import Image from "next/image";
import a3 from "@/Assets/a3.png";

const WeServe = () => {
  return (
    <section className="py-20">
      <div className="container grid grid-cols-2 gap-20 items-center">
        {/* Left */}
        <div>
          <h2 className="text-primary-black text-5xl font-bold leading-[140%] max-w-[602px] mb-5">
            Who We Serve
          </h2>

          <p className="text-2xl text-[#364153] leading-[150%]">
            Our Social Image is built for: Small business owners, entrepreneurs,
            creators, visual artists, designers, musicians, models, nonprofits,
            students, emerging talent, and individuals with a story worth
            sharing.
          </p>

          <p className="text-2xl text-[#364153] leading-[150%] pt-4">
            If you have passion, purpose, or creativity — OSI is for you.
          </p>
        </div>

        {/* Right */}
        <div className="h-[480px] w-full rounded-xl">
          <Image
            src={a3}
            alt="a3"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default WeServe;
