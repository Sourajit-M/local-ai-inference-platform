from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from app.api.dependencies import get_current_user, get_db

from app.schemas.chat_session import ( SessionCreate, SessionResponse )

from app.services.chat_service import ChatService

router = APIRouter()

@router.post("/sessions", response_model=SessionResponse)
def create_session(req: SessionCreate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
  return ChatService.create_session(
    db,
    req.title,
    current_user.id
  )