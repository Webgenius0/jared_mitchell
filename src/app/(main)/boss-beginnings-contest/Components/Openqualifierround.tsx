"use client";
import React, { useState } from "react";
import VotingTab from "./VotingTab";
import OSIPanelTab from "./OSIPanelTab";
import LeaderboardTab from "./LeaderboardTab";
import { ActiveSeasonRound, CMSRoundsSection } from "@/Types/cms";

const TABS = ["Voting", "OSI Panel", "Leader-board"] as const;

export default function OpenQualifierRound({
  roundsData,
  rounds,
  activeRoundId,
}: {
  roundsData?: CMSRoundsSection;
  rounds?: ActiveSeasonRound[];
  activeRoundId?: number | null;
}) {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>("Voting");

  // Default to the active round (is_active) so its tab is open on load;
  // falls back to the first round when no live season data is available.
  const [activeRound, setActiveRound] = useState(() => {
    if (!rounds?.length) return 0;
    const activeIdx = rounds.findIndex(r => r.id === activeRoundId);
    if (activeIdx >= 0) return activeIdx;
    const isActiveIdx = rounds.findIndex(r => r.is_active);
    return isActiveIdx >= 0 ? isActiveIdx : 0;
  });

  return (
    <section className="py-12 ">
      <div className="container mx-auto px-4">
        {/* Top tabs */}
        <div className="flex items-center gap-4 sm:gap-6 md:gap-8 border-b border-black/10 mb-6 px-1 overflow-x-auto">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative pb-3 text-[13px] sm:text-[14px] font-medium transition-colors whitespace-nowrap ${
                activeTab === tab
                  ? "text-[#2563EB]"
                  : "text-black/50 hover:text-black/70"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-[#2563EB] rounded-full" />
              )}
            </button>
          ))}
        </div>

        {activeTab === "Voting" && (
          <VotingTab
            activeRound={activeRound}
            setActiveRound={setActiveRound}
            rounds={rounds}
          />
        )}
        {activeTab === "OSI Panel" && <OSIPanelTab data={roundsData} />}
        {activeTab === "Leader-board" && <LeaderboardTab />}
      </div>
    </section>
  );
}
