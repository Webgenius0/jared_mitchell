import { membershipPlans } from "@/Components/Data/data";
import { CMSSponsorshipPageLevelsHeader } from "@/Types/cms";

interface SponsorshipLevelProps {
  data: CMSSponsorshipPageLevelsHeader;
}

const SponsorshipLevel = ({ data }: SponsorshipLevelProps) => {
  return (
    <section className="section container">
      <h2 className="section_title 2xl:!text-[76px]">
        {data?.title ?? "Choose Your Sponsorship Level"}
      </h2>

      <p className="text-2xl text-primary-black max-w-[1025px] w-full mx-auto text-center">
        {data?.sub_title ??
          "Every tier is designed to promote your business, increase visibility, and support community events — choose the plan that fits your goals."}
      </p>

      <div className="mt-10 grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        {membershipPlans?.map((plan, idx) => (
          <div
            key={idx}
            className="bg-white custom_shadow custom_border rounded-2xl px-5 py-8 flex flex-col justify-between gap-[35px] h-full"
          >
            <div>
              <div className="flex gap-3 items-center mb-4">
                <p
                  style={{ backgroundColor: plan.iconBgColor }}
                  className="size-8 rounded-full flex items-center justify-center"
                >
                  <plan.icon />
                </p>
                <h6 className="text-xl font-medium text-center text-[#637381]">
                  {plan.name}
                </h6>
              </div>

              <h3 className="text-xl text-[#212B36]">{plan?.title}</h3>

              <div className="text-[44px] text-primary-black">
                {plan.price}
                <span className="text-lg text-secondary-black">/month</span>
              </div>

              <p className="text-secondary-black tracking-wider mt-5">
                {plan.description}
              </p>

              <p className="text-gray-500 tracking-wider mt-5">
                {plan.short_desc}
              </p>
            </div>

            <button className="bg-primary-blue text-white rounded-full font-medium w-full py-2.5 tracking-wide">
              Get Started
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SponsorshipLevel;