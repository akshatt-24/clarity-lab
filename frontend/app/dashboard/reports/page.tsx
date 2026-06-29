"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Calendar, CheckCircle2, FileText, Filter, Search, AlertCircle } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ReportViewer from "@/components/report/ReportViewer";
import UploadCard from "@/components/report/UploadCard";
import { ClarityReport } from "@/lib/api/reports";

const reports = [
  { title: "Blood Test - Complete Metabolic Panel", date: "6/25/2026", type: "Blood Work", flagged: 3 },
  { title: "Annual Physical Exam Results", date: "6/20/2026", type: "Physical Exam", flagged: 0 },
  { title: "Lipid Panel", date: "6/15/2026", type: "Blood Work", flagged: 1 },
  { title: "Thyroid Function Test", date: "6/10/2026", type: "Blood Work", flagged: 0 },
];

export default function ReportsPage() {
  const [query, setQuery] = useState("");
  const [report, setReport] = useState<ClarityReport | null>(null);

  const filteredReports = useMemo(
    () => reports.filter((item) => item.title.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-[1520px]">
        <div>
          <h1 className="text-4xl font-semibold text-[#10213f]">All Reports</h1>
          <p className="mt-3 text-xl text-[#5f7192]">View and manage your health reports</p>
        </div>

        <div className="glass-card mt-10 flex flex-col gap-5 rounded-2xl p-6 sm:flex-row">
          <label className="flex min-h-16 flex-1 items-center gap-3 rounded-2xl bg-[#edf3f8] px-5 text-[#60728f]">
            <Search size={24} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search reports..."
              className="w-full bg-transparent text-lg outline-none placeholder:text-[#8a97aa]"
            />
          </label>
          <button className="focus-ring flex min-h-16 items-center justify-center gap-3 rounded-2xl bg-[#edf3f8] px-7 text-lg font-semibold text-[#10213f]">
            <Filter size={24} />
            Filter
          </button>
        </div>

        <div className="mt-8 grid gap-7 xl:grid-cols-2">
          {filteredReports.map((item) => (
            <article key={item.title} className="glass-card flex items-center gap-5 rounded-2xl p-7">
              <div className="brand-gradient grid h-20 w-20 shrink-0 place-items-center rounded-2xl text-white">
                <FileText size={36} />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="truncate text-2xl font-semibold text-[#10213f]">{item.title}</h2>
                <div className="mt-4 flex flex-wrap items-center gap-4 text-[#60728f]">
                  <span className="inline-flex items-center gap-2">
                    <Calendar size={18} />
                    {item.date}
                  </span>
                  <span className="rounded-full bg-[#edf3f8] px-3 py-1 text-sm font-medium">{item.type}</span>
                </div>
                <div className="mt-4">
                  {item.flagged ? (
                    <span className="inline-flex items-center gap-2 text-[#ef4444]">
                      <AlertCircle size={18} />
                      {item.flagged} items flagged
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2 text-[#2f9342]">
                      <CheckCircle2 size={18} />
                      All clear
                    </span>
                  )}
                </div>
              </div>
              <Link href="/dashboard/reports" className="shrink-0 text-lg font-medium text-[#2f80ed]">
                View Details -&gt;
              </Link>
            </article>
          ))}
        </div>

        <h2 className="mt-12 text-2xl font-semibold text-[#10213f]">Analyze a New Report</h2>
        <UploadCard onUploadComplete={setReport} />
        {report && <ReportViewer report={report} />}
      </div>
    </DashboardLayout>
  );
}
