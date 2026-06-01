from sqlalchemy.orm import Session

from app.models.chat_session import ChatSession

class ChatService:
  @staticmethod
  def create_session(db:Session, title:str, user_id:int):
    session = ChatSession(
      title=title,
      user_id = user_id
    )

    db.add(session)
    db.commit()
    db.refresh(session)

    return session