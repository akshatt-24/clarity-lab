"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Calendar, CheckCircle2, FileText, Filter, Search, AlertCircle } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ReportViewer from "@/components/report/ReportViewer";
import UploadCard from "@/components/report/UploadCard";
import { ClarityReport } from "@/lib/api/reports";

const reports = [
  { title: "Blood Test – Complete Metabolic Panel", date: "6/25/2026", type: "Blood Work",    flagged: 3 },
  { title: "Annual Physical Exam Results",          date: "6/20/2026", type: "Physical Exam", flagged: 0 },
  { title: "Lipid Panel",                           date: "6/15/2026", type: "Blood Work",    flagged: 1 },
  { title: "Thyroid Function Test",                 date: "6/10/2026", type: "Blood Work",    flagged: 0 },
];

export default function ReportsPage() {
  const [query, setQuery]   = useState("");
  const [report, setReport] = useState<ClarityReport | null>(null);

  const filteredReports = useMemo(
    () => reports.filter((item) => item.title.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-[1400px]">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-[#0e1d38]">All Reports</h1>
          <p className="mt-1.5 text-sm text-[#5a6b86]">View and manage your health reports</p>
        </div>

        {/* Search bar */}
        <div className="glass-card mt-7 flex flex-col gap-3 rounded-xl p-4 sm:flex-row">
          <label className="flex flex-1 items-center gap-2.5 rounded-xl glass-input px-4 py-2.5 text-[#8a97aa]">
            <Search size={16} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search reports…"
              className="w-full bg-transparent text-sm text-[#0e1d38] outline-none placeholder:text-[#a8b4c4]"
            />
          </label>
          <button className="ghost-button focus-ring flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-[#0e1d38]">
            <Filter size={15} />
            Filter
          </button>
        </div>

        {/* Report list */}
        <div className="mt-6 grid gap-4 xl:grid-cols-2">
          {filteredReports.map((item) => (
            <article key={item.title} className="glass-card hover-glow flex items-center gap-4 rounded-xl p-5">
              <div className="brand-gradient grid h-14 w-14 shrink-0 place-items-center rounded-xl text-white shadow-sm">
                <FileText size={26} strokeWidth={1.9} />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="truncate text-sm font-semibold text-[#0e1d38]">{item.title}</h2>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-[#8a97aa]">
                  <span className="inline-flex items-center gap-1.5 text-xs">
                    <Calendar size={12} />
                    {item.date}
                  </span>
                  <span className="rounded-full bg-[#edf3f8] px-2.5 py-0.5 text-xs font-medium text-[#5a6b86]">{item.type}</span>
                </div>
                <div className="mt-2">
                  {item.flagged ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#e53e3e]">
                      <AlertCircle size={13} />
                      {item.flagged} items flagged
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#28893e]">
                      <CheckCircle2 size={13} />
                      All clear
                    </span>
                  )}
                </div>
              </div>
              <Link href="/dashboard/reports" className="shrink-0 text-xs font-semibold text-[#2f7de8] hover:underline">
                View →
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-9">
          <h2 className="text-base font-semibold text-[#0e1d38]">Analyze a New Report</h2>
          <UploadCard onUploadComplete={setReport} />
          {report && <ReportViewer report={report} />}
        </div>
      </div>
    </DashboardLayout>
  );
}
