from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.api.dependencies import get_current_user
from app.db.dependencies import get_db

from app.services.benchmark_service import ( BenchmarkService )

router = APIRouter()


@router.post("/benchmarks/run")
def run_benchmark(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return BenchmarkService.run_benchmark(
        db=db,
        user_id=current_user.id,
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