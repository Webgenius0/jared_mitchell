import Container from "@/Components/Common/Container";
import { cn } from "@/lib/utils";
import {
  FiActivity,
  FiArchive,
  FiAward,
  FiClock,
  FiRefreshCw,
  FiStar,
  FiThumbsUp,
  FiUsers,
} from "react-icons/fi";

type SpotlightType = "artist" | "business";

interface HowSpotlightWorksProps {
  type: SpotlightType;
}

const steps = [
  {
    icon: FiUsers,
    title: "Weekly Nominee Selection",
    description:
      "At the start of each weekly cycle, eligible artists and businesses are selected as Spotlight nominees. Artist nominees compete only against other artists, and business nominees compete only against other businesses. Once selected, their profiles are presented to the public for voting.",
  },
  {
    icon: FiThumbsUp,
    title: "Public Voting Opens",
    description:
      "During the voting period, visitors support their favorite nominee with free votes or by purchasing additional paid votes. Both are recorded by the system and applied to the nominee's overall vote total.",
  },
  {
    icon: FiActivity,
    title: "Votes Are Automatically Tracked",
    description:
      "The platform tracks every vote electronically — no manual counting. Voting data is managed automatically so the competition runs consistently from week to week with minimal administrative work.",
  },
  {
    icon: FiClock,
    title: "Voting Closes",
    description:
      "When the weekly voting period reaches its scheduled end time, voting closes and the system automatically calculates the final vote totals for every nominee in each category.",
  },
  {
    icon: FiAward,
    title: "Weekly Winners Are Determined",
    description:
      "The nominee with the highest final vote total in each category becomes that week's winner — producing two weekly winners: Artist Spotlight of the Week and Business Spotlight of the Week.",
  },
  {
    icon: FiStar,
    title: "Winners Become Featured Spotlights",
    description:
      "The winning artist and business are displayed prominently as the current Spotlight of the Week, giving the community a chance to discover their story, explore their work, and connect with their platforms.",
  },
  {
    icon: FiArchive,
    title: "Winners Are Added to Spotlight History",
    description:
      "Each winner is automatically added to the historical winners list, building an ongoing archive of every artist and business recognized by the community.",
  },
  {
    icon: FiRefreshCw,
    title: "The Next Competition Begins",
    description:
      "After a competition is completed, the platform automatically begins the next weekly cycle. Nominees selected → voting opens → votes collected → winners featured and archived — week after week.",
  },
];

const HowSpotlightWorks = ({ type }: HowSpotlightWorksProps) => {
  return (
    <section className="section">
      <Container>
        <h2 className="section_title 2xl:text-5xl">How Spotlight Works</h2>

        <p className="section_sub_title max-w-[1000px] mx-auto">
          It is a recurring community-driven competition that gives artists and
          businesses an opportunity to build awareness, rally their supporters,
          attract new audiences, and earn recognition on the platform. Every
          week brings new nominees, new voting, and new opportunities to be
          seen.
        </p>

        {/* Two categories banner */}
        <div className="mt-6 md:mt-8 lg:mt-10  bg-primary-blue px-4 md:px-6 lg:px-8 xl:px-10 py-6 md:py-7 lg:py-8 xl:py-10 text-center custom_shadow">
          <p className="text-white text-base md:text-lg lg:text-xl xl:text-3xl font-semibold leading-[140%]">
            Two Categories. Two Weekly Winners. One Community.
          </p>

          <div className="mt-4 md:mt-5 flex flex-wrap items-center justify-center gap-2 md:gap-3">
            <span
              className={cn(
                "px-5 md:px-7 py-2 rounded-full text-sm md:text-base font-medium transition-colors",
                type === "artist"
                  ? "bg-white text-primary-blue"
                  : "bg-white/15 text-white border border-white/40",
              )}
            >
              Artist Spotlight
            </span>
            <span
              className={cn(
                "px-5 md:px-7 py-2 rounded-full text-sm md:text-base font-medium transition-colors",
                type === "business"
                  ? "bg-white text-primary-blue"
                  : "bg-white/15 text-white border border-white/40",
              )}
            >
              Business Spotlight
            </span>
          </div>

          <p className="mt-4 md:mt-5 text-white/90 text-xs md:text-sm lg:text-base font-medium tracking-wide uppercase">
            This is our social image.
          </p>
        </div>

        {/* Weekly competition cycle */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 md:gap-4 lg:gap-5 xl:gap-6 mt-6 md:mt-8 lg:mt-10 xl:mt-12">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-white custom_border custom_shadow  p-4 md:p-5 lg:p-6 xl:p-8 flex flex-col gap-3 lg:gap-4 h-full"
            >
              <div className="flex items-center justify-between">
                <span className="size-10 md:size-11 lg:size-12 xl:size-14 rounded-full bg-primary-blue/10 flex items-center justify-center">
                  <step.icon className="size-4 md:size-5 lg:size-6 text-primary-blue" />
                </span>
                <span className="text-xl md:text-2xl lg:text-3xl font-bold text-primary-blue/20">
                  {String(idx + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 className="text-sm md:text-base lg:text-lg xl:text-xl font-semibold text-primary-black">
                {step.title}
              </h3>

              <p className="text-sm md:text-base text-secondary-black leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default HowSpotlightWorks;
