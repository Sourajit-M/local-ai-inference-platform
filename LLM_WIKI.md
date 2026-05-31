# Local AI Inference Platform - Project Wiki

Welcome to the **Local AI Inference Platform**! This wiki acts as the comprehensive source of truth for the codebase architecture, tech stack, and execution guidelines. It is designed to help developer agents and human collaborators onboard and understand the project quickly.

---

## 🏗️ Architecture Overview

The project is structured as a monorepo containing a high-performance Python FastAPI backend and a responsive React frontend. It leverages local inference engines (specifically **Ollama**) to stream large language model completions securely and privately on the host machine.

### Core System Diagram

```mermaid
graph TD
    subgraph Client ["Client Layer (apps/web)"]
        FE["React + Vite UI"]
    end

    subgraph API ["Backend API Layer (apps/api)"]
        RT["FastAPI Router (app/api/routes)"]
        SC["Pydantic Schemas (app/schemas)"]
        SVC["Ollama Service (app/services)"]
        CFG["Config/Settings (app/config)"]
        DB["SQLAlchemy DB (app/db)"]
    end

    subgraph LLM ["Local Inference Layer"]
        OL["Ollama Daemon (localhost:11434)"]
        QW["Qwen 2.5 (3B) Model"]
    end

    FE -->|HTTP Post / SSE Stream| RT
    RT -->|Request/Response Validation| SC
    RT -->|Delegates Logic| SVC
    CFG -->|Loads Environment| API
    SVC -->|Connects via httpx client| OL
    OL -->|Runs model| QW
```

---

## 📂 Project Directory Structure

```text
local-ai-inference-platform/
├── apps/
│   ├── api/                   # Backend Application
│   │   ├── app/               # FastAPI Application Core
│   │   │   ├── api/           # API Routers & Route Endpoints
│   │   │   ├── config/        # Environment Configuration (settings.py)
│   │   │   ├── core/          # App Security, Middleware & Core Helpers
│   │   │   ├── db/            # Database Models & Connections
│   │   │   ├── models/        # SQLAlchemy Models (DB tables)
│   │   │   ├── schemas/       # Pydantic Schemas (validation)
│   │   │   ├── services/      # Service Layer (OllamaService, etc.)
│   │   │   └── main.py        # Backend FastAPI Entry Point
│   │   ├── .venv/             # Python Virtual Environment
│   │   ├── pyproject.toml     # Backend dependencies (managed via uv)
│   │   ├── uv.lock            # Backend Lockfile
│   │   └── .env               # Backend Environment variables
│   └── web/                   # Frontend Application (React + Vite + TypeScript)
│       ├── src/               # React Source Files
│       │   ├── assets/        # Media and static assets
│       │   ├── App.tsx        # Main UI Component
│       │   ├── App.css        # App CSS styles
│       │   ├── index.css      # Base Tailwind/Global CSS
│       │   └── main.tsx       # Vite entrypoint
│       └── package.json       # Frontend dependencies (managed via pnpm)
├── packages/
│   └── shared/                # Intended for shared monorepo modules
├── docker/                    # Docker containerization resources
├── experiments/               # ML & AI testing scripts/notebooks
├── prompts/                   # System prompt design files
└── reports/                   # Performance & benchmarking logs
```

---

## 🛠️ Technology Stack

| Component | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Backend Core** | Python, FastAPI | `3.11+` | High-performance asynchronous API endpoints |
| **Dependency Manager** | `uv` | Latest | Extremely fast Python dependency resolver and installer |
| **Settings Management** | Pydantic Settings | `^2.13.0` | Strongly-typed configuration with environment validation |
| **Inference Client** | Ollama Python SDK | `^0.6.2` | Interfaces directly with local Ollama daemon |
| **Database ORM** | SQLAlchemy, Alembic | Latest | Database schemas, connections, and migrations |
| **Frontend Core** | React | `^19.2.6` | Client UI rendering |
| **Build Tool** | Vite, TypeScript | Latest | Ultra-fast local development server and compilation |
| **Package Manager** | `pnpm` | Latest | Workspace monorepo dependency caching |
| **Data Fetching** | Axios, React Query | Latest | Declarative caching and data synchronization |
| **Inference Server** | Ollama | Local | Locally-hosted LLM runtime environment |

---

## ⚙️ Environment Configuration

Backend configurations are managed securely using environment variables located in `apps/api/.env`. These variables are mapped into Python types via [settings.py](file:///d:/Machine%20Learning/local-ai-inference-platform/apps/api/app/config/settings.py).

### Loaded Parameters

* `APP_NAME`: Title of the platform (Defaults to `"Local AI Inference Platform"`).
* `MODEL_NAME`: Local LLM identifier (Defaults to `"qwen2.5:3b"`).
* `OLLAMA_HOST`: The endpoint where Ollama service is listening (Defaults to `http://localhost:11434`).
* `JWT_SECRET_KEY`: Secret used to sign user auth tokens.
* `JWT_ALGORITHM`: Cryptographic signature format (Defaults to `"HS256"`).
* `ACCESS_TOKEN_EXPIRE_MINUTES`: Expiration time for login tokens.

> [!IMPORTANT]
> **Static Type Resolution (Pylance):**
> All configuration attributes in `Settings` are declared with safe fallback default values matching `.env`. This completely satisfies Pylance/VS Code static check analyzers and eliminates `Arguments missing` type errors during instantiation.

---

## 🚀 Execution & Setup Guide

### 1. Local AI Backend (Ollama)
Before launching the software, ensure the local inference daemon is running:
1. Start the Ollama Desktop App or run `ollama serve` in your terminal.
2. Verify the server is active at `http://localhost:11434`.
3. Pull the required model:
   ```bash
   ollama pull qwen2.5:3b
   ```

### 2. FastAPI Backend
The API leverages the Python interpreter inside `apps/api/.venv/`.
1. Select `apps/api/.venv/Scripts/python.exe` as the VS Code Python interpreter.
2. From `apps/api/`, run the Uvicorn development server:
   ```bash
   uvicorn app.main:app --reload
   ```

### 3. React Frontend
The web interface is managed via `pnpm`.
1. Navigate to the `apps/web` directory.
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Start the Vite server:
   ```bash
   pnpm run dev
   ```

---

## 🔮 Roadmap & Future Scope
- [ ] Add Alembic DB migration paths for user management and chat history persistence.
- [ ] Integrate React Query on the frontend for streaming state updates.
- [ ] Write benchmarking scripts under `experiments/` to capture tokens per second for local models.
- [ ] Dockerize both services inside `docker-compose.yml` for unified distribution.
