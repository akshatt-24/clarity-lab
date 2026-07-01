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
  { label: "Wellness Score",    value: "88", sub: "+4 this month",       icon: HeartPulse, tone: "text-[#28893e]",  glow: "hover-glow-teal" },
  { label: "Improving Trends",  value: "6",  sub: "Markers improving",   icon: TrendingUp, tone: "text-[#2f7de8]",  glow: "hover-glow" },
  { label: "Tracked Markers",   value: "24", sub: "Across all reports",  icon: Activity,   tone: "text-[#f07c00]",  glow: "hover-glow-orange" },
];

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="mx-auto max-w-[1400px]">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-[#0e1d38]">Analytics</h1>
          <p className="mt-1.5 text-sm text-[#5a6b86]">Track report patterns and health marker trends</p>
        </div>

        <div className="mt-7 grid gap-5 lg:grid-cols-3">
          {metrics.map((metric) => (
            <div key={metric.label} className={`glass-card ${metric.glow} rounded-2xl p-6 cursor-default`}>
              <metric.icon className={metric.tone} size={26} strokeWidth={1.9} />
              <p className="mt-4 text-xs font-medium uppercase tracking-[0.10em] text-[#8a97aa]">{metric.label}</p>
              <p className="mt-1.5 text-3xl font-semibold tracking-tight text-[#0e1d38]">{metric.value}</p>
              <p className="mt-1 text-xs text-[#a8b4c4]">{metric.sub}</p>
            </div>
          ))}
        </div>

        <section className="glass-card hover-glow mt-6 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-[#0e1d38]">Health score trend</h2>
            <span className="badge-green rounded-full px-2.5 py-0.5 text-xs font-medium">Improving</span>
          </div>
          <div className="mt-6 h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ left: 0, right: 16, top: 10, bottom: 0 }}>
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#8a97aa", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#8a97aa", fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    border: "1px solid rgba(255,255,255,0.80)",
                    borderRadius: 12,
                    boxShadow: "0 8px 28px rgba(14,29,56,0.10)",
                    background: "rgba(255,255,255,0.90)",
                    backdropFilter: "blur(16px)",
                    fontSize: 12,
                  }}
                />
                <Line type="monotone" dataKey="score" stroke="#2f7de8" strokeWidth={3} dot={{ r: 4, fill: "#2f7de8", strokeWidth: 2, stroke: "#fff" }} />
                <Line type="monotone" dataKey="flags" stroke="#f07c00" strokeWidth={2.5} dot={{ r: 3.5, fill: "#f07c00", strokeWidth: 2, stroke: "#fff" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
