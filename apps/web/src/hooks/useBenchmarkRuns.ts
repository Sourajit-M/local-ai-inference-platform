import { useState, useEffect } from "react";
import { getBenchmarkRuns } from "../api/benchmarkApi";
import { DEMO_MODE, demoRuns } from "../demo/demoData";

export interface RunData {
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

export interface ModelAverages {
  model_name: string;
  average_ttft: number;
  average_latency: number;
  average_tokens_per_second: number;
}

export function calculateModelAverages(modelRunsList: RunData[]): ModelAverages[] {
  const groups: Record<string, RunData[]> = {};
  modelRunsList.forEach((run) => {
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
}

export function useBenchmarkRuns() {
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

  return { runs, loading, isDemo };
}
