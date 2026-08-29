import { Button } from "@/Components/Common/Button";
import Image from "next/image";
import { CMSServicesGrow } from "@/Types/cms";

const SocialImage = ({ data }: { data?: CMSServicesGrow }) => {
  return (
    <section className="section">
      <div className="container">
        <div className="flex max-lg:flex-col items-center gap-6 lg:gap-8 2xl:gap-20">
          {/* Left */}
          <div className="flex-1">
            <h2 className="section_title !text-left">
              {data?.title || "Grow With Our Social Image"}
            </h2>

            <p className="text-sm md:text-base lg:text-lg xl:text-2xl text-secondary-black mt-2 md:mt-3 lg:mt-5 mb-4 md:mb-6">
              {data?.description || `Our Social Image isn't just a platform — it's an ecosystem
              designed to amplify your voice, elevate your work, and help you
              grow your brand with purpose. You'll gain access to tools,
              visibility channels, community support, and AI-driven insights
              that help you understand your audience, improve your image, and
              reach real people who want to support your journey. Whether you're
              an artist, entrepreneur, student, business owner, or creator — OSI
              is built to help you thrive.`}
            </p>

            {/* <Button>Join the Movement</Button> */}
          </div>

          {/* Right */}
          <figure className="w-full max-w-[665px] lg:w-1/2 2xl:w-full h-[280px] md:h-[400px] lg:h-[480px] overflow-hidden relative">
            <Image
              src={data?.image || "/services/social-image.jpg"}
              fill
              unoptimized
              alt=""
              className="size-full object-cover"
            />
          </figure>
        </div>
      </div>
    </section>
  );
};

export default SocialImage;
