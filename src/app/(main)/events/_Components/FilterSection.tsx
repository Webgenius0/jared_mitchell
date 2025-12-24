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
    <section className="py-20 container">
      <div className="shadow-[0_4px_20px_0_rgba(0,0,0,0.07)] border border-[#00000029] p-6 rounded-xl">
        <p className="flex gap-3 items-center text-xl font-medium text-[#1D1D1F]">
          <FilterSvg />
          Filters
        </p>

        <div className="flex gap-5 items-center py-6">
          {filterBtns?.map((btn, idx) => (
            <button
              key={idx}
              onClick={() => setActiveBtn(btn)}
              className={`text-xl px-7 py-3 rounded-full cursor-pointer ${
                activeBtn === btn
                  ? "text-white bg-secondary-blue"
                  : "text-[#314158] bg-[#F1F5F9]"
              }`}
            >
              {btn}
            </button>
          ))}
        </div>

        <hr className="text-gray-100" />

        <div className="flex justify-between items-center pt-6">
          <div className="flex gap-3 items-center">
            <p className="text-lg font-medium text-[#1D1D1F]">Sort by:</p>
            <input
              type="text"
              className="rounded-full w-[300px] bg-[#F1F5F9] outline-none py-2 px-4 border border-[#CAD5E2]"
            />
          </div>

          <div className="flex gap-3 items-center">
            <p className="text-lg font-medium text-[#1D1D1F]">View:</p>
            <button
              onClick={() => setActiveView("firstView")}
              className={`size-12 grid place-items-center rounded-full cursor-pointer ${
                activeView === "firstView"
                  ? "bg-secondary-blue text-white"
                  : "bg-[#F1F5F9]"
              }`}
            >
              <CalenderSvg />
            </button>
            <button
              onClick={() => setActiveView("secView")}
              className={`size-12 grid place-items-center rounded-full cursor-pointer ${
                activeView === "secView" ? "bg-secondary-blue text-white" : "bg-[#F1F5F9]"
              }`}
            >
              <FileSvg />
            </button>
            <button
              onClick={() => setActiveView("thirdView")}
              className={`size-12 grid place-items-center rounded-full cursor-pointer ${
                activeView === "thirdView"
                  ? "bg-secondary-blue text-white"
                  : "bg-[#F1F5F9]"
              }`}
            >
              <ViewSvg />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FilterSection;
