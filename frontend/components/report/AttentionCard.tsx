type Biomarker = {
  test_name?: string;
  status?: string;
  explanation?: string;
  possible_causes?: string[];
  questions_to_ask?: string[];
};

type Props = {
  biomarker: Biomarker;
};

export default function AttentionCard({ biomarker }: Props) {
  return (
    <div className="glass-card mb-4 rounded-2xl p-6">
      <div className="flex justify-between gap-4">
        <h3 className="text-xl font-semibold text-[#10213f]">
          {biomarker.test_name ?? "Biomarker"}
        </h3>
        <span className="rounded-full bg-red-50 px-3 py-1 text-sm font-semibold text-[#ef4444]">
          {biomarker.status ?? "Flagged"}
        </span>
      </div>

      <p className="mt-4 text-[#5f7192]">
        {biomarker.explanation ?? "This marker needs review with clinical context."}
      </p>

      {!!biomarker.possible_causes?.length && (
        <div className="mt-4">
          <h4 className="font-semibold text-[#10213f]">Possible Causes</h4>
          <ul className="ml-6 mt-2 list-disc text-[#5f7192]">
            {biomarker.possible_causes.map((cause) => (
              <li key={cause}>{cause}</li>
            ))}
          </ul>
        </div>
      )}

      {!!biomarker.questions_to_ask?.length && (
        <div className="mt-4">
          <h4 className="font-semibold text-[#10213f]">Questions To Ask</h4>
          <ul className="ml-6 mt-2 list-disc text-[#5f7192]">
            {biomarker.questions_to_ask.map((question) => (
              <li key={question}>{question}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
