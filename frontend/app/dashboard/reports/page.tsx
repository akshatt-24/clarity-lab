"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";
import Link from "next/link";
import { Calendar,  FileText, Filter, Search } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ReportViewer from "@/components/report/ReportViewer";
import UploadCard from "@/components/report/UploadCard";
import {
  ClarityReport,
  ReportHistoryItem,
  getReports,
} from "@/lib/api/reports";


export default function ReportsPage() {
  const [query, setQuery]   = useState("");
  const [report, setReport] = useState<ClarityReport | null>(null);
  const [reports, setReports] = useState<ReportHistoryItem[]>([]);
  console.log("REPORT STATE:", reports);
  const [loadingReports, setLoadingReports] = useState(true);

  const filteredReports = useMemo(
    () => reports.filter((item) => item.file_name.toLowerCase().includes(query.toLowerCase())),
    [reports, query]
  );

  useEffect(() => {
  async function loadReports() {
    try {
      const data = await getReports();

      console.log("REPORT DATA:", data);

      setReports(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingReports(false);
    }
  }

  loadReports();
}, []);

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
        {loadingReports && (
          <div className="mt-6 glass-card rounded-xl p-5 text-sm text-[#5a6b86]">
            Loading reports...
          </div>
        )}
        <div className="mt-6 grid gap-4 xl:grid-cols-2">
          
          {filteredReports.length === 0 ? (
              <div className="glass-card rounded-xl p-6 text-sm text-[#5a6b86]">
                No reports found.
              </div>
            ) : (
          filteredReports.map((item) => (
            <article key={item.id} className="glass-card hover-glow flex items-center gap-4 rounded-xl p-5">
              <div className="brand-gradient grid h-14 w-14 shrink-0 place-items-center rounded-xl text-white shadow-sm">
                <FileText size={26} strokeWidth={1.9} />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="truncate text-sm font-semibold text-[#0e1d38]">{item.file_name}</h2>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-[#8a97aa]">
                  <span className="inline-flex items-center gap-1.5 text-xs">
                    <Calendar size={12} />
                    {new Date(item.uploaded_at).toLocaleDateString()}
                  </span>
                  <span className="rounded-full bg-[#edf3f8] px-2.5 py-0.5 text-xs font-medium text-[#5a6b86]">
                      Lab Report
                  </span>
                </div>
                <div className="mt-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#5a6b86]">
                    {item.summary.slice(0, 70)}...
                  </span>
                </div>
              </div>
              <Link href={`/dashboard/reports/${item.id}`} className="shrink-0 text-xs font-semibold text-[#2f7de8] hover:underline">
                View →
              </Link>
            </article>
          ))
        )}
        </div>

        <div className="mt-9">
          <h2 className="text-base font-semibold text-[#0e1d38]">Analyze a New Report</h2>
          <UploadCard
            onUploadComplete={(uploadedReport) => {
              setReport(uploadedReport);

              getReports().then(setReports);
            }}
          />
          {report && <ReportViewer report={report} />}
        </div>
      </div>
    </DashboardLayout>
  );
}
