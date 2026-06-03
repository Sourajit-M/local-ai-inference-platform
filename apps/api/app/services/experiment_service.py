from app.models.experiment import Experiment

class ExperimentService:
  @staticmethod
  def create_experiment(
    db,
    user_id,
    model_name,
    prompt_length,
    response_length,
    latency_seconds,
  ):
    experiment = Experiment(
      user_id=user_id,
      model_name=model_name,
      prompt_length=prompt_length,
      response_length=response_length,
      latency_seconds=latency_seconds,
    )

    db.add(experiment)
    db.commit()

    return experiment