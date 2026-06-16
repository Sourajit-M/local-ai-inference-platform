from fastapi import APIRouter
from fastapi import Depends
from pydantic import BaseModel

from sqlalchemy.orm import Session

from app.api.dependencies import get_current_user
from app.db.dependencies import get_db

from app.services.benchmark_service import ( BenchmarkService )

router = APIRouter()


class RunBenchmarkRequest(BaseModel):
    models: list[str]
    temperature: float = 0.0
    warmup: bool = True

@router.post("/benchmarks/compare")
def run_benchmark(
    request: RunBenchmarkRequest,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return BenchmarkService.run_benchmark(
        db=db,
        user_id=current_user.id,
        models=request.models,
        temperature=request.temperature,
        warmup=request.warmup,
    )


@router.get("/benchmarks")
def get_benchmark_summary(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return BenchmarkService.get_summary(
        db=db,
        user_id=current_user.id,
    )


@router.get("/benchmarks/runs")
def get_benchmark_runs(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return BenchmarkService.get_runs(
        db=db,
        user_id=current_user.id,
    )

__all__ = ["router", "run_benchmark", "get_benchmark_summary", "get_benchmark_runs"]