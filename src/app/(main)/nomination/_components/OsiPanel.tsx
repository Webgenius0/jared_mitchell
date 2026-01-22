import { OSIPanelRoundsData } from "@/Components/Data/data";
import React from "react";
import { IoMdCheckmark } from "react-icons/io";

const OsiPanel = () => {
  return (
    <div>
      <section className="space-y-9 py-10">
        {OSIPanelRoundsData.map((data) => (
          <div
            key={data.id}
            className="rounded-2xl custom_border custom_shadow overflow-hidden"
          >
            <div className="bg-tertiary-blue py-6 px-7 flex items-center gap-6 text-white">
              <div className="bg-[#FFFFFF33] size-[70px] flex items-center justify-center rounded-full">
                <data.icon className="size-7" />
              </div>
              <div>
                <h4 className="text-2xl font-medium uppercase flex items-center gap-4">
                  <div className="text-lg font-normal">
                    ROUND {data.roundNumber}
                  </div>
                  {data.title}
                </h4>
                <p className="text-lg tracking-wider">{data.sub_title}</p>
              </div>
            </div>
            <div className="py-9 px-6 space-y-6">
              <div>
                <h6 className="text-tertiary-blue text-2xl font-medium mb-2">
                  Goal:
                </h6>
                {data?.goal?.map((data, idx) => (
                  <p key={idx} className="text-secondary-black text-2xl">
                    {data}
                  </p>
                ))}
              </div>
              <div>
                <h6 className="text-tertiary-blue text-2xl font-medium mb-2">
                  Requirements:
                </h6>
                <ul className="space-y-3 list-disc list-inside">
                  {data.requirements?.map((data, idx) => (
                    <li key={idx} className="text-secondary-black text-2xl">
                      {data}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </section>
      <section className="bg-[#306FDC]">
        <div className="section text-white flex flex-col items-center justify-center">
          <h3 className="text-6xl font-bold mb-6">WHY THIS SYSTEM IS FAIR</h3>
          <ul className="space-y-5 pb-10 w-full border-b border-[#FFFFFF29]">
            <li className="flex items-center text-2xl gap-5 justify-center">
              <IoMdCheckmark />
              Every business knows exactly what is required each round
            </li>
            <li className="flex items-center text-2xl gap-5 justify-center">
              <IoMdCheckmark />
              Advancement is earned, not random
            </li>
            <li className="flex items-center text-2xl gap-5 justify-center">
              <IoMdCheckmark />
              Community voice matters early
            </li>
            <li className="flex items-center text-2xl gap-5 justify-center">
              <IoMdCheckmark />
              Quality and experience matter at the end
            </li>
            <li className="flex items-center text-2xl gap-5 justify-center">
              <IoMdCheckmark />
              Businesses grow stronger at every stage
            </li>
          </ul>
          <div className="text-[28px] text-center pt-10">
            Boss Beginnings isn't just about winning — <br /> it's about proving
            readiness, impact, and excellence step by step.
          </div>
        </div>
      </section>
    </div>
  );
};

export default OsiPanel;
