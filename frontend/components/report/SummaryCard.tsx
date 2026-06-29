type Props = {
  summary: string
  normal_count: number
  low_count: number
  high_count: number
}

export default function SummaryCard({
  summary,
  normal_count,
  low_count,
  high_count,
}: Props) {
  return (
    <div className="border rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-4">
        Report Summary
      </h2>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <p className="text-sm">Normal</p>
          <p className="text-2xl font-bold">
            {normal_count}
          </p>
        </div>

        <div>
          <p className="text-sm">Low</p>
          <p className="text-2xl font-bold">
            {low_count}
          </p>
        </div>

        <div>
          <p className="text-sm">High</p>
          <p className="text-2xl font-bold">
            {high_count}
          </p>
        </div>
      </div>

      <p>{summary}</p>
    </div>
  )
}