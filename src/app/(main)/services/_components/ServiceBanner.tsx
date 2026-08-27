import serviceBg from "@/Assets/serviceBg.png";
import about_us_logo from "@/Assets/about_us_logo.png";
import Image from "next/image";
import { CMSServicesHero } from "@/Types/cms";

const ServiceBanner = ({ data }: { data?: CMSServicesHero }) => {
  const bgImage = data?.bg || serviceBg.src;
  return (
    <section
      style={{
        backgroundImage: `
          linear-gradient(0deg, rgba(0,0,0,0.1), rgba(0,0,0,0.1)),
          url(${bgImage})
        `,
      }}
      className="h-[260px] md:h-[320px] lg:h-[360px] xl:h-[500px] bg-no-repeat bg-center bg-cover"
    >
      <div className="h-full container flex flex-col items-center justify-center">
        <figure className="w-[120px] md:w-[150px] lg:w-[170px] xl:w-[238px] xl:h-[161px]">
          <Image
            src={data?.image || about_us_logo}
            alt="about_us_logo"
            width={238}
            height={161}
            unoptimized
            className="w-full h-full object-cover"
          />
        </figure>

        <h2 className="text-[18px] md:text-3xl lg:text-4xl xl:text-5xl font-semibold md:leading-[150%] text-white text-center max-w-[968px] mx-auto">
          {data?.title || "Empower your growth with the tools, visibility, and AI insights of"}
        </h2>

        <p className="text-[#5E90FF] text-center text-sm md:text-base lg:text-lg xl:text-[26px] pt-2 md:pt-3 lg:pt-5">
          {data?.sub_title || "Our Social Image"}
        </p>
      </div>
    </section>
  );
};

export default ServiceBanner;
