export interface BenchmarkSummary{
  average_ttft : number
  average_latency: number
  average_tokens_per_second: number
  prompts_tested: number
}

export interface BenchmarkRun{
  model_name: string
  ttft_seconds: number
  latency_seconds: number
  tokens_per_second: number
}