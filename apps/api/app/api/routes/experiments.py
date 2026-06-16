from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.api.dependencies import get_current_user, get_db

from app.models.experiment import Experiment

router = APIRouter()

@router.get("/experiments")
def list_experiments(
  db: Session = Depends(get_db),
  current_user = Depends(get_current_user)
):
  
  return (
    db.query(Experiment)
    .filter(
      Experiment.user_id
      == current_user.id
    )
    .all()
  )

__all__ = ["router", "list_experiments"]