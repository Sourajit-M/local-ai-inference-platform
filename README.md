# 🤖 Local AI Inference Platform (Monorepo)

Welcome to the **Local AI Inference Platform**! This monorepo serves as a fully local, secure, and private playground for AI model inference. It enables users to register accounts, manage persistent conversational sessions, and stream real-time chat completions directly from local LLMs (like `qwen2.5:3b`) powered by the **Ollama** engine.

---

## 🏗️ Monorepo Structure

This project is organized as a workspace-based monorepo to isolate features while facilitating simple local development:

```text
local-ai-inference-platform/
├── apps/
│   ├── api/          # Asynchronous FastAPI backend (Python 3.11+, SQLAlchemy, JWT, uv)
│   └── web/          # React + Vite + TypeScript frontend (React 19, Recharts, pnpm)
├── packages/
│   └── shared/       # Workspace for shared types and helper packages
├── LLM_WIKI.md       # Comprehensive developer wiki (Database ERDs, Architectural diagrams)
└── README.md         # Monorepo overview & Quick Start Guide (This file)
```

---

## 🚀 Key Platform Features

* **Real-time SSE Streaming:** Streams token completions chunk-by-chunk using Server-Sent Events (SSE) for low-latency responses.
* **Persistent Chat Sessions:** Retains complete user conversation histories securely in a local SQLite database (`local_ai.db`) using SQLAlchemy.
* **Secure Bearer Authentication:** Features email-based registrations, login checks, and JWT (JSON Web Tokens) request validation.
* **Harmonious Tech Stack:** Leverages modern tools (`FastAPI`, `uv`, `React 19`, `Vite`, `TypeScript`, `pnpm`) for an ultra-fast developer feedback loop.

---

## ⚙️ Development Prerequisites

Ensure you have the following installed on your machine:
1. **Ollama:** Download and run from [ollama.com](https://ollama.com).
2. **Python:** Version `3.11` or higher.
3. **uv:** Install the super-fast python installer: `pip install uv` (or `curl -LsSf https://astral.sh/uv/install.sh | sh`).
4. **Node.js & pnpm:** Version `18+` of Node and `pnpm` package manager installed globally.

---

## ⚡ Quick Start Guide

Follow these 4 simple steps to run the complete platform locally on your machine:

### Step 1: Initialize the Inference Engine (Ollama)
1. Ensure your local Ollama background service is running.
2. In your terminal, download the default AI model (`qwen2.5:3b`):
   ```powershell
   ollama pull qwen2.5:3b
   ```
3. Verify that Ollama is listening by navigating to `http://localhost:11434` in your browser.

---

### Step 2: Start the FastAPI Backend
1. Open a terminal and navigate to the backend subdirectory:
   ```powershell
   cd apps/api
   ```
2. Install Python dependencies and set up the virtual environment (`.venv`) using `uv`:
   ```powershell
   uv sync
   ```
3. Set your VS Code Python Interpreter to:
   `apps/api/.venv/Scripts/python.exe`
4. Run the development server:
   ```powershell
   uvicorn app.main:app --reload
   ```
*The API is now running at `http://127.0.0.1:8000`. Database schemas will automatically initialize inside `local_ai.db`.*

---

### Step 3: Start the React Frontend
1. Open a new terminal and navigate to the frontend subdirectory:
   ```powershell
   cd apps/web
   ```
2. Install Node dependencies:
   ```powershell
   pnpm install
   ```
3. Start the Vite local development server:
   ```powershell
   pnpm run dev
   ```
*The React UI is now accessible in your browser at `http://localhost:5173`.*

---

## 📖 Deep-Dive Developer Documentation

If you are a developer, AI agent, or architect looking to understand the inner workings of the platform, check out the **[LLM_WIKI.md](file:///d:/Machine%20Learning/local-ai-inference-platform/LLM_WIKI.md)** in the workspace root.

The Wiki covers:
* High-level architectural dataflow diagrams.
* Relational database Entity-Relationship Diagrams (ERD).
* Complete lists of environment configurations, JWT methods, and folder directories.
* Business-logic patterns for streaming completions.
