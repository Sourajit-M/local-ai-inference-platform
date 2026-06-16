# 🤼 Model-by-Model Performance Analysis

This document provides a comparative analysis of the three open-source models packaged in our standard benchmark suite, detailing the trade-offs between parameter architecture, prompt accuracy, and inference speeds.

---

## 1. Qwen 2.5 3B

* **Developer:** Alibaba Group
* **Parameter Count:** ~3.09 Billion
* **Context Window:** 128k Tokens
* **License:** Apache-2.0

### 📊 Performance Summary
* **Strengths:** Outstanding TTFT under cold conditions. Average TTFT of **0.81s** represents instant responsiveness. Leading overall latency.
* **Weaknesses:** Slight decay in TPS on creative temperatures (from 40.17 t/s to 35.95 t/s).
* **Ideal Workload:** Real-time conversational agents, customer service bots, and applications where user-perceived lag must be close to zero.

### 🧠 Architectural Insights
Qwen 2.5 uses Grouped-Query Attention (GQA) combined with RoPE (Rotary Position Embedding) and SwiGLU activations. Because the 3B model is extremely compact, its memory footprint fits perfectly into the 6GB VRAM of the RTX 4050, leaving ample room for system operations, preventing any swapping to host system RAM.

---

## 2. Phi 3 Mini (3.8B)

* **Developer:** Microsoft
* **Parameter Count:** ~3.82 Billion
* **Context Window:** 4k / 128k (Instruct variant)
* **License:** MIT

### 📊 Performance Summary
* **Strengths:** Highest warm-cache throughput (**36.79 t/s** at temp 0.7). Extremely high density of reasoning capabilities for its size class.
* **Weaknesses:** Massive cold-start load time of **8.21s** before the first token is emitted.
* **Ideal Workload:** Sequential processing, batch parsing, text summarization, and data extraction pipelines where requests can run continuously on a warmed worker thread.

### 🧠 Architectural Insights
Phi 3 Mini is trained on highly curated "textbook-quality" synthetic datasets. Despite its small size, its 3.8B parameters represent dense logical connections, making it heavier to load initially compared to Llama 3.2 3B and Qwen 2.5 3B. However, its implementation of flash attention inside the Ollama execution runner enables excellent speed scaling once model weights reside inside VRAM.

---

## 3. Llama 3.2 3B

* **Developer:** Meta
* **Parameter Count:** ~3.21 Billion
* **Context Window:** 128k Tokens
* **License:** Llama 3.2 Community License

### 📊 Performance Summary
* **Strengths:** Excellent multilingual output capabilities and formatting compliance (e.g. strict JSON outputting).
* **Weaknesses:** Lower throughput under deterministic settings (**19.14 t/s**). High cold-start time (**9.79s**).
* **Ideal Workload:** General reasoning, multilingual translation tasks, and structured schema formatting.

### 🧠 Architectural Insights
Llama 3.2 3B utilizes Grouped-Query Attention and is optimized specifically for mobile and edge device deployment. In our testing environment (WSL2 virtualized memory bridge), Llama 3.2 3B suffered from high cold-start times, indicating a slower parameter weight copy cycle between WSL2's virtual page allocation and the GPU driver bridge. Once warmed, however, it performs at a very respectable **34.55 t/s**.
