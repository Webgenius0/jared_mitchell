import { Button } from "@/Components/Common/Button";
import Container from "@/Components/Common/Container";
import { membershipPlans } from "@/Components/Data/data";
import { BsDot } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
import { IoMdCheckmark } from "react-icons/io";

const SponsorshipLevel = () => {
  return (
    <section className="section">
      <Container>
        <h2 className="section_title 2xl:!text-[76px]">
          Choose Your Sponsorship Level
        </h2>
        <p className="text-2xl text-primary-black max-w-[1025px] w-full mx-auto text-center">
          Every tier is designed to promote your business, increase visibility,
          and support community events — choose the plan that fits your goals.
        </p>
        <div className="mt-12 grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 ">
          {membershipPlans?.map((plan, idx) => (
            <div
              key={idx}
              className="bg-white custom_shadow custom_border rounded-2xl px-5 py-8 flex flex-col justify-between gap-[35px] h-full"
            >
              <div>
                <div
                  style={{ backgroundColor: plan.iconBgColor }}
                  className={`size-[100px] mx-auto mb-4 rounded-full flex items-center justify-center`}
                >
                  <plan.icon />
                </div>
                <h6 className="text-2xl font-bold text-center text-[#0A0A0A]">
                  {plan.name}
                </h6>
                <div className="text-center text-[44px] text-primary-black">
                  {plan.price}
                  <span className="text-lg text-secondary-black">/month</span>
                </div>
                <div className="mt-8 space-y-3">
                  <p className="text-primary-blue text-lg font-bold">
                    Who It's For:
                  </p>
                  <p className="text-secondary-black tracking-wider">
                    {plan.description}
                  </p>
                  <p className="text-primary-black text-lg font-bold">
                    Includes:
                  </p>
                  {plan.includes?.map((include, index) => (
                    <p
                      key={index}
                      className="flex gap-1.5 text-secondary-black"
                    >
                      <IoMdCheckmark className="size-6 shrink-0 text-primary-blue" />
                      {include}
                    </p>
                  ))}
                </div>
              </div>
              <div className="">
                <div className="space-y-3 mb-[42px] min-h-[150px] h-auto">
                  <p className="text-primary-black text-lg font-bold">
                    What You Provide:
                  </p>
                  {plan.provides?.map((provide, idx) => (
                    <p key={idx} className="flex gap-1.5 text-secondary-black">
                      <BsDot className="size-6 shrink-0 text-primary-blue" />
                      
                      {provide}
                    </p>
                    
                  ))}
                </div>
                <div className="border-t border-[#00000029] pt-3 mb-[72px]">
                  <p className="text-primary-blue text-lg font-bold mb-3">
                    Impact:
                  </p>
                  <p className="text-secondary-black">{plan.impact}</p>
                </div>
                <button className="bg-primary-blue text-white rounded-full font-medium w-full py-2.5 tracking-wide">
                  Select {plan.name}
                </button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default SponsorshipLevel;
