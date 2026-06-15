import axios from "axios"

// Use VITE_API_URL env variable so Vercel deployments can point to a live API.
// Falls back to localhost for local development.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
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

export const getBenchmarkRuns = async (token: string) => {
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