"use client";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import {
  HiOutlineBriefcase,
  HiOutlineUsers,
  HiOutlinePresentationChartLine,
  HiOutlineLightBulb,
} from "react-icons/hi";

const data = [
  { name: "OSI Judging Panel", value: 50 },
  { name: "Community Votes", value: 50 },
];

const COLORS = ["#3B82F6", "#E5E7EB"];

const BusinessChosenChart = () => {
  return (
    <section className="container py-20">
      <h2 className="section_title">How Businesses Are Chosen</h2>
      <p className="section_sub_title">
        Our selection process combines community support with professional
        evaluation.
      </p>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-16 mt-16">
        {/* Left – Chart */}
        <div className="flex flex-col items-center">
          <div className="relative size-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={150}
                  startAngle={90}
                  endAngle={-270}
                  dataKey="value"
                >
                  {data.map((_, index) => (
                    <Cell key={index} fill={COLORS[index]} stroke="none" />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            {/* Center text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-semibold">50/50</span>
            </div>
          </div>

          {/* Legend */}
          <div className="flex gap-6 mt-6 text-sm">
            <Legend color="#3B82F6" label="OSI Judging Panel" />
            <Legend color="#E5E7EB" label="Community Votes" />
          </div>
        </div>

        {/* Right – Criteria */}
        <div className="max-w-md space-y-6">
          <h3 className="text-lg font-semibold">OSI Judging Panel Criteria</h3>

          <Criteria
            icon={<HiOutlineBriefcase />}
            title="Business Mission & Vision"
            desc="Clear purpose and long-term goals"
          />
          <Criteria
            icon={<HiOutlineUsers />}
            title="Community Benefit"
            desc="Cultural impact and social value"
          />
          <Criteria
            icon={<HiOutlinePresentationChartLine />}
            title="Presentation Quality"
            desc="Story, photos, and video submission"
          />
          <Criteria
            icon={<HiOutlineLightBulb />}
            title="Originality & Execution"
            desc="Unique approach and growth potential"
          />
        </div>
      </div>
    </section>
  );
};

const Legend = ({ color, label }: { color: string; label: string }) => (
  <div className="flex items-center gap-2">
    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
    {label}
  </div>
);

const Criteria = ({
  icon,
  title,
  desc,
}: {
  icon: any;
  title: string;
  desc: string;
}) => (
  <div className="flex gap-4">
    <div className="text-blue-500 text-xl mt-1 size-14 rounded-lg grid place-items-center bg-[#155DFC29]">
      {icon}
    </div>
    <div>
      <p className="font-medium text-xl">{title}</p>
      <p className="text-lg text-slate-500">{desc}</p>
    </div>
  </div>
);

export default BusinessChosenChart;
