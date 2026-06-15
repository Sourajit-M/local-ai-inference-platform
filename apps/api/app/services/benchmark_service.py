import json
import ollama
from collections import defaultdict
from fastapi import HTTPException
from pathlib import Path

from sqlalchemy.orm import Session

from app.config.settings import settings

from app.models.benchmark_run import BenchmarkRun

from app.services.ollama_service import ( OllamaService, )

class BenchmarkService:
  @staticmethod
  def run_benchmark(
    db: Session,
    user_id: int,
    models: list[str],
    temperature: float  = 0.0,
    warmup: bool = True
  ):
    try:
        res = ollama.list()
        models_list = res.get("models", []) if isinstance(res, dict) else getattr(res, "models", [])
        available_models = []
        for m in models_list:
            if isinstance(m, dict):
                val = m.get("model") or m.get("name")
            else:
                val = getattr(m, "model", None) or getattr(m, "name", None)
            if val:
                available_models.append(val)
    except Exception:
        available_models = []
        
    for model in models:
      if model not in available_models:
        raise HTTPException(status_code=400, detail=f"Model {model} not installed")

    dataset_path = (
      Path(__file__).parent.parent
      / "benchmarks"
      / "datasets"
      / "default.json"
    )

    with open(
      dataset_path,
      "r",
      encoding="utf-8",
    ) as f:
      prompts = json.load(f)

    all_results = {}

    for model in models:
        benchmark_results = []
        if warmup:
          OllamaService.warmup_model(model)

        for item in prompts:
            result = (
                OllamaService.benchmark_chat(
                    model=model,
                    message=item["prompt"],
                    temperature=temperature,
                )
            )

            benchmark_run = BenchmarkRun(
                user_id=user_id,
                model_name=model,
                prompt_name=item["name"],
                prompt_category=item["category"],
                prompt_difficulty=item.get("difficulty", "unknown"),
                prompt_length=len(item["prompt"]),
                response_length=len(result["response"]),
                temperature=temperature,
                ttft_seconds=result["ttft"],
                latency_seconds=result["latency"],
                tokens_per_second=result[
                    "tokens_per_second"
                ],
            )

            db.add(benchmark_run)

            benchmark_results.append(
                {
                    "prompt_name": item["name"],
                    "category": item["category"],
                    "ttft_seconds": result["ttft"],
                    "latency_seconds": result["latency"],
                    "tokens_per_second": result[
                        "tokens_per_second"
                    ],
                }
            )

        db.commit()

        total_runs = len(benchmark_results)
        if total_runs > 0:
            avg_ttft = sum(r["ttft_seconds"] for r in benchmark_results) / total_runs
            avg_latency = sum(r["latency_seconds"] for r in benchmark_results) / total_runs
            avg_tps = sum(r["tokens_per_second"] for r in benchmark_results) / total_runs

            all_results[model] = {
                "average_ttft": round(avg_ttft, 4),
                "average_latency": round(avg_latency, 4),
                "average_tokens_per_second": round(avg_tps, 2),
                "prompts_tested": total_runs,
                "temperature": temperature,
                "warmup": warmup,
            }
        else:
            all_results[model] = {
                "average_ttft": 0.0,
                "average_latency": 0.0,
                "average_tokens_per_second": 0.0,
                "prompts_tested": 0
            }

    return all_results
  

  @staticmethod
  def get_summary(
    db : Session,
    user_id: int,
  ):
    runs = (
      db.query(BenchmarkRun)
      .filter(
        BenchmarkRun.user_id == user_id
      )
      .all()
    )

    if not runs:
      return {
        "message" : "No benchmark runs found"
      }
    
    grouped = defaultdict(list)
    for r in runs:
        grouped[r.model_name].append(r)
        
    summary = {}
    for model, model_runs in grouped.items():
        total_runs = len(model_runs)
        avg_ttft = sum(r.ttft_seconds for r in model_runs) / total_runs
        avg_latency = sum(r.latency_seconds for r in model_runs) / total_runs
        avg_tps = sum(r.tokens_per_second for r in model_runs) / total_runs
        
        summary[model] = {
            "average_ttft": round(avg_ttft, 4),
            "average_latency": round(avg_latency, 4),
            "average_tokens_per_second": round(avg_tps, 2),
            "prompts_tested": total_runs
        }

    return summary
  
  @staticmethod
  def get_runs(
    db: Session,
    user_id: int,
  ):
    runs = (
      db.query(BenchmarkRun)
      .filter(
        BenchmarkRun.user_id == user_id
      )
      .order_by(
        BenchmarkRun.created_at.desc()
      )
      .all()
    )

    return runs