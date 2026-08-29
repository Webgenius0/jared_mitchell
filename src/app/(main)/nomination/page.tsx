"use client";
import { useState } from "react";
import Container from "@/Components/Common/Container";
import Voting from "./_components/Voting";
import OsiPanel from "./_components/OsiPanel";
import LeaderBoard from "./_components/LeaderBoard";
import Sponsors from "../_components/Sponsors";

const tabs = [
  { id: "1", tab: "Voting" },
  { id: "2", tab: "OSI Panel" },
  { id: "3", tab: "Leader-board" },
];

const Page = () => {
  const [activeTab, setActiveTab] = useState("1");

  return (
    <>
    <section>
      <Container>
        {/* Tabs */}
        <div className="w-full border-b border-[#E5E7EB] flex items-center gap-4 md:gap-5 my-6 md:my-8">
          {tabs.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`pb-3 px-3 md:px-4 lg:px-5 relative font-medium text-sm md:text-base transition-colors
                ${
                  activeTab === item.id
                    ? "text-[#155DFC] border-b-2 border-[#155DFC]"
                    : "text-[#4A5565] hover:text-[#578bfa]"
                }
              `}
            >
              {item.tab}

              {/* Active underline */}
              {activeTab === item.id && (
                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-primary" />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === "1" && <Voting />}
          {activeTab === "2" && <OsiPanel />}
          {activeTab === "3" && <LeaderBoard />}
        </div>
      </Container>
    </section>
    <Sponsors showButton={false} />
    </>
  );
};

export default Page;
