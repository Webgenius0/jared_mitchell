import hostImg from "@/Assets/host.png";
import {
  HFourSvg,
  HOneSvg,
  HThreeSvg,
  HTwoSvg,
} from "@/Components/Svg/SvgContainer";
import Image from "next/image";

const data = [
  {
    icon: <HOneSvg />,
    title: "AI Promotion",
    description: "Automated social media posting and marketing",
  },
  {
    icon: <HTwoSvg />,
    title: "Community Reach",
    description: "Access to OSI's engaged member base",
  },
  {
    icon: <HThreeSvg />,
    title: "Event Tools",
    description: "RSVP management and analytics dashboard",
  },
  {
    icon: <HFourSvg />,
    title: "Growth Support",
    description: "Partner opportunities and vendor coordination",
  },
];

const EventHost = () => {
  return (
    <section className="py-20 container">
      <div className="flex gap-16  items-center">
        {/* Left */}
        <div>
          <h3 className="text-primary-black text-5xl font-bold leading-[140%] mb-3">
            Host Your Event With OSI
          </h3>

          <p className="text-2xl text-[#1D1D1F] leading-[150%] max-w-[90%] mb-8">
            Got a workshop, pop-up, showcase, or community gathering? OSI
            members can host their events on our platform — with AI promotion
            tools, social posting, partner support, and vendor opportunities.
          </p>

          <div className=" grid grid-cols-2 gap-y-10 gap-x-14 mb-7">
            {data?.map(item => (
              <div key={item?.title} className="flex gap-5 items-center">
                <p className="grid place-items-center size-16 rounded-full bg-[#F1F5F9] border border-[#00000007]">
                  {item?.icon}
                </p>

                <div>
                  <h4 className="text-2xl font-medium text-[#364153] mb-1">
                    {item?.title}
                  </h4>
                  <p className="text-xl text-[#45556C]">{item?.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-5 items-center max-w-[80%]">
            <button className="px-7 rounded-full cursor-pointer bg-primary-blue text-white py-2.5 text-lg">
              Submit Event
            </button>

            <button className="px-7 rounded-full cursor-pointer text-[#314158] bg-[#F1F5F9] py-2.5 text-lg">
              Learn Member Benefits
            </button>
          </div>
        </div>

        {/* Right */}
        <div className="w-[600px] h-[550px] rounded-lg relative overflow-hidden shrink-0">
          <Image
            src={hostImg}
            alt="host_img"
            unoptimized
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default EventHost;
