import { useMemo } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { useBenchmarkRuns, calculateModelAverages } from "../hooks/useBenchmarkRuns";
import type { ModelAverages } from "../hooks/useBenchmarkRuns";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface ChartProps {
  data: Record<string, unknown>[];
  dataKey1: string;
  dataKey2: string;
  name1: string;
  name2: string;
  yLabel: string;
  angleX?: boolean;
}

function TempComparisonChart({
  data,
  dataKey1,
  dataKey2,
  name1,
  name2,
  yLabel,
  angleX = false,
}: ChartProps) {
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="model_name"
            angle={angleX ? -10 : 0}
            textAnchor={angleX ? "end" : "middle"}
            height={angleX ? 45 : 30}
          />
          <YAxis domain={[0, "auto"]} label={{ value: yLabel, angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Bar name={name1} dataKey={dataKey1} fill="#6366f1" radius={[4, 4, 0, 0]} />
          <Bar name={name2} dataKey={dataKey2} fill="#a855f7" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

interface TableProps {
  title: string;
  badgeText: string;
  badgeClass: string;
  averages: ModelAverages[];
}

function TempComparisonTable({ title, badgeText, badgeClass, averages }: TableProps) {
  return (
    <div className="bg-white p-6 rounded-2xl border shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-slate-800">{title}</h3>
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${badgeClass}`}>
          {badgeText}
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b text-slate-500 font-semibold">
              <th className="py-2.5">Model</th>
              <th className="py-2.5 text-right">Avg TTFT</th>
              <th className="py-2.5 text-right">Avg Latency</th>
              <th className="py-2.5 text-right">Avg TPS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {averages.map((avg) => (
              <tr key={avg.model_name} className="hover:bg-slate-50/50">
                <td className="py-3 font-semibold text-slate-700">{avg.model_name}</td>
                <td className="py-3 text-right font-mono text-slate-600">{avg.average_ttft.toFixed(2)}s</td>
                <td className="py-3 text-right font-mono text-slate-600">{avg.average_latency.toFixed(2)}s</td>
                <td className="py-3 text-right font-mono text-slate-600">{avg.average_tokens_per_second.toFixed(1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// fallow-ignore-next-line complexity
export default function TemperatureComparison() {
  const { runs, loading, isDemo } = useBenchmarkRuns();

  // Compute metrics split by temperature
  const metricsByTemp = useMemo(() => {
    const temp00Runs = runs.filter((r) => r.temperature === 0.0);
    const temp07Runs = runs.filter((r) => r.temperature === 0.7);

    const averages00 = calculateModelAverages(temp00Runs);
    const averages07 = calculateModelAverages(temp07Runs);

    // Merge for chart display
    const mergedModels = Array.from(new Set(runs.map((r) => r.model_name)));
    // fallow-ignore-next-line complexity
    const chartData = mergedModels.map((model) => {
      const m00 = averages00.find((m) => m.model_name === model);
      const m07 = averages07.find((m) => m.model_name === model);

      return {
        model_name: model,
        ttft_00: m00 ? parseFloat(m00.average_ttft.toFixed(3)) : 0,
        ttft_07: m07 ? parseFloat(m07.average_ttft.toFixed(3)) : 0,
        latency_00: m00 ? parseFloat(m00.average_latency.toFixed(3)) : 0,
        latency_07: m07 ? parseFloat(m07.average_latency.toFixed(3)) : 0,
        tps_00: m00 ? parseFloat(m00.average_tokens_per_second.toFixed(2)) : 0,
        tps_07: m07 ? parseFloat(m07.average_tokens_per_second.toFixed(2)) : 0,
      };
    });

    return {
      averages00,
      averages07,
      chartData,
    };
  }, [runs]);

  return (
    <DashboardLayout
      title="Temperature Comparison"
      subtitle="Analyze deterministic (0.0) vs creative (0.7) parameter performance runs"
    >
      {/* Demo Mode Banner */}
      {isDemo && !loading && (
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 px-5 py-3 text-sm text-amber-800">
          <span className="rounded bg-amber-200 px-2 py-0.5 text-xs font-bold uppercase tracking-wide">
            Demo
          </span>
          <span>
            Showing sample temperature runs. Notice the RAM/GPU cache warming impact on Time-to-First-Token.
          </span>
        </div>
      )}

      {loading ? (
        <div className="text-slate-500 font-medium py-8">Loading temperature data...</div>
      ) : (
        <div className="space-y-8">
          {/* Scientific Context / Explanation Card */}
          <div className="bg-slate-900 border border-slate-800 text-slate-100 p-6 md:p-8 rounded-2xl shadow-md">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0 mt-0.5">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">Under the Hood: GPU Cache Warming</h3>
                <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                  In local inference pipelines, the very first API call to a specific model incurs a massive cold-start latency. 
                  This is the time required to read model parameters from storage and load them into GPU VRAM (seen in our dataset during the initial Temperature 0.0 runs).
                </p>
                <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                  Subsequent runs (our Temperature 0.7 runs) run against a warmed cache, showing true raw execution speed. 
                  This explains why <strong>Llama 3.2 3B</strong> and <strong>Phi 3 Mini</strong> show dramatically lower TTFT (often under 2 seconds) during the 0.7 run series compared to their 8–9 second cold starts.
                </p>
              </div>
            </div>
          </div>

          {/* Leaderboard Table Side-by-Side */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Temp 0.0 */}
            <TempComparisonTable
              title="Temperature 0.0 (Deterministic)"
              badgeText="Cold Start / First Run"
              badgeClass="bg-indigo-50 text-indigo-600 border-indigo-100"
              averages={metricsByTemp.averages00}
            />

            {/* Temp 0.7 */}
            <TempComparisonTable
              title="Temperature 0.7 (Creative)"
              badgeText="Warm Cache / Subsequent Runs"
              badgeClass="bg-violet-50 text-violet-600 border-violet-100"
              averages={metricsByTemp.averages07}
            />
          </div>

          {/* Performance Charts Comparing Temps */}
          <div>
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Temperature Impact Visualization</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* TTFT Chart */}
              <div className="bg-white rounded-2xl border p-6 shadow-sm">
                <h3 className="text-sm uppercase font-semibold text-slate-400 tracking-wider mb-4">
                  Average Time-to-First-Token (Lower is Better)
                </h3>
                <TempComparisonChart
                  data={metricsByTemp.chartData}
                  dataKey1="ttft_00"
                  dataKey2="ttft_07"
                  name1="Temp 0.0 (Cold)"
                  name2="Temp 0.7 (Warm)"
                  yLabel="Seconds"
                  angleX
                />
              </div>

              {/* TPS Chart */}
              <div className="bg-white rounded-2xl border p-6 shadow-sm">
                <h3 className="text-sm uppercase font-semibold text-slate-400 tracking-wider mb-4">
                  Generation Throughput (Higher is Better)
                </h3>
                <TempComparisonChart
                  data={metricsByTemp.chartData}
                  dataKey1="tps_00"
                  dataKey2="tps_07"
                  name1="Temp 0.0 (Deterministic)"
                  name2="Temp 0.7 (Creative)"
                  yLabel="Tokens/Sec"
                  angleX
                />
              </div>

              {/* Latency Chart */}
              <div className="bg-white rounded-2xl border p-6 shadow-sm lg:col-span-2">
                <h3 className="text-sm uppercase font-semibold text-slate-400 tracking-wider mb-4">
                  Total Completion Latency (Seconds)
                </h3>
                <TempComparisonChart
                  data={metricsByTemp.chartData}
                  dataKey1="latency_00"
                  dataKey2="latency_07"
                  name1="Temp 0.0 (Cold)"
                  name2="Temp 0.7 (Warm)"
                  yLabel="Seconds"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
