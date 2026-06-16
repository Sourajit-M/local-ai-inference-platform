import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30 selection:text-indigo-200 relative overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/30 via-violet-950/10 to-transparent blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-[800px] -left-40 w-96 h-96 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-[1400px] -right-40 w-96 h-96 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Top Navbar */}
      <header className="relative z-10 border-b border-slate-900 bg-slate-950/70 backdrop-blur-md sticky top-0">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-violet-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
              L
            </div>
            <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
              Local AI Inference Platform
            </span>
          </div>

          <div className="flex items-center gap-6">
            <Link
              to="/dashboard"
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              Dashboard
            </Link>
            <a
              href="https://github.com/Sourajit-M/local-ai-inference-platform"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
            >
              GitHub
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
            <Link
              to="/dashboard"
              className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-all shadow-md shadow-indigo-600/10 hover:shadow-indigo-600/20"
            >
              Launch App
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 pt-20 pb-24 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/5 text-xs font-semibold text-indigo-300 mb-8 backdrop-blur-sm animate-pulse">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
          Hardware-Specific Local LLM Profiling
        </div>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
          Benchmark Local AI
          <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400">
            With Scientific Precision
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed">
          Profile, visualize, and compare Time-to-First-Token (TTFT), inference speed (TPS), and latency under varying parameters. Benchmarked locally on client GPU hardware.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/dashboard"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold transition-all shadow-lg shadow-indigo-600/20 hover:shadow-indigo-500/30 text-base flex items-center justify-center gap-2 group"
          >
            Explore Live Demo
            <svg
              className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
          <a
            href="https://github.com/Sourajit-M/local-ai-inference-platform"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded-xl border border-slate-800 hover:border-slate-700 bg-slate-900/30 hover:bg-slate-900/60 text-slate-300 hover:text-white font-bold transition-all text-base flex items-center justify-center gap-2"
          >
            GitHub Repository
            <svg
              className="w-5 h-5 text-slate-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"
              />
            </svg>
          </a>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-16 border-t border-slate-900">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="p-8 rounded-2xl border border-slate-900 bg-slate-950/40 backdrop-blur-md hover:border-indigo-500/30 hover:bg-slate-900/20 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              Multi-Model Benchmarks
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Run standardized prompts across multiple models like Qwen 2.5 3B, Llama 3.2 3B, and Phi 3 Mini under identical hardware constraints.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-8 rounded-2xl border border-slate-900 bg-slate-950/40 backdrop-blur-md hover:border-indigo-500/30 hover:bg-slate-900/20 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              Deep Metric Profiling
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Track Time-to-First-Token (TTFT) for user responsiveness, overall latency for completion speed, and Tokens Per Second (TPS) for generation throughput.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-8 rounded-2xl border border-slate-900 bg-slate-950/40 backdrop-blur-md hover:border-indigo-500/30 hover:bg-slate-900/20 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              Parameter Isolation
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Isolate variables such as temperature (deterministic 0.0 vs creative 0.7) to evaluate the performance impacts of model caching and GPU scheduling.
            </p>
          </div>
        </div>
      </section>

      {/* Architecture Flow Visual Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-16 border-t border-slate-900">
        <h2 className="text-3xl font-bold text-center text-white mb-4">
          Under the Hood: System Architecture
        </h2>
        <p className="text-slate-400 text-center max-w-2xl mx-auto mb-16 text-sm">
          A fully self-hosted stack connecting the frontend visual suite directly to local GPU inference instances via a lightweight FastAPI bridge.
        </p>

        {/* Visual architecture nodes */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 relative">
          {/* Node 1 */}
          <div className="bg-slate-900/20 border border-slate-800 p-6 rounded-2xl relative group overflow-hidden">
            <div className="absolute top-0 right-0 p-3 text-slate-800 font-mono text-xs font-bold">
              01
            </div>
            <div className="text-indigo-400 font-semibold text-xs tracking-wider uppercase mb-2">
              Presentation Layer
            </div>
            <h4 className="text-lg font-bold text-white mb-2">React SPA</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Single-page dashboard built with Vite, TypeScript, and Tailwind. Uses Recharts to visualize performance variations.
            </p>
          </div>

          {/* Node 2 */}
          <div className="bg-slate-900/20 border border-slate-800 p-6 rounded-2xl relative group overflow-hidden">
            <div className="absolute top-0 right-0 p-3 text-slate-800 font-mono text-xs font-bold">
              02
            </div>
            <div className="text-indigo-400 font-semibold text-xs tracking-wider uppercase mb-2">
              API & Coordination
            </div>
            <h4 className="text-lg font-bold text-white mb-2">FastAPI Backend</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Handles dataset triggers, orchestrates model configurations, stores runs in SQLite, and provides analytics payloads.
            </p>
          </div>

          {/* Node 3 */}
          <div className="bg-slate-900/20 border border-slate-800 p-6 rounded-2xl relative group overflow-hidden">
            <div className="absolute top-0 right-0 p-3 text-slate-800 font-mono text-xs font-bold">
              03
            </div>
            <div className="text-indigo-400 font-semibold text-xs tracking-wider uppercase mb-2">
              Model Orchestrator
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Ollama Engine</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Hosts local model parameters, manages contexts, handles memory management, and exposes the streaming completions REST API.
            </p>
          </div>

          {/* Node 4 */}
          <div className="bg-slate-900/20 border border-slate-800 p-6 rounded-2xl relative group overflow-hidden">
            <div className="absolute top-0 right-0 p-3 text-slate-800 font-mono text-xs font-bold">
              04
            </div>
            <div className="text-indigo-400 font-semibold text-xs tracking-wider uppercase mb-2">
              Hardware Layer
            </div>
            <h4 className="text-lg font-bold text-white mb-2">RTX 4050 GPU</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              NVIDIA laptop graphics unit (6GB VRAM) running under WSL2 Ubuntu. Backed by 16GB RAM for optimal local inference execution.
            </p>
          </div>
        </div>
      </section>

      {/* Benchmark Results (Real Numbers) */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-16 border-t border-slate-900">
        <h2 className="text-3xl font-bold text-center text-white mb-4">
          Baseline Performance Findings
        </h2>
        <p className="text-slate-400 text-center max-w-2xl mx-auto mb-12 text-sm">
          Actual benchmark logs extracted from the local machine run on June 12, 2026 at temperature 0.0.
        </p>

        <div className="bg-slate-900/20 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900/50 border-b border-slate-800 text-slate-300 font-mono text-xs">
                  <th className="p-5 font-bold uppercase tracking-wider">Model Name</th>
                  <th className="p-5 font-bold uppercase tracking-wider text-right">Avg TTFT</th>
                  <th className="p-5 font-bold uppercase tracking-wider text-right">Avg Latency</th>
                  <th className="p-5 font-bold uppercase tracking-wider text-right">Avg TPS</th>
                  <th className="p-5 font-bold uppercase tracking-wider text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50 text-sm">
                <tr className="hover:bg-slate-900/20 transition-colors">
                  <td className="p-5 font-bold text-white">Qwen 2.5 3B</td>
                  <td className="p-5 text-right font-mono text-indigo-400 font-semibold">0.81s</td>
                  <td className="p-5 text-right font-mono text-indigo-400 font-semibold">3.98s</td>
                  <td className="p-5 text-right font-mono text-emerald-400 font-semibold">40.17 t/s</td>
                  <td className="p-5 text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400">
                      🏆 Overall Winner
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-slate-900/20 transition-colors">
                  <td className="p-5 font-bold text-slate-300">Phi 3 Mini (3.8B)</td>
                  <td className="p-5 text-right font-mono">8.21s</td>
                  <td className="p-5 text-right font-mono">12.01s</td>
                  <td className="p-5 text-right font-mono text-indigo-300">32.82 t/s</td>
                  <td className="p-5 text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-500/10 text-slate-400">
                      Second Place
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-slate-900/20 transition-colors">
                  <td className="p-5 font-bold text-slate-300">Llama 3.2 3B</td>
                  <td className="p-5 text-right font-mono">9.79s</td>
                  <td className="p-5 text-right font-mono">11.49s</td>
                  <td className="p-5 text-right font-mono text-red-400">19.14 t/s</td>
                  <td className="p-5 text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-500/10 text-red-400">
                      Slowest TTFT / TPS
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-slate-500">
          * Note: Warm models on GPU cache show vastly different performance statistics. Explore comparisons to see cache benefits.
        </div>
      </section>

      {/* Hardware Specifications Details */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-16 border-t border-slate-900">
        <div className="bg-gradient-to-r from-indigo-950/20 to-purple-950/20 border border-slate-800 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-white mb-3">
              Standardized Hardware Bench
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              To guarantee test validity, all measurements are generated locally under identical load levels, preventing background context switching from impacting latency or generation velocity.
            </p>
            <div className="grid grid-cols-2 gap-6 text-left">
              <div>
                <span className="block text-slate-500 text-xs font-semibold uppercase tracking-wider">GPU Card</span>
                <span className="text-slate-200 font-bold text-sm">RTX 4050 Laptop (6GB VRAM)</span>
              </div>
              <div>
                <span className="block text-slate-500 text-xs font-semibold uppercase tracking-wider">Operating System</span>
                <span className="text-slate-200 font-bold text-sm">WSL2 Ubuntu (Linux Kernel)</span>
              </div>
              <div>
                <span className="block text-slate-500 text-xs font-semibold uppercase tracking-wider">Memory Allocation</span>
                <span className="text-slate-200 font-bold text-sm">16 GB DDR5 RAM</span>
              </div>
              <div>
                <span className="block text-slate-500 text-xs font-semibold uppercase tracking-wider">Execution Pipeline</span>
                <span className="text-slate-200 font-bold text-sm">Ollama v0.1.48 API</span>
              </div>
            </div>
          </div>
          <div className="w-full md:w-auto shrink-0 bg-slate-900/60 p-6 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 space-y-2 max-w-xs shadow-inner">
            <div className="text-slate-500"># System profile check</div>
            <div>$ nvidia-smi --query-gpu=name,memory.total --format=csv</div>
            <div className="text-emerald-400">NVIDIA GeForce RTX 4050, 6144 MiB</div>
            <div>$ free -h</div>
            <div className="text-indigo-400">Mem:           15.3GiB   Used: 4.8GiB</div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="relative z-10 border-t border-slate-900 bg-slate-950 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="font-bold text-lg text-white">Local AI Inference Platform</div>
            <p className="text-slate-500 text-xs mt-1">
              Building private, reproducible benchmark suites.
            </p>
          </div>
          <div className="flex gap-6 text-sm text-slate-400">
            <Link to="/dashboard" className="hover:text-white transition-colors">
              App Dashboard
            </Link>
            <a
              href="https://github.com/Sourajit-M/local-ai-inference-platform"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
            <span className="text-slate-700">|</span>
            <span className="text-slate-600">© 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
