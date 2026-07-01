type Biomarker = { test_name?: string; value?: string | number };
type Props = { biomarkers: Biomarker[] };

export default function NormalBiomarkersCard({ biomarkers }: Props) {
  return (
    <div className="glass-card hover-glow rounded-xl p-5">
      <h2 className="text-sm font-semibold text-[#0e1d38]">Normal Biomarkers</h2>
      <div className="mt-3 space-y-2">
        {biomarkers.map((item, index) => (
          <div
            key={`${item.test_name ?? "marker"}-${index}`}
            className="flex justify-between gap-3 rounded-xl bg-white/58 px-3.5 py-2.5"
          >
            <span className="text-xs text-[#0e1d38]">{item.test_name ?? "Biomarker"}</span>
            <span className="badge-green rounded-full px-2.5 py-0.5 text-xs font-semibold">
              {item.value ?? "Normal"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
