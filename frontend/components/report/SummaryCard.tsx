type Props = {
  summary: string;
  normal_count: number;
  low_count: number;
  high_count: number;
};

export default function SummaryCard({ summary, normal_count, low_count, high_count }: Props) {
  return (
    <div className="glass-card hover-glow rounded-2xl p-6">
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8a97aa]">Report Summary</p>
      <h2 className="mt-2 text-base font-semibold text-[#0e1d38]">Overview</h2>

      <div className="mt-4 grid grid-cols-3 gap-3 text-center">
        <div className="rounded-xl bg-white/58 p-3">
          <div className="text-2xl font-semibold text-[#28893e]">{normal_count}</div>
          <div className="mt-0.5 text-[11px] font-medium text-[#8a97aa]">Normal</div>
        </div>
        <div className="rounded-xl bg-white/58 p-3">
          <div className="text-2xl font-semibold text-[#2f7de8]">{low_count}</div>
          <div className="mt-0.5 text-[11px] font-medium text-[#8a97aa]">Low</div>
        </div>
        <div className="rounded-xl bg-white/58 p-3">
          <div className="text-2xl font-semibold text-[#f07c00]">{high_count}</div>
          <div className="mt-0.5 text-[11px] font-medium text-[#8a97aa]">High</div>
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-[#5a6b86]">{summary}</p>
    </div>
  );
}
