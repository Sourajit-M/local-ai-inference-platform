import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Benchmarks from "./pages/Benchmarks";
import BenchmarkRuns from "./pages/BenchmarkRuns";
import Comparison from "./pages/Comparison";
import Sidebar from "./components/Sidebar";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-slate-50 w-full">
        {/* Sidebar on the left */}
        <Sidebar />

        {/* Content area on the right */}
        <div className="flex-1 min-w-0">
          <Routes>
            <Route
              path="/"
              element={<Dashboard />}
            />

            <Route
              path="/benchmarks"
              element={<Benchmarks />}
            />

            <Route
              path="/benchmark-runs"
              element={<BenchmarkRuns />}
            />

            <Route
              path="/comparison"
              element={<Comparison />}
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}