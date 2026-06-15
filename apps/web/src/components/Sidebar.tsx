import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div
      className="
        w-64
        bg-white
        border-r
        min-h-screen
        p-6
        flex
        flex-col
        shrink-0
        text-left
      "
    >
      <h2 className="font-bold text-2xl mb-8 tracking-tight text-slate-800">
        Local AI
      </h2>

      <nav className="space-y-1 flex-1">
        <Link
          to="/"
          className={`flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            isActive("/")
              ? "bg-slate-100 text-slate-900"
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          }`}
        >
          Dashboard
        </Link>

        <Link
          to="/benchmarks"
          className={`flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            isActive("/benchmarks")
              ? "bg-slate-100 text-slate-900"
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          }`}
        >
          Run Benchmarks
        </Link>

        <Link
          to="/benchmark-runs"
          className={`flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            isActive("/benchmark-runs")
              ? "bg-slate-100 text-slate-900"
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          }`}
        >
          Benchmark Runs
        </Link>

        <Link
          to="/comparison"
          className={`flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            isActive("/comparison")
              ? "bg-slate-100 text-slate-900"
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          }`}
        >
          Comparison
        </Link>
      </nav>
    </div>
  );
}
