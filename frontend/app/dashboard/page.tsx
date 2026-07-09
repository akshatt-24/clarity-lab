"use client";

import { useState } from "react";
import ReportViewer from "@/components/report/ReportViewer";
import { ClarityReport } from "@/lib/api/reports";

import { AlertCircle, Clock3, FileText } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import UploadCard from "@/components/report/UploadCard";

import { useUser } from "@clerk/nextjs";



const stats = [
  { label: "Total Reports",  value: "0", sub: "Reports analyzed",  icon: FileText,    gradient: "from-[#2f7de8] to-[#1a5eb8]", glow: "hover-glow" },
  { label: "Recent Uploads", value: "0", sub: "This month",         icon: Clock3,      gradient: "from-[#1f8068] to-[#28893e]", glow: "hover-glow-teal" },
  { label: "Flagged Items",  value: "0", sub: "Needs attention",    icon: AlertCircle, gradient: "from-[#f07c00] to-[#d96b00]", glow: "hover-glow-orange" },
];


export default function Dashboard() {
  const [report, setReport] =
  useState<ClarityReport | null>(null);

  const { user } = useUser();

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-[1400px]">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-[#0e1d38]">
            Welcome {user?.firstName ?? "there"}
          </h1>

          <p className="mt-1.5 text-sm text-[#5a6b86]">
            {user?.primaryEmailAddress?.emailAddress}
          </p>

          <p className="mt-1 text-sm text-[#5a6b86]">
            Upload and manage your health reports
          </p>
        </div>

        <div className="mt-7 grid gap-5 lg:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className={`glass-card ${stat.glow} rounded-2xl p-6 cursor-default`}>
              <div className={`bg-gradient-to-br ${stat.gradient} grid h-11 w-11 place-items-center rounded-xl text-white shadow-sm`}>
                <stat.icon size={22} strokeWidth={1.9} />
              </div>
              <p className="mt-5 text-xs font-medium uppercase tracking-[0.10em] text-[#8a97aa]">{stat.label}</p>
              <p className="mt-1.5 text-3xl font-semibold tracking-tight text-[#0e1d38]">{stat.value}</p>
              <p className="mt-1 text-xs text-[#8a97aa]">{stat.sub}</p>
            </div>
          ))}
        </div>

        <div className="mt-9">
          <h2 className="text-base font-semibold text-[#0e1d38]">Upload New Report</h2>
          <p className="mt-1 text-sm text-[#5a6b86]">Supports JPG, PNG, and PDF formats</p>
          <UploadCard
              onUploadComplete={setReport}
            />
        </div>
      </div>
      {report && (

        <div className="mt-8">

            <ReportViewer
                report={report}
            />

        </div>

  )}
    </DashboardLayout>
  );
}
