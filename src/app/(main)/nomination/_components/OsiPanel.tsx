import React from "react";
import { IoMdCheckmark } from "react-icons/io";

const OsiPanel = () => {
  return (
    <div>
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
