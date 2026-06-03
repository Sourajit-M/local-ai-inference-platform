from datetime import datetime, timezone

from sqlalchemy import DateTime, Float, ForeignKey, Integer, String

from sqlalchemy.orm import Mapped, mapped_column

from app.db.database import Base

class Experiment(Base):
  __tablename__ = "experiments"

  id: Mapped[int] = mapped_column(
    primary_key=True,
    index=True,
  )

  user_id: Mapped[int] = mapped_column(
    ForeignKey("users.id")
  )

  model_name: Mapped[str] = mapped_column(String)

  prompt_length: Mapped[int] = mapped_column(Integer)

  response_length: Mapped[int] = mapped_column(Integer)

  latency_seconds: Mapped[float] = mapped_column(Float)

  created_at: Mapped[datetime] = mapped_column(
    DateTime,
    default=datetime.now(timezone.utc),
  )