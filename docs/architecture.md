# 📐 System Design and Architecture

This document describes the design decisions, engineering trade-offs, and technical implementation details of the Local AI Inference Platform.

---

## 🏗️ Architecture Design Patterns

The platform is designed around a **Client-Server Separation** pattern with full local execution:

```
┌─────────────────┐       HTTP REST / SSE        ┌─────────────────┐
│                 │ ───────────────────────────> │                 │
│    React SPA    │                              │ FastAPI Backend │
│   (Vite App)    │ <─────────────────────────── │   (Python App)  │
│                 │      JSON Logs / Streams     │                 │
└─────────────────┘                              └─────────────────┘
                                                          │
                                                          │ SQLite Queries
                                                          ▼
                                                 ┌─────────────────┐
                                                 │   SQLite DB     │
                                                 │ (local_ai.db)   │
                                                 └─────────────────┘
                                                          │
                                                          │ Ollama REST APIs
                                                          ▼
                                                 ┌─────────────────┐
                                                 │  Ollama Engine  │
                                                 │ (Local Models)  │
                                                 └─────────────────┘
```

### 1. Presentation Layer (apps/web)
* **Single-Page Application (SPA):** Built with React 19, Vite, and TypeScript.
* **Component-Driven UI:** Components are modular, typed, and clean (e.g., `Sidebar.tsx`, `StatCard.tsx`, `ComparisonTable.tsx`).
* **Visual Layer:** Uses Recharts for hardware metrics visualization, plotting generation speed (TPS) and response delays (TTFT).
* **State Management:** Simple, lightweight React state hooks. Falls back to pre-defined static mock records (`demoData.ts`) when backend links are broken, providing immediate utility.

### 2. Coordination Layer (apps/api)
* **High-Performance Routing:** Powered by **FastAPI** to benefit from native Python asynchronous loops (`async`/`await`), which is crucial for handling streaming network endpoints.
* **ORM Engine:** SQLAlchemy 2.0 mapping tables to a local relational schema (`local_ai.db`), tracking credentials, prompt histories, and performance records.
* **Security:** JWT authentication via Bearer tokens. Hashes passwords using bcrypt.

### 3. Execution Layer (Ollama REST Engine)
* **Context Isolation:** The backend invokes the Ollama REST API (`/api/generate` and `/api/chat`) directly.
* **Pre-Flight Guards:** The API runs checks using `ollama.list()` to confirm the selected benchmark model is pulled and stored locally before starting job runs, preventing mid-run out-of-memory or model missing failures.

---

## 💾 Relational Database Schema

The SQLite database (`local_ai.db`) houses the following entity relationships:

1. **User Table:** Holds user identifiers, emails, and hashed password strings.
2. **Benchmark Runs Table:** Stores benchmark telemetry — model names, run timestamps, user prompts, difficulty levels, target temperatures, calculated TTFT, total execution latency, and token throughput speed.
3. **Chat Sessions Table:** Links users to interactive chat conversations.
4. **Messages Table:** Houses the text histories of chat completions, linking back to parents in `Chat Sessions`.

---

## ⚙️ Monorepo Configuration

The workspace utilizes a **pnpm-workspace monorepo** layout. This separation isolates concerns:

* **Separation of Dependencies:** Node dependencies (React, Recharts) are isolated from Python dependencies (FastAPI, SQLAlchemy, uvicorn), preventing bloated docker layers and simplifying dependency management.
* **Inter-app Portability:** Sharing typescript types or config configurations across multiple frontend projects is easily done using Workspace symlinks.
