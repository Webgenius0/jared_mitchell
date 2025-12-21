import { Button } from "@/Components/Common/Button";
import Container from "@/Components/Common/Container";
import Image from "next/image";

const SocialImage = () => {
  return (
    <section className="section">
      <Container>
        <div className="flex max-lg:flex-col items-center gap-10 2xl:gap-20">
          <div className="flex-1">
            <h2 className="section_title !text-left">
              Grow With Our Social Image
            </h2>
            <p className="text-2xl text-secondary-black mt-7 mb-9">
              Our Social Image isn't just a platform — it's an ecosystem
              designed to amplify your voice, elevate your work, and help you
              grow your brand with purpose. You'll gain access to tools,
              visibility channels, community support, and AI-driven insights
              that help you understand your audience, improve your image, and
              reach real people who want to support your journey. Whether you're
              an artist, entrepreneur, student, business owner, or creator — OSI
              is built to help you thrive.
            </p>
            <Button>Join the Movement</Button>
          </div>
          <figure className="max-w-[665px] lg:w-1/2 2xl:w-full h-[616px] rounded-2xl md:rounded-3xl overflow-hidden">
            <Image
              src={"/services/social-image.jpg"}
              width={665}
              height={616}
              alt=""
              className="size-full object-cover"
            />
          </figure>
        </div>
      </Container>
    </section>
  );
};

export default SocialImage;
