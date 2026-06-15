import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:8000/api",
})

export const getBenchmarkSummary = async (token: string) => {
  const res = await api.get(
    "/benchmarks",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return res.data;
}

export const getBenchmarkRuns = async(token: string) => {
  const res = await api.get(
    "/benchmarks/runs",
    {
      headers: {
        Authorization: `Bearer ${token}`
      },
    }
  )

  return res.data
}