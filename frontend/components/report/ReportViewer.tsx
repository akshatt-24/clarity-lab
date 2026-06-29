import { AlertCircle, CheckCircle2, TrendingDown, TrendingUp } from "lucide-react";
import { ClarityReport } from "@/lib/api/reports";

export default function ReportViewer({ report }: { report: ClarityReport }) {
  const attention = report.attention_required ?? [];
  const normal = report.normal_biomarkers ?? [];

  return (
    <section className="mt-8 space-y-6">
      <div className="grid gap-5 lg:grid-cols-3">
        <div className="glass-card rounded-2xl p-6 lg:col-span-2">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#60728f]">AI Summary</p>
          <h2 className="mt-3 text-2xl font-semibold text-[#10213f]">Report interpretation</h2>
          <p className="mt-4 text-lg leading-relaxed text-[#5f7192]">
            {report.summary ?? "Your uploaded report was processed. The detailed clinical summary will appear here when the backend response includes a summary field."}
          </p>
        </div>
        <div className="glass-card rounded-2xl p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#60728f]">Biomarkers</p>
          <div className="mt-5 grid grid-cols-3 gap-3 text-center">
            <Metric label="Normal" value={report.normal_count ?? normal.length} tone="green" />
            <Metric label="Low" value={report.low_count ?? 0} tone="blue" />
            <Metric label="High" value={report.high_count ?? attention.length} tone="orange" />
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center gap-3">
            <AlertCircle className="text-[#ef4444]" size={24} />
            <h3 className="text-xl font-semibold text-[#10213f]">Needs Attention</h3>
          </div>
          <div className="mt-5 space-y-3">
            {attention.length ? (
              attention.map((item, index) => (
                <BiomarkerRow key={String(item.test_name ?? index)} item={item} variant="attention" />
              ))
            ) : (
              <p className="rounded-2xl bg-white/60 p-4 text-[#5f7192]">No flagged biomarkers returned.</p>
            )}
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="text-[#2f9342]" size={24} />
            <h3 className="text-xl font-semibold text-[#10213f]">Normal Biomarkers</h3>
          </div>
          <div className="mt-5 space-y-3">
            {normal.length ? (
              normal.slice(0, 6).map((item, index) => (
                <BiomarkerRow key={String(item.test_name ?? index)} item={item} variant="normal" />
              ))
            ) : (
              <p className="rounded-2xl bg-white/60 p-4 text-[#5f7192]">Normal biomarkers will appear here after analysis.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Metric({ label, value, tone }: { label: string; value: number; tone: "green" | "blue" | "orange" }) {
  const color = tone === "green" ? "text-[#2f9342]" : tone === "blue" ? "text-[#2f80ed]" : "text-[#ff8a00]";

  return (
    <div className="rounded-2xl bg-white/62 p-4">
      <div className={`text-3xl font-semibold ${color}`}>{value}</div>
      <div className="mt-1 text-sm font-medium text-[#60728f]">{label}</div>
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
  const icon = variant === "attention" ? <TrendingUp size={18} /> : <TrendingDown size={18} />;
  const name = String(item.test_name ?? item.name ?? "Biomarker");
  const value = String(item.value ?? item.result ?? "Value pending");
  const range = String(item.reference_range ?? item.range ?? "Reference range pending");

  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl bg-white/64 p-4">
      <div>
        <div className="font-semibold text-[#10213f]">{name}</div>
        <div className="mt-1 text-sm text-[#60728f]">{range}</div>
      </div>
      <div className={`flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold ${
        variant === "attention" ? "bg-red-50 text-[#ef4444]" : "bg-green-50 text-[#2f9342]"
      }`}>
        {icon}
        {value}
      </div>
    </div>
  );
}
