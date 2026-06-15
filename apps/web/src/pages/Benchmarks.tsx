import { useEffect, useState } from "react";

import BenchmarkChart from "../components/BenchmarkChart";

import { getBenchmarkRuns } from "../api/benchmarkApi";

export default function Benchmarks(){
  const [ runs, setRuns ] = useState([])

  useEffect(() => {
    const token = localStorage.getItem("token")

    if(!token) return

    getBenchmarkRuns(token).then(setRuns)
  }, [])

  return (
    <div>
      <h1>Benchmarks</h1>

      <BenchmarkChart
        data={runs}
        dataKey="ttft_seconds"
      />

      <BenchmarkChart
        data={runs}
        dataKey="latency_seconds"
      />

      <BenchmarkChart
        data={runs}
        dataKey="tokens_per_second"
      />
    </div>
  )
}