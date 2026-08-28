"use client";
import {
  CalenderSvg,
  FileSvg,
  FilterSvg,
  ViewSvg,
} from "@/Components/Svg/SvgContainer";
import { useState } from "react";
const filterBtns = [
  "All Events",
  "OSI Events",
  "Member Events",
  "Workshops",
  "Vendor Markets",
  "Pop-Ups",
  "Business Events",
  "Art Exhibitions",
];

const FilterSection = () => {
  const [activeBtn, setActiveBtn] = useState("All Events");
  const [activeView, setActiveView] = useState("firstView");

  return (
    <section className="py-8 md:py-10 lg:py-12 xl:py-20">
      <div className="shadow-[0_4px_20px_0_rgba(0,0,0,0.07)] border border-[#00000029] p-3 md:p-4 lg:p-5 rounded-xl">
        <div className="flex gap-2.5 md:gap-3.5 lg:gap-4 items-center py-3 md:py-4 container overflow-x-auto hide-scrollbar">
          {filterBtns?.map((btn, idx) => (
            <button
              key={idx}
              onClick={() => setActiveBtn(btn)}
              className={`text-xs md:text-sm lg:text-base xl:text-xl px-3 md:px-5 lg:px-6 py-1.5 md:py-2 lg:py-2.5 rounded-full cursor-pointer whitespace-nowrap shrink-0 ${
                activeBtn === btn
                  ? "text-white bg-secondary-blue"
                  : "text-[#314158] bg-[#F1F5F9]"
              }`}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FilterSection;
