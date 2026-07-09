"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "next/navigation";

import DashboardLayout from "@/components/layout/DashboardLayout";

import ReportViewer from "@/components/report/ReportViewer";

import {
  ClarityReport,
  getReport,
} from "@/lib/api/reports";

export default function ReportDetailPage() {

  const params = useParams();

  const reportId = params.id as string;

  const [report, setReport] =
    useState<ClarityReport | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    async function fetchReport() {

      try {

        const data =
          await getReport(reportId);

        setReport(data);

      } catch (err) {

        console.error(err);

      } finally {

        setLoading(false);
      }
    }

    if (reportId) {

      fetchReport();
    }

  }, [reportId]);

  return (
    <DashboardLayout>

      <div className="mx-auto max-w-[1400px]">

        <h1 className="text-2xl font-semibold tracking-tight text-[#0e1d38]">
          Report Details
        </h1>

        <p className="mt-1.5 text-sm text-[#5a6b86]">
          View full AI interpretation of this report
        </p>

        {loading && (
          <div className="glass-card mt-6 rounded-xl p-6 text-sm text-[#5a6b86]">
            Loading report...
          </div>
        )}

        {!loading && !report && (
          <div className="glass-card mt-6 rounded-xl p-6 text-sm text-[#e53e3e]">
            Report not found.
          </div>
        )}

        {report && (
          <ReportViewer report={report} />
        )}

      </div>

    </DashboardLayout>
  );
}