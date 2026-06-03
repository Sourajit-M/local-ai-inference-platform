from fastapi import APIRouter, Depends, HTTPException

from sqlalchemy.orm import Session

from app.api.dependencies import get_current_user
from app.db.dependencies import get_db

from app.schemas.chat_session import (
  SessionCreate,
  SessionResponse,
)

from app.schemas.message import (
  MessageCreate,
)

from app.services.chat_service import ChatService
from app.services.ollama_service import OllamaService

router = APIRouter()

@router.post(
  "/sessions",
  response_model=SessionResponse,
)
def create_session(
  req: SessionCreate,
  db: Session = Depends(get_db),
  current_user=Depends(get_current_user),
):
  return ChatService.create_session(
    db,
    req.title,
    current_user.id,
  )


@router.get("/sessions/{session_id}")
def get_session_messages(
  session_id: int,
  db: Session = Depends(get_db),
  current_user=Depends(get_current_user),
):
  session = ChatService.get_session(
    db,
    session_id,
  )

  if session is None:
    raise HTTPException(
      status_code=404,
      detail="Session not found",
    )

  if session.user_id != current_user.id:
    raise HTTPException(
      status_code=403,
      detail="Access denied",
    )

  return ChatService.get_session_messages(
    db,
    session_id,
  )

@router.post("/{session_id}")
def chat(
  session_id: int,
  request: MessageCreate,
  db: Session = Depends(get_db),
  current_user=Depends(get_current_user),
):
  session = ChatService.get_session(
    db,
    session_id,
  )

  if session is None:
    raise HTTPException(
      status_code=404,
      detail="Session not found",
    )

  if session.user_id != current_user.id:
    raise HTTPException(
      status_code=403,
      detail="Access denied",
    )

  ChatService.create_message(
    db,
    session_id,
    "user",
    request.content,
  )

  response = OllamaService.chat(
    request.content
  )

  ChatService.create_message(
    db,
    session_id,
    "assistant",
    response,
  )

  return {
    "response": response
  }

