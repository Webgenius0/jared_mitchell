import aboutBg from "@/Assets/about.jpg";
import about_us_logo from "@/Assets/about_us_logo.png";
import Image from "next/image";

const AboutBanner = () => {
  return (
    <section
      style={{
        backgroundImage: `
          linear-gradient(0deg, rgba(0,0,0,0.4), rgba(0,0,0,0.4)),
          url(${aboutBg.src})
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

        <h2 className="text-[70px] font-bold text-white">About Us</h2>

        <p className="text-[#F5F5F7] text-[26px] pt-5">
          Building bridges between business, art, and community
        </p>
      </div>
    </section>
  );
};

export default AboutBanner;
