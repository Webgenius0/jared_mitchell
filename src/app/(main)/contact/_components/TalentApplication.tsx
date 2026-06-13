import { Button } from "@/Components/Common/Button";
import Container from "@/Components/Common/Container";
import Image from "next/image";
import { IoArrowForwardSharp } from "react-icons/io5";

const TalentApplication = () => {
  return (
    <section className="section bg-[#F5F5F7]">
      <Container>
        <h2 className="section_title  max-w-[1062px] w-full mx-auto">
          Submit a Spotlight Story or Talent Application
        </h2>
        {/* <h2 className='section_title 2xl:!text-[76px] max-w-[1062px] w-full mx-auto'>Submit a Spotlight Story or Talent Application</h2> */}
        <p className="section_sub_title max-w-[1242px] w-full mx-auto">
          If you are an artist, business owner, creator, or entrepreneur wishing
          to be considered for a feature on Our Social Image, please complete
          the appropriate submission form below. Do not use the general contact
          form for spotlight submissions.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 sm:mt-14">
          {Array(2)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="flex flex-col gap-6 rounded-2xl custom_border custom_shadow bg-white overflow-hidden"
              >
                <figure className="h-[300px] relative">
                  <div className="size-full absolute bg-black/60" />
                  <Image
                    src={
                      "https://i.ibb.co.com/7N1SPVbJ/73c081ffcb7d91a66584c237d6660809910ae14b.jpg"
                    }
                    width={762}
                    height={300}
                    alt=""
                    className="size-full object-cover"
                  />
                </figure>
                <div className="px-6 space-y-3">
                  <h5 className="text-primary-black text-[28px] font-semibold">
                    Artist Spotlight
                  </h5>
                  <p className="text-primary-black text-2xl">
                    Share your creative journey, showcase your work, and connect
                    with a community that celebrates artistry.
                  </p>
                </div>
                <div className="px-6 pb-[31px]">
                  <Button className="w-full">
                    Artist Submission Form{" "}
                    <IoArrowForwardSharp className="size-6" />
                  </Button>
                </div>
              </div>
            ))}
        </div>
      </Container>
    </section>
  );
};

export default TalentApplication;
