"use client";

import { useRef, useState } from "react";
import { CheckCircle2, FileUp, Loader2, Upload } from "lucide-react";
import { uploadReport } from "@/lib/api/reports";

interface UploadCardProps {
  onUploadComplete?: (report: unknown) => void;
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
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch {
      setError("Upload failed. Make sure FastAPI is running on localhost:8000.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mt-5">
      <label
        htmlFor="report-upload"
        className="glass-panel flex min-h-[260px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#0e1d38]/10 px-6 text-center transition hover:border-[#2f7de8]/35 hover:bg-white/30"
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
        <span className="brand-gradient grid h-14 w-14 place-items-center rounded-2xl text-white shadow-md">
          <Upload size={28} strokeWidth={2} />
        </span>
        <h3 className="mt-5 text-base font-semibold text-[#0e1d38]">Upload Health Report</h3>
        <p className="mt-2 text-sm text-[#5a6b86]">Drag and drop or click to browse</p>
        <p className="mt-3 text-xs font-medium text-[#8a97aa]">Supports: JPG · PNG · PDF</p>
        {file && (
          <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#2f7de8]/10 px-4 py-1.5 text-xs font-semibold text-[#2f7de8]">
            <FileUp size={13} />
            {file.name}
          </span>
        )}
      </label>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={uploadFile}
          disabled={loading}
          className="orange-button focus-ring inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? <Loader2 className="animate-spin" size={15} /> : <CheckCircle2 size={15} />}
          {loading ? "Analyzing…" : "Upload & Analyze"}
        </button>
        {error && <p className="text-xs font-medium text-[#e53e3e]">{error}</p>}
      </div>
    </section>
  );
}
