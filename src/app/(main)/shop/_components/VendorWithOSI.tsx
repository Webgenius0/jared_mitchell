import Container from "@/Components/Common/Container";
import {
  SCardSvg1,
  SCardSvg2,
  SCardSvg3,
  SCardSvg4,
} from "@/Components/Svg/SvgContainer";

const supportCards = [
  {
    id: "business-launch",
    title: "OSI Top Business Launch Award Support Credit",
    subtitle: "Help celebrate a new business launch.",
    impactText: "Funds celebration posts, features, and support packages",
    price: 25,
    priceLabel: "$25",
    icon: SCardSvg1,
  },
  {
    id: "spotlight-pack",
    title: "Spotlight Support Pack",
    subtitle: "Sponsor an artist or business spotlight.",
    impactText: "Gives visibility to deserving creators",
    price: 50,
    priceLabel: "$50",
    icon: SCardSvg2,
  },
  {
    id: "event-fund",
    title: "Event Fund Contribution",
    subtitle: "Support community events and vendor markets.",
    impactText: "Makes local events accessible and impactful",
    price: 75,
    priceLabel: "$75",
    icon: SCardSvg3,
  },
  {
    id: "pay-it-forward",
    title: "Pay It Forward Credits",
    subtitle: "General support for OSI community programs.",
    impactText: "Funds free resources, tools, and opportunities",
    price: null,
    priceLabel: "Custom",
    icon: SCardSvg4,
  },
];

const VendorWithOSI = () => {
  return (
    <section className="section">
      <Container>
        <div className="bg-[#1977DD] rounded-2xl py-6 px-2.5 sm:px-6">
          <h2 className="section_title !text-white">Vendor With OSI</h2>
          <p className="section_sub_title !text-white">
            Showcase your products and services at OSI events. Get exposure,
            connect with customers, and grow your business.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-6 mt-8 sm:mt-12">
            {supportCards?.map((data, index) => (
              <div
                key={index}
                className="px-2 sm:px-5 py-2 sm:py-6 bg-[#FFFFFF1A] border border-[#FFFFFF33] rounded-xl flex flex-col justify-between"
              >
                <div>
                  <div className="size-12 flex items-center justify-center bg-[#FFFFFF33] rounded-full">
                    <data.icon />
                  </div>
                  <h5 className="text-2xl text-white mt-1 font-medium">
                    {data.title}
                  </h5>
                  <p className="mt-2 text-lg text-[#DBEAFE] tracking-wider">
                    {data.subtitle}
                  </p>
                </div>
                <div>
                  <div className="px-3 py-2 space-y-1 rounded-[10px] bg-[#FFFFFF1A] mt-4">
                    <p className="text-[#DBEAFE] text-lg">Impact:</p>
                    <p className="text-white text-lg tracking-wider">
                      {data.impactText}
                    </p>
                  </div>
                  <div className="mt-5 flex items-center justify-between gap-1">
                    <p className="text-xl text-white">${data.price}</p>
                    <button className="px-[18px] py-2 text-tertiary-blue bg-white border border-current transition-colors hover:bg-tertiary-blue hover:text-white rounded-full">
                      Support
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default VendorWithOSI;
