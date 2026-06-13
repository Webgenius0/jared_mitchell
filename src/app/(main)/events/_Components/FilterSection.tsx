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
    <section className="py-20 ">
      <div className="shadow-[0_4px_20px_0_rgba(0,0,0,0.07)] border border-[#00000029] p-6 rounded-xl">
        <div className="flex gap-5 items-center py-6 container">
          {filterBtns?.map((btn, idx) => (
            <button
              key={idx}
              onClick={() => setActiveBtn(btn)}
              className={`text-xl px-7 py-3 rounded-full cursor-pointer flex shrink-0 ${
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
