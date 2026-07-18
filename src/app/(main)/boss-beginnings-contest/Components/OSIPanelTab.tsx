"use client";
import React, { useState } from "react";
import { FiUsers, FiAward, FiTarget, FiCheckCircle, FiStar, FiTrendingUp } from "react-icons/fi";
import { FaArrowTrendUp } from "react-icons/fa6";

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
    icon: FaArrowTrendUp,
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
    icon: FiTarget,
    roundNumber: "3",
    title: "COMMUNITY IMPACT ROUND",
    sub_title: "Top 30 Advance",
    goal: ["Demonstrate meaningful community involvement and impact."],
    requirements: [
      "Submit a 60-90 second video or 3-5 bullet points explaining how your business serves the community.",
      "Submissions are reviewed for authenticity and community value.",
    ],
  },
  {
    id: 4,
    icon: FiStar,
    roundNumber: "4",
    title: "INNOVATION SHOWCASE",
    sub_title: "Top 15 Advance",
    goal: ["Highlight unique value proposition and market differentiation."],
    requirements: [
      "Present your innovative approach or product differentiator.",
      "Demonstrate scalability and long-term growth potential.",
    ],
  },
  {
    id: 5,
    icon: FiAward,
    roundNumber: "5",
    title: "FINAL CHAMPIONSHIP",
    sub_title: "Top 8 Compete",
    goal: ["Present your complete business vision for the grand prize."],
    requirements: [
      "Full business pitch to judges and community panel.",
      "Demonstrate readiness, impact, and excellence across all previous rounds.",
    ],
  },
];

export default function OSIPanelTab() {
  const [activeRound, setActiveRound] = useState(1);

  return (
    <div>
      {/* Round selector */}
      <div className="rounded-2xl border border-black/10 bg-white p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-[20px] font-semibold text-black">
              OSI Panel Evaluation
            </h2>
            <p className="text-[13px] text-black/50 mt-0.5">
              Multi-round evaluation system
            </p>
          </div>
          <div className="flex items-center gap-2">
            {OSI_ROUNDS.map((round) => (
              <button
                key={round.id}
                onClick={() => setActiveRound(round.id)}
                className={`px-4 py-1.5 rounded-lg text-[13px] font-medium transition-colors ${
                  activeRound === round.id
                    ? "bg-[#2563EB] text-white"
                    : "bg-[#EEF1F6] text-black/50 hover:bg-black/10"
                }`}
              >
                Round {round.roundNumber}
              </button>
            ))}
          </div>
        </div>
        <p className="text-[14px] text-black/60 max-w-2xl">
          Track how businesses progress through each evaluation stage. Each round
          raises the bar and filters for excellence.
        </p>
      </div>

      {/* Active round detail */}
      {OSI_ROUNDS.filter((r) => r.id === activeRound).map((round) => (
        <div
          key={round.id}
          className="rounded-2xl border border-black/10 bg-white overflow-hidden mb-6"
        >
          {/* Round header */}
          <div className="bg-[#2563EB] px-6 py-5 flex items-center gap-5 text-white">
            <div className="bg-white/20 size-14 flex items-center justify-center rounded-full">
              <round.icon className="size-6" />
            </div>
            <div>
              <h4 className="text-lg font-medium uppercase flex items-center gap-3">
                <span className="text-sm font-normal bg-white/20 px-3 py-1 rounded-full">
                  ROUND {round.roundNumber}
                </span>
                {round.title}
              </h4>
              <p className="text-sm text-white/80 mt-0.5">{round.sub_title}</p>
            </div>
          </div>

          {/* Round content */}
          <div className="p-6 space-y-5">
            {/* Goal */}
            <div>
              <h6 className="text-[#2563EB] text-base font-medium mb-2 flex items-center gap-2">
                <FiCheckCircle className="size-4" />
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
                <FiTarget className="size-4" />
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
      <div className="rounded-2xl bg-[#2563EB] p-6 text-white">
        <h3 className="text-lg font-bold mb-4 text-center uppercase tracking-wider">
          WHY THIS SYSTEM IS FAIR
        </h3>
        <div className="space-y-3 border-b border-white/20 pb-5 mb-5">
          {[
            "Every business knows exactly what is required each round",
            "Advancement is earned, not random",
            "Community voice matters early",
            "Quality and experience matter at the end",
            "Businesses grow stronger at every stage",
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 text-[13px]">
              <FiCheckCircle className="size-4 shrink-0" />
              {item}
            </div>
          ))}
        </div>
        <p className="text-[14px] text-center text-white/80">
          Boss Beginnings isn't just about winning — it's about proving
          readiness, impact, and excellence step by step.
        </p>
      </div>
    </div>
  );
}
