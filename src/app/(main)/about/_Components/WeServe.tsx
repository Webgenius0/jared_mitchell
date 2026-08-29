import Image from "next/image";
import a3 from "@/Assets/a3.png";
import { CMSAboutWhoWeServe } from "@/Types/cms";

const WeServe = ({ data }: { data?: CMSAboutWhoWeServe }) => {
  return (
    <section className="py-8 md:py-8 lg:py-12 xl:py-20">
      <div className="container grid md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 xl:gap-20 items-center">
        {/* Left */}
        <div>
          <h2 className="text-primary-black text-2xl md:text-2xl lg:text-3xl xl:text-5xl font-bold leading-[140%] max-w-[602px] mb-2 md:mb-2.5 lg:mb-3 xl:mb-5">
            {data?.title || "Who We Serve"}
          </h2>

          <div className="text-sm md:text-base lg:text-lg xl:text-2xl text-[#364153] leading-[150%] space-y-3 lg:space-y-4">
            {data?.description ? (
              <p>{data.description}</p>
            ) : (
              <>
                <p>
                  Our Social Image is built for: Small business owners, entrepreneurs,
                  creators, visual artists, designers, musicians, models, nonprofits,
                  students, emerging talent, and individuals with a story worth
                  sharing.
                </p>

                <p className="pt-4">
                  If you have passion, purpose, or creativity — OSI is for you.
                </p>
              </>
            )}
          </div>
        </div>

        {/* Right */}
        <div className="h-[260px] md:h-[340px] lg:h-[400px] xl:h-[480px] w-full ">
          <Image
            src={data?.image || a3}
            alt="a3"
            width={800}
            height={480}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default WeServe;
