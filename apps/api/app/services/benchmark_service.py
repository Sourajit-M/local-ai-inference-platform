import json
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
    temperature: float  = 0.0
  ):
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

    benchmark_results = []

    for item in prompts:
      result = (
        OllamaService.benchmark_chat(
          message=item["prompt"],
          temperature=temperature,
        )
      )

      benchmark_run = BenchmarkRun(
        user_id=user_id,
        model_name=settings.MODEL_NAME,
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
    avg_ttft = (
      sum(
        r["ttft_seconds"]
        for r in benchmark_results
      )
      / total_runs
    )

    avg_latency = (
      sum(
        r["latency_seconds"]
        for r in benchmark_results
      )
      / total_runs
    )

    avg_tps = (
      sum(
        r["tokens_per_second"]
        for r in benchmark_results
      )
      / total_runs
    )

    return {
      "model_name" : settings.MODEL_NAME,
      "temperature": temperature,
      "total_prompts": total_runs,
      "average_ttft": round(avg_ttft, 4),
      "average_latency": round(avg_latency, 4),
      "average_tokens_per_second": round(avg_tps, 2),
      "runs": benchmark_results,
    }
  

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
    
    avg_ttft = (
      sum(
        r.ttft_seconds
        for r in runs
      )
      / len(runs)
    )

    avg_latency = (
      sum(
        r.latency_seconds
        for r in runs
      )
      / len(runs)
    )

    avg_tps = (
      sum(
        r.tokens_per_second
        for r in runs
      )
      / len(runs)
    )


    return {
      "model_name": settings.MODEL_NAME,
      "total_runs": len(runs),
      "average_ttft": round(avg_ttft, 4),
      "average_latency": round(avg_latency, 4),
      "average_tokens_per_second": round(avg_tps, 2)
    }
  
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