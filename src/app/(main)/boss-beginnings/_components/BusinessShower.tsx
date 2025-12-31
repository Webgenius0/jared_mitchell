import Container from "@/Components/Common/Container";
import { BShower1, BShower2, BShower3 } from "@/Components/Svg/SvgContainer";

const data = [
  {
    id: "1",
    icon: BShower1,
    title: "Gifts & Resources",
    description:
      "Community members and sponsors provide tangible support, business tools, and resources to help launch successfully.",
  },
  {
    id: "1",
    icon: BShower2,
    title: "Gifts & Resources",
    description:
      "Community members and sponsors provide tangible support, business tools, and resources to help launch successfully.",
  },
  {
    id: "1",
    icon: BShower3,
    title: "Gifts & Resources",
    description:
      "Community members and sponsors provide tangible support, business tools, and resources to help launch successfully.",
  },
];
const BusinessShower = () => {
  return (
    <section className="section">
      <Container>
        <h2 className="section_title 2xl:!text-[76px]">
          What Is a Business Shower?
        </h2>
        <p className="text-center text-primary-black text-2xl max-w-[1414px] mx-auto">
          Boss Beginnings is Our Social Image's groundbreaking celebration for
          entrepreneurs launching new businesses. Just like a baby shower or
          bridal shower — but for business — we gather the community to show
          support, bring gifts, offer resources, and uplift the entrepreneur
          with love, visibility, and opportunity.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {data?.map((data, idx) => (
            <div key={idx} className="flex items-center flex-col gap-7">
              <div className="size-[100px] flex items-center justify-center rounded-full bg-[#1977DD29]">
                <data.icon />
              </div>
              <div className="space-y-3 text-center ">
                <h5 className="text-primary-black text-[32px] font-semibold">
                  {data.title}
                </h5>
                <p className="text-[#4A5565] text-2xl"> {data.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default BusinessShower;
