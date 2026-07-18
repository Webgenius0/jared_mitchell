"use client";
import React, { useState } from "react";
import VotingTab from "./VotingTab";
import OSIPanelTab from "./OSIPanelTab";
import LeaderboardTab from "./LeaderboardTab";

const TABS = ["Voting", "OSI Panel", "Leader-board"] as const;

export default function OpenQualifierRound() {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>("Voting");
  const [activeRound, setActiveRound] = useState(1);

  return (
    <section className="py-12 ">
      <div className="container mx-auto px-4">
        {/* Top tabs */}
        <div className="flex items-center gap-8 border-b border-black/10 mb-6 px-1">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative pb-3 text-[14px] font-medium transition-colors ${
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
          />
        )}
        {activeTab === "OSI Panel" && <OSIPanelTab />}
        {activeTab === "Leader-board" && <LeaderboardTab />}
      </div>
    </section>
  );
}
