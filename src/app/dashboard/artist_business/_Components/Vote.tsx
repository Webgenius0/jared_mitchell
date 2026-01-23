"use client";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const data = [
  { time: "12AM", votes: 18 },
  { time: "4AM", votes: 22 },
  { time: "7AM", votes: 32 },
  { time: "12PM", votes: 48 },
  { time: "4PM", votes: 72 },
  { time: "8PM", votes: 98 },
];

const Vote = () => {
  return (
    <div className="bg-white border border-gray-100 p-5 rounded-lg">
      <h3 className="text-2xl font-medium mb-6">Vote Breakdown</h3>

      <div className="w-full h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            barCategoryGap={16}
            margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
          >
            <CartesianGrid vertical={false} stroke="#f1f5f9" />

            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 12 }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 12 }}
              domain={[0, 100]}
            />

            <Tooltip
              cursor={{ fill: "rgba(37,99,235,0.05)" }}
              contentStyle={{
                borderRadius: 8,
                border: "none",
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
              }}
            />

            <Bar
              dataKey="votes"
              fill="#1d4ed8"
              radius={[8, 8, 0, 0]}
              barSize={36}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Vote;
