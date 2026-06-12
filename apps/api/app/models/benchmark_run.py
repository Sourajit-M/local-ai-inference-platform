from datetime import datetime

from sqlalchemy import DateTime
from sqlalchemy import Float
from sqlalchemy import ForeignKey
from sqlalchemy import String
from sqlalchemy import Integer

from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

from app.db.database import Base


class BenchmarkRun(Base):
    __tablename__ = "benchmark_runs"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True,
    )

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id")
    )

    model_name: Mapped[str] = mapped_column(
        String
    )

    prompt_name: Mapped[str] = mapped_column(
        String
    )

    prompt_category: Mapped[str] = mapped_column(
        String
    )

    prompt_difficulty: Mapped[str] = mapped_column(
        String,
        nullable=True
    )

    prompt_length: Mapped[int] = mapped_column(
        Integer,
        nullable=True
    )

    response_length: Mapped[int] = mapped_column(
        Integer,
        nullable=True
    )

    temperature: Mapped[float] = mapped_column(
        Float,
        nullable=True
    )

    ttft_seconds: Mapped[float] = mapped_column(
        Float
    )

    latency_seconds: Mapped[float] = mapped_column(
        Float
    )

    tokens_per_second: Mapped[float] = mapped_column(
        Float
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
    )