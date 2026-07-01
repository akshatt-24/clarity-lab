type Biomarker = {
  test_name?: string;
  status?: string;
  explanation?: string;
  possible_causes?: string[];
  questions_to_ask?: string[];
};

type Props = { biomarker: Biomarker };

export default function AttentionCard({ biomarker }: Props) {
  return (
    <div className="glass-card hover-glow mb-3 rounded-xl p-5">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold text-[#0e1d38]">{biomarker.test_name ?? "Biomarker"}</h3>
        <span className="badge-red rounded-full px-2.5 py-0.5 text-xs font-semibold">
          {biomarker.status ?? "Flagged"}
        </span>
      </div>

      <p className="mt-3 text-xs leading-relaxed text-[#5a6b86]">
        {biomarker.explanation ?? "This marker needs review with clinical context."}
      </p>

      {!!biomarker.possible_causes?.length && (
        <div className="mt-3">
          <h4 className="text-xs font-semibold text-[#0e1d38]">Possible Causes</h4>
          <ul className="ml-4 mt-1.5 list-disc space-y-0.5 text-xs text-[#5a6b86]">
            {biomarker.possible_causes.map((cause) => <li key={cause}>{cause}</li>)}
          </ul>
        </div>
      )}

      {!!biomarker.questions_to_ask?.length && (
        <div className="mt-3">
          <h4 className="text-xs font-semibold text-[#0e1d38]">Questions To Ask</h4>
          <ul className="ml-4 mt-1.5 list-disc space-y-0.5 text-xs text-[#5a6b86]">
            {biomarker.questions_to_ask.map((q) => <li key={q}>{q}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}
