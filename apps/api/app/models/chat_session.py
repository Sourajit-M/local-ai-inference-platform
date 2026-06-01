from datetime import datetime, timezone

from sqlalchemy import DateTime
from sqlalchemy import ForeignKey
from sqlalchemy import String

from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship

from app.db.database import Base

class ChatSession(Base):
  __tablename__ = "chat_sessions"

  id: Mapped[int] = mapped_column(
    primary_key=True,
    index=True
  )

  title: Mapped[str] = mapped_column(
    String,
    nullable=False
  )

  user_id : Mapped[int] = mapped_column(
    ForeignKey("users.id"),
  )

  created_at : Mapped[datetime] = mapped_column(
    DateTime,
    default= lambda: datetime.now(timezone.utc)
  )

  messages = relationship(
    "Message",
    back_populates="session",
    cascade="all, delete-orphan"
  )