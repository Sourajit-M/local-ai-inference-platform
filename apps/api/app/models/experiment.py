from datetime import datetime, timezone

from sqlalchemy import DateTime, Float, ForeignKey, Integer, String, Boolean

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

  temperature: Mapped[float] = mapped_column(Float)

  validation_success: Mapped[bool] = mapped_column(
    Boolean,
    default=True,
  )

  retry_count: Mapped[int] = mapped_column(
    Integer,
    default=0,
  )

  created_at: Mapped[datetime] = mapped_column(
    DateTime,
    default=lambda: datetime.now(timezone.utc),
  )