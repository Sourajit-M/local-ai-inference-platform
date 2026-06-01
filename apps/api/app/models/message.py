from datetime import datetime, timezone

from sqlalchemy import DateTime
from sqlalchemy import ForeignKey
from sqlalchemy import String
from sqlalchemy import Text

from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship

from app.db.database import Base

class Message(Base):
  __tablename__ = "messages"

  id: Mapped[int] = mapped_column(
    primary_key=True,
    index=True
  )

  session_id : Mapped[int] = mapped_column(
    ForeignKey("chat_sessions.id"),
  )

  role: Mapped[str] = mapped_column(
    String,
    nullable=False,
  )

  content: Mapped[str] = mapped_column(
    Text, 
    nullable=False
  )

  created_at : Mapped[datetime] = mapped_column(
    DateTime,
    default= lambda: datetime.now(timezone.utc)
  )

  session = relationship(
    "ChatSession",
    back_populates="messages",
  )