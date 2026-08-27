import Image from "next/image";
import a2 from "@/Assets/a2.png";
import { CMSAboutOrigin } from "@/Types/cms";

const OurStory = ({ data }: { data?: CMSAboutOrigin }) => {
  return (
    <section className="py-8 md:py-8 lg:py-12 xl:py-20 bg-[#F5F5F7]">
      <div className="container grid md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 xl:gap-12 items-center">
        {/* Left */}
        <div className="h-[260px] md:h-[340px] lg:h-[400px] xl:h-[480px] w-full rounded-xl order-1 md:order-0">
          <Image
            src={data?.image || a2}
            alt="a2"
            width={800}
            height={480}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>

        {/* Right */}
        <div className="order-0 md:order-1">
          <h2 className="text-primary-black text-xl md:text-2xl lg:text-3xl xl:text-5xl font-bold leading-[140%] max-w-[602px] mb-2 md:mb-3 lg:mb-5">
            {data?.title || "Our Origin Story"}
          </h2>

          <div className="space-y-3 md:space-y-3.5 text-sm md:text-base lg:text-lg xl:text-[22px] text-[#364153] leading-[150%]">
            {data?.description ? (
              <p>{data.description}</p>
            ) : (
              <>
                <p className="">
                  OSI was created from one simple truth: people deserve to be seen.
                  Too often, small businesses, artists, and creators struggle to
                  gain visibility — not because they lack talent, passion, or value,
                  but because they lack resources and support.
                </p>
                <p className="">
                  We built OSI to change that. To give people a platform. To create
                  a space where culture, creativity, and community come together.
                </p>
                <p className="">
                  What started as an idea grew into a powerful movement: A place
                  where individuals can showcase their work, tell their stories, and
                  connect with opportunities that once felt out of reach.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
