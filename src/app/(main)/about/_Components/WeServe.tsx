import Image from "next/image";
import a3 from "@/Assets/a3.png";
import { CMSAboutWhoWeServe } from "@/Types/cms";

const WeServe = ({ data }: { data?: CMSAboutWhoWeServe }) => {
  return (
    <section className="py-10 xl:py-20">
      <div className="container grid md:grid-cols-2 gap-5 md:gap-10 xl:gap-20 items-center">
        {/* Left */}
        <div>
          <h2 className="text-primary-black text-3xl md:text-4xl xl:text-5xl font-bold leading-[140%] max-w-[602px] mb-3 xl:mb-5">
            {data?.title || "Who We Serve"}
          </h2>

          <div className="text-lg md:text-xl xl:text-2xl text-[#364153] leading-[150%] space-y-4">
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
        <div className="h-[320px] md:h-[480px] w-full rounded-xl">
          <Image
            src={data?.image || a3}
            alt="a3"
            width={800}
            height={480}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default WeServe;
