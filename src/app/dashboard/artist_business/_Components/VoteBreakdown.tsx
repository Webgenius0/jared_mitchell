"use client";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";

const data = [
  { name: "Free Votes", value: 2200, fill: "#1d4ed8" },
  { name: "Support Votes", value: 900, fill: "#a78bfa" },
  { name: "Claps", value: 400, fill: "#bfdbfe" },
  { name: "Saves", value: 200, fill: "#22c55e" },
];

const VoteBreakdown = () => {
  return (
    <div className="bg-white border border-gray-100 p-5 rounded-lg">
      <h3 className="text-2xl font-medium mb-6">Vote Breakdown</h3>

      <div className="w-full h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            barCategoryGap={18}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            <CartesianGrid horizontal={false} stroke="#f1f5f9" />

            <XAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12 }}
            />

            <YAxis
              type="category"
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#334155", fontSize: 13 }}
              width={120}
            />

            <Tooltip
              cursor={{ fill: "rgba(0,0,0,0.03)" }}
              contentStyle={{
                borderRadius: 8,
                border: "none",
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
              }}
            />

            <Bar dataKey="value" barSize={28} radius={[10, 10, 10, 10]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default VoteBreakdown;
