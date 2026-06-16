import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Benchmarks from "./pages/Benchmarks";
import BenchmarkRuns from "./pages/BenchmarkRuns";
import Comparison from "./pages/Comparison";
import TemperatureComparison from "./pages/TemperatureComparison";
import Sidebar from "./components/Sidebar";

function AppContent() {
  const location = useLocation();
  const isLanding = location.pathname === "/";

  return (
    <div className={`flex min-h-screen ${isLanding ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-800"} w-full`}>
      {/* Sidebar on the left */}
      {!isLanding && <Sidebar />}

      {/* Content area on the right */}
      <div className="flex-1 min-w-0">
        <Routes>
          <Route
            path="/"
            element={<Landing />}
          />
          <Route
            path="/dashboard"
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
          <Route
            path="/temperature"
            element={<TemperatureComparison />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}