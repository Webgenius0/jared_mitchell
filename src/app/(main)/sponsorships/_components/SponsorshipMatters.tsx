import Container from "@/Components/Common/Container";
import {
  SMatterSvg1,
  SMatterSvg2,
  SMatterSvg3,
} from "@/Components/Svg/SvgContainer";
import { CMSSponsorshipPageWhy } from "@/Types/cms";

interface SponsorshipMattersProps {
  data: CMSSponsorshipPageWhy;
}

const iconMap = [SMatterSvg1, SMatterSvg2, SMatterSvg3];

const SponsorshipMatters = ({ data }: SponsorshipMattersProps) => {
  const features = data?.metadata?.features ?? [];
  const supports = data?.metadata?.supports ?? [];

  return (
    <section className="section bg-[#F5F5F7]">
      <Container>
        <h2 className="section_title 2xl:!text-[76px]">
          {data?.title ?? "Why Your Sponsorship Matters"}
        </h2>
        <p className="text-center text-primary-black text-2xl max-w-[1414px] mx-auto">
          {data?.sub_title ??
            "Our Social Image is more than a platform — it's a movement. We amplify local businesses, creatives, entrepreneurs, families, and community leaders through media, events, interviews, spotlights, newsletters, and original video channels. Sponsorship funding directly supports:"}
        </p>

        {supports.length > 0 ? (
          <div className="flex justify-center items-center flex-wrap gap-x-7 text-2xl text-primary-black font-semibold mt-[40px]">
            {supports.map((item, idx) => (
              <p key={idx}>
                {idx + 1}. {item}
              </p>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center flex-wrap gap-x-7 text-2xl text-primary-black font-semibold mt-[40px]">
            <p>1. Community events and vendor showcases,</p>
            <p>2. Artist & business spotlight production,</p>
            <p>3. Youth development and creative programs,</p>
            <p>4. Professional media coverage for underserved communities,</p>
            <p>5. Technology, automation, and outreach tools</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-[60px]">
          {(features.length > 0 ? features : []).map((item, idx) => {
            const Icon = iconMap[idx % iconMap.length];
            return (
              <div key={idx} className="flex items-center flex-col gap-7">
                <div className="size-[100px] flex items-center justify-center rounded-full bg-[#1977DD29]">
                  <Icon />
                </div>
                <div className="space-y-3 text-center">
                  <h5 className="text-primary-black text-[32px] font-semibold">
                    {item.title}
                  </h5>
                  <p className="text-[#4A5565] text-2xl">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default SponsorshipMatters;
