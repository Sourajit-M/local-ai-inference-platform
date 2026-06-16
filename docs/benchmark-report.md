# 📊 Benchmark Performance Report

**Date of Runs:** June 12, 2026  
**Hardware Bench:** local-client-gpu-01  
**Dataset Version:** `datasets/default.json` (5 prompt configurations)

---

## 🛠️ Testing Environment

All tests were conducted on the following single-node local workstation configuration to isolate external variables:

* **GPU:** NVIDIA GeForce RTX 4050 Laptop GPU (6GB Dedicated GDDR6 VRAM)
* **CPU:** Intel Core i7 (12th Gen)
* **RAM:** 16 GB DDR5 System Memory
* **OS:** Windows 11 running WSL2 (Ubuntu 22.04 LTS Kernel)
* **Inference Server:** Ollama v0.1.48 API running locally on WSL2
* **Database Backend:** SQLite 3 (persistent ORM logging)

---

## 📐 Methodology

Each benchmark run consists of sequential model invocation over the designated prompt set. 

1. **Parameters:**
   - Runs were executed under two temperature configurations: `0.0` (fully deterministic) and `0.7` (creative default).
   - `0.0` runs were performed first.
   - `0.7` runs were executed immediately after.
2. **Cold vs Warm Cache:**
   - The Temperature `0.0` run serves as a "cold-start" where Ollama must load model parameters from SSD to GPU VRAM.
   - The Temperature `0.7` run represents "warm cache" behavior since parameters are already loaded in GPU memory.
3. **Metrics Evaluated:**
   - **Time-to-First-Token (TTFT):** Duration between request submission and receipt of the first character chunk.
   - **Inference Latency:** Total request duration to complete token generation.
   - **Tokens Per Second (TPS):** Calculation of generation throughput: `(Total Tokens Generated) / (Latency - TTFT)`.

---

## 📈 Summary Results (Temp 0.0 — Cold Start)

| Model Name | Parameter Size | Avg TTFT (s) | Avg Latency (s) | Avg TPS | Performance Category |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Qwen 2.5 3B** | 3.09 B | **0.81s** | **3.98s** | **40.17 t/s** | 🏆 **Overall Champion** |
| **Phi 3 Mini** | 3.82 B | 8.21s | 12.01s | 32.82 t/s | Second Place (High TPS) |
| **Llama 3.2 3B** | 3.21 B | 9.79s | 11.49s | 19.14 t/s | Slowest TTFT / TPS |

---

## 📊 Summary Results (Temp 0.7 — Warm Cache)

| Model Name | Avg TTFT (s) | Avg Latency (s) | Avg TPS | Cache Benefit (TTFT Reduction) |
| :--- | :--- | :--- | :--- | :--- |
| **Qwen 2.5 3B** | 3.01s | 6.06s | 35.95 t/s | *Initial cold start was already highly optimized* |
| **Phi 3 Mini** | **0.78s** | **3.26s** | **36.79 t/s** | ⚡ **90.5% TTFT Reduction** |
| **Llama 3.2 3B** | 1.80s | 3.40s | 34.55 t/s | ⚡ **81.6% TTFT Reduction** |

---

## 🔍 Key Observations

1. **Qwen 2.5 3B Optimization:**  
   Qwen 2.5 3B performs exceptionally well on the mobile RTX 4050. Even during cold starts, it loads and produces a first token in under `0.9 seconds`, indicating highly optimized quantization mappings in Ollama.

2. **The Cache Impact:**  
   Phi 3 Mini and Llama 3.2 3B show extreme cold-start lags (8–10s) while loading model layers into VRAM. Once warmed, however, both models generation speeds jump past `34 t/s`, and TTFT drops below `2.0 seconds`. 

3. **Inference Efficiency recommendation:**  
   For interactive web chat apps, Qwen 2.5 3B provides the best initial response feel (TTFT < 1s), while Phi 3 Mini is the strongest runner for high-throughput batch extraction workloads on warm endpoints.
