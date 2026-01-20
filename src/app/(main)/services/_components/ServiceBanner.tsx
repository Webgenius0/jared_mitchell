import serviceBg from "@/Assets/serviceBg.png";
import about_us_logo from "@/Assets/about_us_logo.png";
import Image from "next/image";

const ServiceBanner = () => {
  return (
    <section
      style={{
        backgroundImage: `
          linear-gradient(0deg, rgba(0,0,0,0.1), rgba(0,0,0,0.1)),
          url(${serviceBg.src})
        `,
      }}
      className="h-[500px] bg-no-repeat bg-center bg-cover"
    >
      <div className="h-full container flex flex-col items-center justify-center">
        <figure className="w-[238px] h-[161px]">
          <Image
            src={about_us_logo}
            alt="about_us_logo"
            unoptimized
            className="w-full h-full object-cover"
          />
        </figure>

        <h2 className="text-5xl font-semibold leading-[150%] text-white text-center max-w-[968px] mx-auto">
          Empower your growth with the tools, visibility, and AI insights of
        </h2>

        <p className="text-[#5E90FF] font-bold text-4xl pt-5">
          Our Social Image
        </p>
      </div>
    </section>
  );
};

export default ServiceBanner;
