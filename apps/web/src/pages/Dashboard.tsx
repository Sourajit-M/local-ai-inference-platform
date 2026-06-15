import { useEffect, useMemo, useState } from "react";

import StatCard from "../components/StatCard";
import BenchmarkChart from "../components/BenchmarkChart";
import ComparisonTable from "../components/ComparisonTable";
import DashboardLayout from "../layouts/DashboardLayout";

import { getBenchmarkSummary } from "../api/benchmarkApi";
import { DEMO_MODE, demoSummary } from "../demo/demoData";

interface ModelBenchmark {
  average_ttft: number;
  average_latency: number;
  average_tokens_per_second: number;
  prompts_tested: number;
}

type BenchmarkSummary = Record<string, ModelBenchmark>;

export default function Dashboard() {
  const [summary, setSummary] = useState<BenchmarkSummary>({});
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    const fetchSummary = async () => {
      if (DEMO_MODE) {
        setSummary(demoSummary);
        setIsDemo(true);
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setSummary(demoSummary);
          setIsDemo(true);
          return;
        }
        const data = await getBenchmarkSummary(token);
        setSummary(data);
      } catch {
        // API unreachable — fall back to demo data
        setSummary(demoSummary);
        setIsDemo(true);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  const chartData = useMemo(() => {
    return Object.entries(summary).map(([modelName, metrics]) => ({
      model_name: modelName,
      ...metrics,
    }));
  }, [summary]);

  const bestTTFT = useMemo(() => {
    if (!chartData.length) return null;
    return [...chartData].sort((a, b) => a.average_ttft - b.average_ttft)[0];
  }, [chartData]);

  const bestLatency = useMemo(() => {
    if (!chartData.length) return null;
    return [...chartData].sort((a, b) => a.average_latency - b.average_latency)[0];
  }, [chartData]);

  const bestTPS = useMemo(() => {
    if (!chartData.length) return null;
    return [...chartData].sort(
      (a, b) => b.average_tokens_per_second - a.average_tokens_per_second
    )[0];
  }, [chartData]);

  const overallStats = useMemo(() => {
    if (chartData.length === 0) return { models: 0, avgTTFT: 0, avgLatency: 0, avgTPS: 0 };

    const models = chartData.length;
    const avgTTFT = chartData.reduce((s, i) => s + i.average_ttft, 0) / models;
    const avgLatency = chartData.reduce((s, i) => s + i.average_latency, 0) / models;
    const avgTPS = chartData.reduce((s, i) => s + i.average_tokens_per_second, 0) / models;

    return {
      models,
      avgTTFT: avgTTFT.toFixed(3),
      avgLatency: avgLatency.toFixed(3),
      avgTPS: avgTPS.toFixed(2),
    };
  }, [chartData]);

  if (loading) {
    return (
      <div className="p-8 text-slate-500 font-medium">Loading dashboard...</div>
    );
  }

  return (
    <DashboardLayout
      title="Local AI Inference Platform"
      subtitle="Benchmark Analytics Dashboard"
    >
      {/* Demo Mode Banner */}
      {isDemo && (
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 px-5 py-3 text-sm text-amber-800">
          <span className="rounded bg-amber-200 px-2 py-0.5 text-xs font-bold uppercase tracking-wide">
            Demo
          </span>
          <span>
            Showing sample benchmark data recorded on 2026-06-12. Connect a live
            backend and set your JWT token to see real results.
          </span>
        </div>
      )}

      <div className="space-y-8">
        {/* Section: Overview Stats */}
        <div>
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            System Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard title="Models Tested" value={overallStats.models} />
            <StatCard title="Avg TTFT (s)" value={overallStats.avgTTFT} />
            <StatCard title="Avg Latency (s)" value={overallStats.avgLatency} />
            <StatCard title="Avg Tokens/sec" value={overallStats.avgTPS} />
          </div>
        </div>

        {/* Section: Hero Metrics */}
        <div>
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            Winner Standings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard title="🚀 Fastest TTFT" value={bestTTFT?.model_name ?? "-"} />
            <StatCard title="🎯 Lowest Latency" value={bestLatency?.model_name ?? "-"} />
            <StatCard title="⚡ Highest TPS" value={bestTPS?.model_name ?? "-"} />
          </div>
        </div>

        {/* Section: Comparison Table */}
        <div>
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            Model Benchmarking Leaderboard
          </h2>
          <ComparisonTable data={chartData} />
        </div>

        {/* Section: Charts + Insights */}
        <div>
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            Comparative Analysis
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border p-6 shadow-sm">
              <h3 className="text-sm uppercase font-semibold text-slate-400 tracking-wider mb-4">
                Average TTFT (Seconds)
              </h3>
              <BenchmarkChart data={chartData} dataKey="average_ttft" />
            </div>

            <div className="bg-white rounded-2xl border p-6 shadow-sm">
              <h3 className="text-sm uppercase font-semibold text-slate-400 tracking-wider mb-4">
                Average Latency (Seconds)
              </h3>
              <BenchmarkChart data={chartData} dataKey="average_latency" />
            </div>

            <div className="bg-white rounded-2xl border p-6 shadow-sm">
              <h3 className="text-sm uppercase font-semibold text-slate-400 tracking-wider mb-4">
                Throughput (Tokens Per Second)
              </h3>
              <BenchmarkChart data={chartData} dataKey="average_tokens_per_second" />
            </div>

            <div className="bg-white rounded-2xl border p-6 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-sm uppercase font-semibold text-slate-400 tracking-wider mb-4">
                  Benchmark Insights
                </h3>
                <ul className="space-y-3 mt-4 text-sm text-slate-600">
                  <li className="flex justify-between border-b pb-2">
                    <span className="font-medium">Fastest TTFT:</span>
                    <span className="text-slate-900 font-semibold">{bestTTFT?.model_name ?? "-"}</span>
                  </li>
                  <li className="flex justify-between border-b pb-2">
                    <span className="font-medium">Lowest Latency:</span>
                    <span className="text-slate-900 font-semibold">{bestLatency?.model_name ?? "-"}</span>
                  </li>
                  <li className="flex justify-between border-b pb-2">
                    <span className="font-medium">Highest Throughput:</span>
                    <span className="text-slate-900 font-semibold">{bestTPS?.model_name ?? "-"}</span>
                  </li>
                </ul>
              </div>
              <div className="mt-8 pt-4 border-t text-xs text-slate-400">
                Models Tested: Qwen 2.5 3B, Llama 3.2 3B, Phi3 Mini
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}