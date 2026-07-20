"use client";
import React from "react";
import {
  FiUsers,
  FiAward,
  FiTarget,
  FiCheckCircle,
  FiHeart,
  FiBriefcase,
} from "react-icons/fi";

interface OsiRound {
  id: number;
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

export default function OSIPanelTab() {
  return (
    <div className="space-y-6">
      {OSI_ROUNDS.map(round => (
        <div
          key={round.id}
          className="rounded-2xl border border-black/10 bg-white overflow-hidden"
        >
          {/* Round header */}
          <div className="bg-[#2563EB] px-4 sm:px-6 py-4 sm:py-5 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5 text-white">
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
              <p className="text-xs sm:text-sm text-white/80 mt-0.5">{round.sub_title}</p>
            </div>
          </div>

          {/* Round content */}
          <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
            {/* Goal */}
            <div>
              <h6 className="text-[#2563EB] text-base font-medium mb-2 flex items-center gap-2">
                {/* <FiCheckCircle className="size-4" /> */}
                Goal:
              </h6>
              {round.goal.map((g, idx) => (
                <p key={idx} className="text-[14px] text-black/70">
                  {g}
                </p>
              ))}
            </div>

            {/* Requirements */}
            <div>
              <h6 className="text-[#2563EB] text-base font-medium mb-2 flex items-center gap-2">
                {/* <FiTarget className="size-4" /> */}
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

      {/* Why this system is fair */}
      <div className=" bg-[#306FDC] py-12 sm:py-16 lg:py-20 px-4 text-white">
        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-center uppercase tracking-wider text-white">
          WHY THIS SYSTEM IS FAIR
        </h3>
        <div className="space-y-3 border-b border-white/20 pb-5 mb-5 max-w-5xl mx-auto">
          {[
            "Every business knows exactly what is required each round",
            "Advancement is earned, not random",
            "Community voice matters early",
            "Quality and experience matter at the end",
            "Businesses grow stronger at every stage",
          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-center gap-3 ">
              <FiCheckCircle className="size-4 shrink-0" />
              <p className="text-base font-normal">{item}</p>
            </div>
          ))}
        </div>
        <p className="text-lg sm:text-xl lg:text-[24px] text-center text-white/80 max-w-3xl mx-auto">
          Boss Beginnings isn't just about winning — it's about proving
          readiness, impact, and excellence step by step.
        </p>
      </div>
    </div>
  );
}
