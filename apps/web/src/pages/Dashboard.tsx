import { useEffect, useMemo, useState } from "react";

import StatCard from "../components/StatCard";
import BenchmarkChart from "../components/BenchmarkChart";

import { getBenchmarkSummary } from "../api/benchmarkApi";

interface ModelBenchmark {
  average_ttft: number;
  average_latency: number;
  average_tokens_per_second: number;
  prompts_tested: number;
}

type BenchmarkSummary = Record<
  string,
  ModelBenchmark
>;

export default function Dashboard() {
  const [summary, setSummary] =
    useState<BenchmarkSummary>({});

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const token =
          localStorage.getItem("token");

        if (!token) return;

        const data =
          await getBenchmarkSummary(token);

        setSummary(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  const chartData = useMemo(() => {
    return Object.entries(summary).map(
      ([modelName, metrics]) => ({
        model_name: modelName,
        ...metrics,
      })
    );
  }, [summary]);

  const overallStats = useMemo(() => {
    if (chartData.length === 0) {
      return {
        models: 0,
        avgTTFT: 0,
        avgLatency: 0,
        avgTPS: 0,
      };
    }

    const models = chartData.length;

    const avgTTFT =
      chartData.reduce(
        (sum, item) =>
          sum + item.average_ttft,
        0
      ) / models;

    const avgLatency =
      chartData.reduce(
        (sum, item) =>
          sum + item.average_latency,
        0
      ) / models;

    const avgTPS =
      chartData.reduce(
        (sum, item) =>
          sum +
          item.average_tokens_per_second,
        0
      ) / models;

    return {
      models,
      avgTTFT: avgTTFT.toFixed(3),
      avgLatency: avgLatency.toFixed(3),
      avgTPS: avgTPS.toFixed(2),
    };
  }, [chartData]);

  if (loading) {
    return (
      <div className="p-6">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Local AI Inference Platform
        </h1>

        <p className="text-gray-500">
          Benchmark Analytics Dashboard
        </p>
      </div>

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-4
          gap-4
        "
      >
        <StatCard
          title="Models Tested"
          value={overallStats.models}
        />

        <StatCard
          title="Avg TTFT (s)"
          value={overallStats.avgTTFT}
        />

        <StatCard
          title="Avg Latency (s)"
          value={overallStats.avgLatency}
        />

        <StatCard
          title="Avg Tokens/sec"
          value={overallStats.avgTPS}
        />
      </div>

      <div className="space-y-10">
        <div>
          <h2 className="text-xl font-semibold mb-3">
            Average TTFT
          </h2>

          <BenchmarkChart
            data={chartData}
            dataKey="average_ttft"
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">
            Average Latency
          </h2>

          <BenchmarkChart
            data={chartData}
            dataKey="average_latency"
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">
            Tokens Per Second
          </h2>

          <BenchmarkChart
            data={chartData}
            dataKey="average_tokens_per_second"
          />
        </div>
      </div>
    </div>
  );
}