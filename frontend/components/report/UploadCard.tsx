"use client";

import { useRef, useState } from "react";
import { CheckCircle2, FileUp, Loader2, Upload } from "lucide-react";
import { ClarityReport, uploadReport } from "@/lib/api/reports";

interface UploadCardProps {
  onUploadComplete?: (report: ClarityReport) => void;
}

export default function UploadCard({ onUploadComplete }: UploadCardProps) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function uploadFile() {
    if (!file) {
      setError("Choose a JPG, PNG, or PDF report first.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const report = await uploadReport(file);
      onUploadComplete?.(report);
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch {
      setError("Upload failed. Make sure FastAPI is running on localhost:8000.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mt-6">
      <label
        htmlFor="report-upload"
        className="glass-panel flex min-h-[330px] cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-[#10213f]/10 px-6 text-center transition hover:border-[#2f80ed]/35"
      >
        <input
          ref={fileInputRef}
          id="report-upload"
          type="file"
          accept=".jpg,.jpeg,.png,.pdf"
          className="sr-only"
          onChange={(event) => {
            setFile(event.target.files?.[0] ?? null);
            setError("");
          }}
        />
        <span className="brand-gradient grid h-20 w-20 place-items-center rounded-full text-white">
          <Upload size={40} strokeWidth={2.1} />
        </span>
        <h3 className="mt-7 text-2xl font-semibold text-[#10213f]">Upload Health Report</h3>
        <p className="mt-4 text-lg text-[#5f7192]">Drag and drop or click to browse</p>
        <p className="mt-5 text-sm font-medium text-[#60728f]">Supports: JPG, PNG, PDF</p>
        {file && (
          <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#edf3f8] px-4 py-2 text-sm font-semibold text-[#10213f]">
            <FileUp size={16} />
            {file.name}
          </span>
        )}
      </label>
      <div className="mt-5 flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={uploadFile}
          disabled={loading}
          className="orange-button focus-ring inline-flex items-center gap-2 rounded-2xl px-6 py-4 text-base font-semibold transition disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? <Loader2 className="animate-spin" size={18} /> : <CheckCircle2 size={18} />}
          {loading ? "Analyzing..." : "Upload & Analyze"}
        </button>
        {error && <p className="text-sm font-medium text-[#ef4444]">{error}</p>}
      </div>
    </section>
  );
}
