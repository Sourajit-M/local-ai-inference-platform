from sqlalchemy import String
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship

from app.db.database import Base

class User(Base):
  __tablename__ = "users"

  id: Mapped[int] = mapped_column(
    primary_key=True,
    index=True
  )

  email: Mapped[str] = mapped_column(
    String,
    unique=True,
    index=True,
    nullable=False,
  )

  hashed_password: Mapped[str] = mapped_column(
    String,
    nullable=False,
  )

  chat_sessions = relationship(
    "ChatSession",
    backref="user",
    cascade="all, delete-orphan"
  )