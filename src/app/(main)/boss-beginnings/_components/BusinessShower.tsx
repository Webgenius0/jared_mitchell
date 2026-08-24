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
        <p className="text-center text-primary-black text-base md:text-lg xl:text-2xl max-w-[1414px] mx-auto">
          {data?.description ??
            "OSI Top Business Launch Award is Our Social Image's groundbreaking celebration for entrepreneurs launching new businesses. Just like a baby shower or bridal shower — but for business — we gather the community to show support, bring gifts, offer resources, and uplift the entrepreneur with love, visibility, and opportunity."}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {features.map((item, idx) => {
            const Icon = iconMap[idx % iconMap.length];
            return (
              <div key={idx} className="flex items-center flex-col gap-7">
                <div className="size-[100px] flex items-center justify-center rounded-full bg-[#1977DD29]">
                  <Icon />
                </div>
                <div className="space-y-3 text-center">
                  <h5 className="text-primary-black text-2xl md:text-[28px] xl:text-[32px] font-semibold leading-snug">
                    {item.title}
                  </h5>
                  <p className="text-[#4A5565] text-base md:text-lg xl:text-2xl">
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
