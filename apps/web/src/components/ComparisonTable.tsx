interface ModelBenchmark {
  model_name: string;
  average_ttft: number;
  average_latency: number;
  average_tokens_per_second: number;
}

type Props = {
  data: ModelBenchmark[];
};

export default function ComparisonTable({ data }: Props) {
  return (
    <div className="bg-white rounded-2xl border overflow-hidden shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b bg-slate-50 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <th className="px-6 py-4">Model</th>
            <th className="px-6 py-4">TTFT (s)</th>
            <th className="px-6 py-4">Latency (s)</th>
            <th className="px-6 py-4">Throughput (TPS)</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-sm">
          {data.map((row) => (
            <tr key={row.model_name} className="hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4 font-semibold text-slate-900">{row.model_name}</td>
              <td className="px-6 py-4 text-slate-600">{row.average_ttft.toFixed(3)}</td>
              <td className="px-6 py-4 text-slate-600">{row.average_latency.toFixed(3)}</td>
              <td className="px-6 py-4 text-slate-600">{row.average_tokens_per_second.toFixed(2)}</td>
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan={4} className="px-6 py-8 text-center text-slate-400">
                No benchmarks run yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
