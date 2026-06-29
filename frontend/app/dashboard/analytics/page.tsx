"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Activity, HeartPulse, TrendingUp } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";

const data = [
  { month: "Jan", score: 72, flags: 5 },
  { month: "Feb", score: 76, flags: 4 },
  { month: "Mar", score: 79, flags: 3 },
  { month: "Apr", score: 81, flags: 3 },
  { month: "May", score: 84, flags: 2 },
  { month: "Jun", score: 88, flags: 1 },
];

const metrics = [
  { label: "Wellness Score", value: "88", icon: HeartPulse, tone: "text-[#2f9342]" },
  { label: "Improving Trends", value: "6", icon: TrendingUp, tone: "text-[#2f80ed]" },
  { label: "Tracked Markers", value: "24", icon: Activity, tone: "text-[#ff8a00]" },
];

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="mx-auto max-w-[1500px]">
        <div>
          <h1 className="text-4xl font-semibold text-[#10213f]">Analytics</h1>
          <p className="mt-3 text-xl text-[#5f7192]">Track report patterns and health marker trends</p>
        </div>

        <div className="mt-10 grid gap-7 lg:grid-cols-3">
          {metrics.map((metric) => (
            <div key={metric.label} className="glass-card rounded-2xl p-7">
              <metric.icon className={metric.tone} size={34} />
              <p className="mt-6 text-lg text-[#5f7192]">{metric.label}</p>
              <p className="mt-2 text-4xl font-semibold text-[#10213f]">{metric.value}</p>
            </div>
          ))}
        </div>

        <section className="glass-card mt-8 rounded-3xl p-7">
          <h2 className="text-2xl font-semibold text-[#10213f]">Health score trend</h2>
          <div className="mt-8 h-[390px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ left: 0, right: 20, top: 20, bottom: 0 }}>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#60728f", fontSize: 14 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#60728f", fontSize: 14 }} />
                <Tooltip
                  contentStyle={{
                    border: "1px solid rgba(16,33,63,0.1)",
                    borderRadius: 16,
                    boxShadow: "0 10px 30px rgba(16,33,63,0.1)",
                  }}
                />
                <Line type="monotone" dataKey="score" stroke="#2f80ed" strokeWidth={4} dot={{ r: 5, fill: "#2f80ed" }} />
                <Line type="monotone" dataKey="flags" stroke="#ff8a00" strokeWidth={3} dot={{ r: 4, fill: "#ff8a00" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
