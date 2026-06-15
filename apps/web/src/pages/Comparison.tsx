import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import BenchmarkChart from "../components/BenchmarkChart";
import ComparisonTable from "../components/ComparisonTable";
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
  temperature: number;
  created_at: string;
}

export default function Comparison() {
  const [runs, setRuns] = useState<RunData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTemp, setSelectedTemp] = useState<string>("all");
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

  const availableTemps = useMemo(() => {
    const temps = runs.map((r) => r.temperature);
    return Array.from(new Set(temps))
      .filter((t) => t !== null && t !== undefined)
      .sort((a, b) => a - b);
  }, [runs]);

  const filteredRuns = useMemo(() => {
    if (selectedTemp === "all") return runs;
    const tempVal = parseFloat(selectedTemp);
    return runs.filter((r) => r.temperature === tempVal);
  }, [runs, selectedTemp]);

  const modelAverages = useMemo(() => {
    const groups: Record<string, RunData[]> = {};
    filteredRuns.forEach((run) => {
      if (!groups[run.model_name]) groups[run.model_name] = [];
      groups[run.model_name].push(run);
    });

    return Object.entries(groups).map(([modelName, modelRuns]) => {
      const total = modelRuns.length;
      return {
        model_name: modelName,
        average_ttft: modelRuns.reduce((s, r) => s + r.ttft_seconds, 0) / total,
        average_latency: modelRuns.reduce((s, r) => s + r.latency_seconds, 0) / total,
        average_tokens_per_second:
          modelRuns.reduce((s, r) => s + r.tokens_per_second, 0) / total,
      };
    });
  }, [filteredRuns]);

  return (
    <DashboardLayout
      title="Model Comparison"
      subtitle="Analyze relative performance metrics of local LLMs side-by-side"
    >
      {/* Demo Mode Banner */}
      {isDemo && !loading && (
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 px-5 py-3 text-sm text-amber-800">
          <span className="rounded bg-amber-200 px-2 py-0.5 text-xs font-bold uppercase tracking-wide">
            Demo
          </span>
          <span>
            Showing sample comparison data. Use the temperature filter below to
            explore temp 0.0 vs 0.7 results.
          </span>
        </div>
      )}

      {loading ? (
        <div className="text-slate-500 font-medium py-8">Loading comparison data...</div>
      ) : (
        <div className="space-y-8">
          {/* Temperature Selector */}
          <div className="bg-white p-5 rounded-2xl border shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-slate-800">Parameters Selection</h3>
              <p className="text-sm text-slate-500 mt-1">
                Filter performance metrics by LLM generation temperature.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <label
                htmlFor="temp-select"
                className="text-sm font-semibold text-slate-600"
              >
                Temperature:
              </label>
              <select
                id="temp-select"
                value={selectedTemp}
                onChange={(e) => setSelectedTemp(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm font-medium text-slate-700 outline-none focus:border-slate-400"
              >
                <option value="all">All Logs (Averages)</option>
                {availableTemps.map((temp) => (
                  <option key={temp} value={temp.toString()}>
                    Temp {temp.toFixed(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Leaderboard */}
          <div>
            <h2 className="text-lg font-semibold text-slate-800 mb-4">
              Comparison Leaderboard{" "}
              {selectedTemp !== "all"
                ? `(@ Temp ${parseFloat(selectedTemp).toFixed(1)})`
                : "(Overall)"}
            </h2>
            <ComparisonTable data={modelAverages} />
          </div>

          {/* Charts */}
          <div>
            <h2 className="text-lg font-semibold text-slate-800 mb-4">
              Performance Charts
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border p-6 shadow-sm">
                <h3 className="text-sm uppercase font-semibold text-slate-400 tracking-wider mb-4">
                  Average Time-to-First-Token (Seconds)
                </h3>
                <BenchmarkChart data={modelAverages} dataKey="average_ttft" />
              </div>

              <div className="bg-white rounded-2xl border p-6 shadow-sm">
                <h3 className="text-sm uppercase font-semibold text-slate-400 tracking-wider mb-4">
                  Average Total Latency (Seconds)
                </h3>
                <BenchmarkChart data={modelAverages} dataKey="average_latency" />
              </div>

              <div className="bg-white rounded-2xl border p-6 shadow-sm lg:col-span-2">
                <h3 className="text-sm uppercase font-semibold text-slate-400 tracking-wider mb-4">
                  Average Throughput (Tokens/Second)
                </h3>
                <BenchmarkChart
                  data={modelAverages}
                  dataKey="average_tokens_per_second"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
