import Container from "@/Components/Common/Container";
import { BShower1, BShower2, BShower3 } from "@/Components/Svg/SvgContainer";
import { CMSBossBeginningsFeatures } from "@/Types/cms";

const iconMap = [BShower1, BShower2, BShower3];

interface BusinessShowerProps {
  data: CMSBossBeginningsFeatures;
}

const BusinessShower = ({ data }: BusinessShowerProps) => {
  const features = data?.metadata?.features ?? [];

  return (
    <section className="section">
      <Container>
        <h2 className="section_title">
          {/* <h2 className="section_title 2xl:!text-[76px]"> */}
          {data?.title ?? "What Is a Business Shower?"}
        </h2>
        <p className="text-center text-primary-black text-xs md:text-sm lg:text-base xl:text-2xl max-w-[1414px] mx-auto">
          {data?.description ??
            "OSI Top Business Award is Our Social Image's groundbreaking celebration for entrepreneurs launching new businesses. Just like a baby shower or bridal shower — but for business — we gather the community to show support, bring gifts, offer resources, and uplift the entrepreneur with love, visibility, and opportunity."}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-3.5 lg:gap-4 mt-5 md:mt-6 lg:mt-8">
          {features.map((item, idx) => {
            const Icon = iconMap[idx % iconMap.length];
            return (
              <div key={idx} className="flex items-center flex-col gap-3.5 md:gap-4 lg:gap-5">
                <div className="size-13 md:size-14 lg:size-16 xl:size-[100px] flex items-center justify-center rounded-full bg-[#1977DD29]">
                  <Icon />
                </div>
                <div className="space-y-1.5 md:space-y-2 text-center">
                  <h5 className="text-primary-black text-base md:text-lg lg:text-xl xl:text-[32px] font-semibold leading-snug">
                    {item.title}
                  </h5>
                  <p className="text-[#4A5565] text-xs md:text-sm lg:text-base xl:text-2xl">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default BusinessShower;
