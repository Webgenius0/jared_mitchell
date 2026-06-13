import Container from "@/Components/Common/Container";
import { HiArrowLongRight } from "react-icons/hi2";
import { CMSSponsorshipPageSteps } from "@/Types/cms";

interface HowSponsorshipWorksProps {
  data: CMSSponsorshipPageSteps;
}

const fallbackSteps = [
  {
    title: "1. Choose Your Tier",
    description:
      "Select the sponsorship level that aligns with your brand's goals.",
    list: [],
  },
  {
    title: "2. Send Us Your Ad",
    description: "Sponsors provide the ads they want displayed:",
    list: [
      "Images",
      "Flyers",
      "Videos (15 sec or 30 sec depending on tier)",
      "Logos",
      "Written promos",
    ],
  },
  {
    title: "3. We Do The Rest (AI + Human Team)",
    description: "Our automated system ensures:",
    list: [
      "Posting schedule",
      "Social media rotation",
      "Ad placement on OSI channels",
      "Newsletter highlights",
      "Event promotion",
      "Spotlight priority (when included)",
    ],
  },
  {
    title: "4. Ongoing Exposure",
    description:
      "Your ads run weekly on OSI social channels, OSI video channels, magazine features, and community announcements depending on tier.",
    list: [],
  },
  {
    title: "5. Full Reporting",
    description:
      "We provide weekly insights, reach, impressions, and engagement data.",
    list: [],
  },
];

const HowSponsorshipWorks = ({ data }: HowSponsorshipWorksProps) => {
  const steps = data?.metadata?.length > 0 ? data.metadata : fallbackSteps;

  // last step spans full width if odd total
  const mainSteps = steps.slice(0, -1);
  const lastStep = steps[steps.length - 1];

  return (
    <section className="section">
      <Container>
        <h2 className="section_title ">
        {/* <h2 className="section_title 2xl:!text-[76px]"> */}
          {data?.title ?? "How Sponsorship Works"}
        </h2>
        <div className="grid grid-cols-2 gap-6 items-center mt-11">
          {mainSteps.map((step, idx) => (
            <div
              key={idx}
              className="bg-white max-lg:col-span-2 custom_border custom_shadow rounded-2xl flex flex-col gap-4 justify-center p-6 h-fit"
            >
              <p className="text-2xl text-primary-black font-semibold">
                {step.title}
              </p>
              <p className="text-2xl text-primary-black">{step.description}</p>
              {step.list?.length > 0 && (
                <div className="space-y-1 text-primary-black text-xl">
                  {step.list.map((item, i) => (
                    <p key={i} className="flex items-center gap-2">
                      <HiArrowLongRight className="text-[#155DFC] size-6" />
                      {item}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}

          {lastStep && (
            <div className="bg-white col-span-2 max-w-[762px] w-full mx-auto custom_border custom_shadow rounded-2xl flex flex-col gap-4 justify-center p-6 h-fit">
              <p className="text-2xl text-primary-black font-semibold">
                {lastStep.title}
              </p>
              <p className="text-2xl text-primary-black">
                {lastStep.description}
              </p>
              {lastStep.list?.length > 0 && (
                <div className="space-y-1 text-primary-black text-xl">
                  {lastStep.list.map((item, i) => (
                    <p key={i} className="flex items-center gap-2">
                      <HiArrowLongRight className="text-[#155DFC] size-6" />
                      {item}
                    </p>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};

export default HowSponsorshipWorks;
