import Container from "@/Components/Common/Container";
import { pastEvents } from "@/Components/Data/data";
import Image from "next/image";
import { GoArrowRight } from "react-icons/go";

const PastEvents = () => {
  return (
    <Container>
      <h2 className="section_title 2xl:text-7xl 2xl:font-bold">
        Past Event Highlights
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 my-10">
        {pastEvents?.map((data, index) => (
          <div className="rounded-[20px] custom_border custom_shadow bg-[#F5F5F7] overflow-hidden">
            <div
              key={data.id}
              className="relative flex items-center justify-center w-full h-[300px]"
            >
              <Image
                src={data.image}
                width={500}
                height={300}
                alt="image"
                className="size-full object-cover"
              />
              <div className="absolute flex items-end pl-6 pb-4 top-0 left-0 size-full bg-[linear-gradient(0deg,_rgba(0,0,0,0.5)_0%,_rgba(0,0,0,0.5)_100%)]">
                <div className="space-y-2">
                  <h4 className="text-2xl font-semibold text-white">
                    {data.title}
                  </h4>
                  <p className="text-primary-gray text-xl tracking-wider">
                    {data.description}
                  </p>
                </div>
              </div>
            </div>
            <div className="text-xl text-primary-blue flex items-center gap-2 px-6 py-5">
              View Recap
              <GoArrowRight />
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default PastEvents;
