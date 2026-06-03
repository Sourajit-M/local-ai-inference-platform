from sqlalchemy.orm import Session

from app.models.chat_session import ChatSession
from app.models.message import Message

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
  
  @staticmethod
  def create_message(
    db,
    session_id: int,
    role: str,
    content: str
  ):
    message = Message(
      session_id = session_id,
      role = role,
      content = content
    )

    db.add(message)
    db.commit()
    db.refresh(message)

    return message
  

  @staticmethod
  def get_session_messages(db, session_id: int):
    return (
      db.query(Message)
      .filter(
          Message.session_id == session_id
      )
      .all()
    )
  
  @staticmethod
  def get_session(
    db: Session,
    session_id: int,
  ):
    return (
      db.query(ChatSession)
      .filter(ChatSession.id == session_id)
      .first()
    )