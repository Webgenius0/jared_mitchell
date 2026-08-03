"use client";
import React from "react";
import {
  FiUsers,
  FiAward,
  FiCheckCircle,
  FiHeart,
  FiBriefcase,
} from "react-icons/fi";
import { CMSRoundsSection } from "@/Types/cms";

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

// Icons used as fallback when the CMS doesn't provide an icon image per round
const FALLBACK_ICONS = [FiUsers, FiHeart, FiHeart, FiBriefcase, FiAward];

const DEFAULT_FAIR_POINTS = [
  "Every business knows exactly what is required each round",
  "Advancement is earned, not random",
  "Community voice matters early",
  "Quality and experience matter at the end",
  "Businesses grow stronger at every stage",
];

export default function OSIPanelTab({ data }: { data?: CMSRoundsSection }) {
  const metadata = data?.metadata;
  const cmsRounds = metadata?.rounds ?? [];
  const block = metadata?.block;
  const bottom = metadata?.bottom;

  // Use CMS data when available, otherwise fall back to the hardcoded rounds
  const rounds =
    cmsRounds.length > 0
      ? cmsRounds
      : OSI_ROUNDS.map(r => ({
          round_text: `ROUND ${r.roundNumber}`,
          round_title: r.title,
          subtitle: r.sub_title,
          icon: null,
          goal_label: "Goal:",
          goal_text: r.goal.join(" "),
          requirements_label: "Requirements:",
          requirements: r.requirements,
        }));

  const fairPoints = bottom?.description
    ? Array.from(
        new Set(
          bottom.description
            .split("\n")
            .map(s => s.trim())
            .filter(Boolean),
        ),
      )
    : DEFAULT_FAIR_POINTS;

  return (
    <div className="space-y-6">
      {/* Block header */}
      {block && (block.title || block.subtitle || block.description) && (
        <div className="rounded-2xl border border-black/10 bg-white overflow-hidden">
          <div
            className={`relative min-h-[200px] flex items-end ${
              block.image ? "" : "bg-[#2563EB]"
            }`}
          >
            {block.image && (
              <img
                src={block.image}
                alt={block.title || "Boss Beginnings"}
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
            <div
              className={`relative w-full p-6 sm:p-10 ${
                block.image
                  ? "bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white"
                  : "text-white"
              }`}
            >
              {block.title && (
                <h2 className="text-2xl sm:text-4xl font-bold uppercase tracking-wider">
                  {block.title}
                </h2>
              )}
              {block.subtitle && (
                <p className="mt-2 text-base sm:text-lg text-white/90">
                  {block.subtitle}
                </p>
              )}
              {block.description && (
                <p className="mt-3 text-sm sm:text-base text-white/80 max-w-3xl leading-relaxed">
                  {block.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Rounds */}
      {rounds.map((round, idx) => {
        const RoundIcon = FALLBACK_ICONS[idx % FALLBACK_ICONS.length];
        return (
          <div
            key={idx}
            className="rounded-2xl border border-black/10 bg-white overflow-hidden"
          >
            {/* Round header */}
            <div className="bg-[#2563EB] px-4 sm:px-6 py-4 sm:py-5 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5 text-white">
              <div className="bg-white/20 size-14 flex items-center justify-center rounded-full shrink-0 overflow-hidden">
                {round.icon ? (
                  <img
                    src={round.icon}
                    alt={round.round_title}
                    className="size-7 object-contain"
                  />
                ) : (
                  <RoundIcon className="size-6" />
                )}
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-medium uppercase flex flex-wrap items-center gap-2 sm:gap-3">
                  <span className="text-xs sm:text-sm font-normal py-1">
                    {round.round_text}
                  </span>
                  {round.round_title}
                </h4>
                {round.subtitle && (
                  <p className="text-xs sm:text-sm text-white/80 mt-0.5">
                    {round.subtitle}
                  </p>
                )}
              </div>
            </div>

            {/* Round content */}
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
              {/* Goal */}
              <div>
                <h6 className="text-[#2563EB] text-base font-medium mb-2 flex items-center gap-2">
                  {round.goal_label || "Goal:"}
                </h6>
                <p className="text-[14px] text-black/70">{round.goal_text}</p>
              </div>

              {/* Requirements */}
              <div>
                <h6 className="text-[#2563EB] text-base font-medium mb-2 flex items-center gap-2">
                  {round.requirements_label || "Requirements:"}
                </h6>
                <ul className="space-y-2">
                  {(round.requirements ?? []).map((req, reqIdx) => (
                    <li
                      key={reqIdx}
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
        );
      })}

      {/* Why this system is fair */}
      <div className="bg-[#306FDC] py-12 sm:py-16 lg:py-20 px-4 text-white">
        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-center uppercase tracking-wider text-white">
          {bottom?.title || "WHY THIS SYSTEM IS FAIR"}
        </h3>
        <div className="space-y-3 border-b border-white/20 pb-5 mb-5 max-w-5xl mx-auto">
          {fairPoints.map((item, idx) => (
            <div key={idx} className="flex items-center justify-center gap-3">
              <FiCheckCircle className="size-4 shrink-0" />
              <p className="text-base font-normal">{item}</p>
            </div>
          ))}
        </div>
        <p className="text-lg sm:text-xl lg:text-[24px] text-center text-white/80 max-w-3xl mx-auto">
          {bottom?.subtitle ||
            "Boss Beginnings isn't just about winning — it's about proving readiness, impact, and excellence step by step."}
        </p>
      </div>
    </div>
  );
}
