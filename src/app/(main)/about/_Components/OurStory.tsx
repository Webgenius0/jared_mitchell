import Image from "next/image";
import a2 from "@/Assets/a2.png";

const OurStory = () => {
  return (
    <section className="py-20 bg-[#F5F5F7]">
      <div className="container grid grid-cols-2 gap-12 items-center">
        {/* Left */}
        <div className="h-[480px] w-full rounded-xl">
          <Image
            src={a2}
            alt="a2"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>

        {/* Right */}
        <div>
          <h2 className="text-primary-black text-5xl font-bold leading-[140%] max-w-[602px] mb-5">
            Our Origin Story
          </h2>

          <div className="space-y-3.5">
            <p className="text-[22px] text-[#364153] leading-[150%]">
              OSI was created from one simple truth: people deserve to be seen.
              Too often, small businesses, artists, and creators struggle to
              gain visibility — not because they lack talent, passion, or value,
              but because they lack resources and support.
            </p>
            <p className="text-[22px] text-[#364153] leading-[150%]">
              We built OSI to change that. To give people a platform. To create
              a space where culture, creativity, and community come together.
            </p>
            <p className="text-[22px] text-[#364153] leading-[150%]">
              What started as an idea grew into a powerful movement: A place
              where individuals can showcase their work, tell their stories, and
              connect with opportunities that once felt out of reach.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
