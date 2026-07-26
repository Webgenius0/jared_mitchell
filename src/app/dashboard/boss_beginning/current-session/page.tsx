import Link from "next/link";
import { FiUsers, FiAward, FiHeart, FiBriefcase } from "react-icons/fi";

interface OsiRound {
  id: number;
  start_date: string;
  end_date: string;
  icon: React.ElementType;
  roundNumber: string;
  title: string;
  sub_title: string;
  goal: string[];
  requirements: string[];
}

const OSI_ROUNDS: OsiRound[] = [
  {
    id: 1,
    icon: FiUsers,
    start_date: "12 May 2026",
    end_date: "24 May 2026",
    roundNumber: "1",
    title: "OPEN NOMINATIONS",
    sub_title: "Up to 100 Businesses",
    goal: ["Secure a spot in the competition."],
    requirements: [
      "Submit a complete nomination that clearly explains what the business does and why it deserves community support.",
      "Businesses that do not complete the nomination or meet eligibility requirements do not advance.",
    ],
  },
  {
    id: 2,
    icon: FiHeart,
    start_date: "12 May 2026",
    end_date: "24 May 2026",
    roundNumber: "2",
    title: "MOMENTUM ROUND",
    sub_title: "Top 60 Advance",
    goal: ["Show early community interest and momentum."],
    requirements: [
      "Demonstrate initial traction through community engagement (claps, saves, shares, and support votes).",
      "Businesses that fail to generate enough early momentum are eliminated, ensuring only actively supported businesses continue.",
    ],
  },
  {
    id: 3,
    icon: FiHeart,
    start_date: "12 May 2026",
    end_date: "24 May 2026",
    roundNumber: "3",
    title: "COMMUNITY IMPACT ROUND",
    sub_title: "Top 30 Advance",
    goal: ["Prove how your business serves the community."],
    requirements: [
      "Explain how their business positively impacts customers, neighborhoods, or the local economy.",
      "This may include: Who they serve, How they help, Why they matter beyond profit.",
      "Businesses that cannot clearly demonstrate community impact do not advance.",
    ],
  },
  {
    id: 4,
    icon: FiBriefcase,
    start_date: "12 May 2026",
    end_date: "24 May 2026",
    roundNumber: "4",
    title: "BUSINESS PITCH & JOURNEY ROUND",
    sub_title: "Top 15 Advance",
    goal: ["Show vision, strategy, and resilience."],
    requirements: [
      "Submit a business pitch and story that explains: their mission and long-term vision, how the business operates or plans to scale, the challenges they've overcome to get here, and why they believe they deserve to win.",
      "Businesses that lack clarity, preparation, or storytelling are eliminated.",
    ],
  },
  {
    id: 5,
    icon: FiAward,
    start_date: "12 May 2026",
    end_date: "24 May 2026",
    roundNumber: "5",
    title: "OSI CUSTOMER EXPERIENCE ROUND",
    sub_title: "Top 3 Selected",
    goal: ["Deliver a real, high-quality customer experience."],
    requirements: [
      "OSI must experience the business firsthand by purchasing a product or service.",
      "OSI evaluates: communication, professionalism, product or service quality, delivery or execution, and overall customer experience.",
      "The business that performs best in real-world conditions, combined with prior scores, is crowned the Boss Beginnings Winner.",
    ],
  },
];

const page = () => {
  return (
    <div className="space-y-6">
      {OSI_ROUNDS.map((round, idx) => (
        <div
          key={round.id}
          className="rounded-2xl border border-black/10 bg-white overflow-hidden"
        >
          {/* Round header */}
          <div
            className={`px-4 sm:px-6 py-4 sm:py-5 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5 text-white ${idx === 0 ? "bg-[#1977DD]" : "bg-[#9F9F9F]"}`}
          >
            <div className="bg-white/20 size-14 flex items-center justify-center rounded-full shrink-0">
              <round.icon className="size-6" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-medium uppercase flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="text-xs sm:text-sm font-normal py-1">
                  ROUND {round.roundNumber}
                </span>
                {round.title}
              </h4>
            </div>
          </div>

          {/* Round content */}
          <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
            {/* Goal */}
            <div>
              <h6 className="text-[#1977DD] text-base font-medium mb-2 flex items-center gap-2">
                Description:
              </h6>
              {round.goal.map((g, idx) => (
                <p key={idx} className="text-[14px] text-black/70">
                  {g}
                </p>
              ))}
            </div>

            {/* Date */}
            <div className="flex gap-10 items-center">
              <div>
                <h6 className="text-[#1977DD] text-base font-medium mb-2 flex items-center gap-2">
                  Start Date:
                </h6>
                <p className="text-[14px] text-black/70">{round?.start_date}</p>
              </div>

              <div>
                <h6 className="text-[#1977DD] text-base font-medium mb-2 flex items-center gap-2">
                  End Date:
                </h6>
                <p className="text-[14px] text-black/70">{round?.end_date}</p>
              </div>
            </div>

            {/* Requirements */}
            <div>
              <h6 className="text-[#1977DD] text-base font-medium mb-2 flex items-center gap-2">
                Requirements:
              </h6>
              <ul className="space-y-2">
                {round.requirements.map((req, idx) => (
                  <li
                    key={idx}
                    className="text-[14px] text-black/70 flex items-start gap-2"
                  >
                    <span className="mt-1.5 size-1.5 rounded-full bg-[#2563EB] shrink-0" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}

      <Link
        href="/dashboard/boss_beginning/listed-business"
        className="inline-block font-medium px-14 py-4 rounded-full bg-primary-blue cursor-pointer text-white"
      >
        List Business
      </Link>
    </div>
  );
};

export default page;
