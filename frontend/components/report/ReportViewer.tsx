import { AlertCircle, CheckCircle2, TrendingDown, TrendingUp } from "lucide-react";
import { ClarityReport } from "@/lib/api/reports";

export default function ReportViewer({ report }: { report: ClarityReport }) {
  const attention = report.attention_required ?? [];
  const normal    = report.normal_biomarkers   ?? [];

  return (
    <section className="mt-7 space-y-5">
      <div className="grid gap-4 lg:grid-cols-3">
        {/* AI Summary */}
        <div className="glass-card hover-glow rounded-2xl p-6 lg:col-span-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8a97aa]">AI Summary</p>
          <h2 className="mt-2 text-base font-semibold text-[#0e1d38]">Report interpretation</h2>
          <p className="mt-3 text-sm leading-relaxed text-[#5a6b86]">
            {report.summary ?? "Your uploaded report was processed. The detailed clinical summary will appear here when the backend response includes a summary field."}
          </p>
        </div>
        {/* Biomarkers overview */}
        <div className="glass-card hover-glow rounded-2xl p-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8a97aa]">Biomarkers</p>
          <div className="mt-4 grid grid-cols-3 gap-2.5 text-center">
            <Metric label="Normal" value={report.normal_count ?? normal.length}   tone="green"  />
            <Metric label="Low"    value={report.low_count ?? 0}                  tone="blue"   />
            <Metric label="High"   value={report.high_count ?? attention.length}  tone="orange" />
          </div>
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        {/* Attention */}
        <div className="glass-card hover-glow rounded-2xl p-6">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="text-[#e53e3e]" size={18} />
            <h3 className="text-sm font-semibold text-[#0e1d38]">Needs Attention</h3>
          </div>
          <div className="mt-4 space-y-2.5">
            {attention.length ? (
              attention.map((item, index) => (
                <BiomarkerRow key={String(item.test_name ?? index)} item={item} variant="attention" />
              ))
            ) : (
              <p className="rounded-xl bg-white/58 px-4 py-3 text-xs text-[#5a6b86]">No flagged biomarkers returned.</p>
            )}
          </div>
        </div>

        {/* Normal */}
        <div className="glass-card hover-glow rounded-2xl p-6">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="text-[#28893e]" size={18} />
            <h3 className="text-sm font-semibold text-[#0e1d38]">Normal Biomarkers</h3>
          </div>
          <div className="mt-4 space-y-2.5">
            {normal.length ? (
              normal.slice(0, 6).map((item, index) => (
                <BiomarkerRow key={String(item.test_name ?? index)} item={item} variant="normal" />
              ))
            ) : (
              <p className="rounded-xl bg-white/58 px-4 py-3 text-xs text-[#5a6b86]">Normal biomarkers will appear here after analysis.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Metric({ label, value, tone }: { label: string; value: number; tone: "green" | "blue" | "orange" }) {
  const color =
    tone === "green"  ? "text-[#28893e]"  :
    tone === "blue"   ? "text-[#2f7de8]"  :
                        "text-[#f07c00]";
  return (
    <div className="rounded-xl bg-white/58 p-3">
      <div className={`text-2xl font-semibold ${color}`}>{value}</div>
      <div className="mt-0.5 text-[11px] font-medium text-[#8a97aa]">{label}</div>
    </div>
  );
}

function BiomarkerRow({
  item,
  variant,
}: {
  item: Record<string, unknown>;
  variant: "attention" | "normal";
}) {
  const icon  = variant === "attention" ? <TrendingUp size={14} /> : <TrendingDown size={14} />;
  const name  = String(item.test_name ?? item.name ?? "Biomarker");
  const value = String(item.value ?? item.result ?? "Pending");
  const range = String(item.reference_range ?? item.range ?? "Reference range pending");

  return (
    <div className="flex items-center justify-between gap-3 rounded-xl bg-white/60 px-4 py-3">
      <div>
        <div className="text-xs font-semibold text-[#0e1d38]">{name}</div>
        <div className="mt-0.5 text-[11px] text-[#8a97aa]">{range}</div>
      </div>
      <div
        className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
          variant === "attention" ? "badge-red" : "badge-green"
        }`}
      >
        {icon}
        {value}
      </div>
    </div>
  );
}
