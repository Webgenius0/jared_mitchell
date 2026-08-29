import aboutBg from "@/Assets/about.jpg";
import about_us_logo from "@/Assets/about_us_logo.png";
import Image from "next/image";
import { CMSAboutHero } from "@/Types/cms";

const AboutBanner = ({ data }: { data?: CMSAboutHero }) => {
  const bgImage = data?.bg || aboutBg.src;
  return (
    <section
      style={{
        backgroundImage: `
          linear-gradient(0deg, rgba(0,0,0,0.4), rgba(0,0,0,0.4)),
          url(${bgImage})
        `,
      }}
      className="h-[220px] md:h-[260px] lg:h-[300px] xl:h-[500px] bg-no-repeat bg-center bg-cover"
    >
      <div className="h-full container flex flex-col items-center justify-center">
        <figure className="w-[120px] md:w-[130px] lg:w-[150px] xl:w-[238px] xl:h-[161px]">
          <Image
            src={data?.image || about_us_logo}
            alt="about_us_logo"
            width={238}
            height={161}
            unoptimized
            className="w-full h-full object-cover"
          />
        </figure>

        <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-[70px] font-bold text-white">
          {data?.title || "About Us"}
        </h2>

        <p className="text-[#F5F5F7] text-center text-xs md:text-sm lg:text-base xl:text-[26px] pt-1.5 md:pt-2 lg:pt-3">
          {data?.sub_title || "Building bridges between business, art, and community"}
        </p>
      </div>
    </section>
  );
};

export default AboutBanner;
