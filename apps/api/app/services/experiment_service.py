from app.models.experiment import Experiment
from sqlalchemy.orm import Session

class ExperimentService:
  @staticmethod
  def create_experiment(
    db: Session,
    user_id: int,
    model_name: str,
    prompt_length: int,
    response_length: int,
    latency_seconds: float,
    temperature: float,
  ):
    experiment = Experiment(
      user_id=user_id,
      model_name=model_name,
      prompt_length=prompt_length,
      response_length=response_length,
      latency_seconds=latency_seconds,
      temperature=temperature,
      validation_sucess=True,
      retry_count=0,
    )

    db.add(experiment)
    db.commit()

    return experiment