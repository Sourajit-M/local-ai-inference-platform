import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { getBenchmarkRuns } from "../api/benchmarkApi";
import { DEMO_MODE, demoRuns } from "../demo/demoData";

interface RunData {
  id: number;
  model_name: string;
  prompt_name: string;
  prompt_category: string;
  prompt_difficulty: string;
  ttft_seconds: number;
  latency_seconds: number;
  tokens_per_second: number;
  created_at: string;
}

export default function BenchmarkRuns() {
  const [runs, setRuns] = useState<RunData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    if (DEMO_MODE) {
      setRuns(demoRuns);
      setIsDemo(true);
      setLoading(false);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setRuns(demoRuns);
      setIsDemo(true);
      setLoading(false);
      return;
    }

    getBenchmarkRuns(token)
      .then((data) => setRuns(data))
      .catch(() => {
        setRuns(demoRuns);
        setIsDemo(true);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <DashboardLayout
      title="Benchmark Runs"
      subtitle="Historical inference performance logs"
    >
      {/* Demo Mode Banner */}
      {isDemo && !loading && (
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 px-5 py-3 text-sm text-amber-800">
          <span className="rounded bg-amber-200 px-2 py-0.5 text-xs font-bold uppercase tracking-wide">
            Demo
          </span>
          <span>
            Showing 30 sample run logs (3 models × 5 prompts × 2 temperatures).
          </span>
        </div>
      )}

      {loading ? (
        <div className="text-slate-500 font-medium py-8">Loading run history...</div>
      ) : (
        <div className="bg-white rounded-2xl border overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b bg-slate-50 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="px-6 py-4">Model</th>
                <th className="px-6 py-4">Prompt Category</th>
                <th className="px-6 py-4">Difficulty</th>
                <th className="px-6 py-4 text-right">TTFT (s)</th>
                <th className="px-6 py-4 text-right">Latency (s)</th>
                <th className="px-6 py-4 text-right">TPS</th>
                <th className="px-6 py-4 text-right">Executed At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {runs.map((run) => (
                <tr key={run.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-900">
                    {run.model_name}
                  </td>
                  <td className="px-6 py-4 text-slate-600 capitalize">
                    {run.prompt_category}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium capitalize ${
                        run.prompt_difficulty === "easy"
                          ? "bg-green-100 text-green-800"
                          : run.prompt_difficulty === "medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {run.prompt_difficulty || "unknown"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-slate-600 font-mono">
                    {run.ttft_seconds.toFixed(3)}
                  </td>
                  <td className="px-6 py-4 text-right text-slate-600 font-mono">
                    {run.latency_seconds.toFixed(3)}
                  </td>
                  <td className="px-6 py-4 text-right text-slate-600 font-mono">
                    {run.tokens_per_second.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-right text-slate-500 text-xs">
                    {new Date(run.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
              {runs.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-400">
                    No run logs recorded yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </DashboardLayout>
  );
}
