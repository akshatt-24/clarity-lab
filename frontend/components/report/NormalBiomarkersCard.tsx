type Biomarker = {
  test_name?: string;
  value?: string | number;
};

type Props = {
  biomarkers: Biomarker[];
};

export default function NormalBiomarkersCard({ biomarkers }: Props) {
  return (
    <div className="glass-card rounded-2xl p-6">
      <h2 className="mb-4 text-xl font-semibold text-[#10213f]">Normal Biomarkers</h2>
      <div className="space-y-2">
        {biomarkers.map((item, index) => (
          <div key={`${item.test_name ?? "marker"}-${index}`} className="flex justify-between gap-4 rounded-xl bg-white/60 p-3">
            <span className="text-[#10213f]">{item.test_name ?? "Biomarker"}</span>
            <span className="font-semibold text-[#2f9342]">{item.value ?? "Normal"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
