"use client";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  { day: "Sun", views: 60, votes: 55 },
  { day: "Tue", views: 95, votes: 105 },
  { day: "Wed", views: 50, votes: 35 },
  { day: "Thu", views: 85, votes: 95 },
  { day: "Fri", views: 40, votes: 25 },
  { day: "Sat", views: 70, votes: 90 },
  { day: "Sun", views: 85, votes: 5 },
];

const EngagementOverview = () => {
  return (
    <div className="bg-white border border-gray-100 p-5 rounded-lg">
      <h3 className="text-2xl font-medium mb-5">Engagement Overview</h3>

      <div className="w-full h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f1f5f9"
            />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12 }}
            />

            <Tooltip
              contentStyle={{
                borderRadius: 8,
                border: "none",
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
              }}
              labelStyle={{ fontWeight: 600 }}
            />

            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              iconSize={8}
              wrapperStyle={{
                paddingBottom: "12px",
                fontSize: "13px",
                color: "#64748b",
              }}
            />

            {/* Views */}
            <Line
              type="monotone"
              dataKey="views"
              stroke="#8b5cf6"
              strokeWidth={2.5}
              dot={false}
            />

            {/* Votes */}
            <Line
              type="monotone"
              dataKey="votes"
              stroke="#2563eb"
              strokeWidth={2.5}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EngagementOverview;
