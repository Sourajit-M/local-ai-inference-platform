from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.db.dependencies import get_db
from app.api.dependencies import get_current_user

from app.schemas.user import (
  UserCreate,
  UserLogin,
  TokenResponse,
)

from app.services.auth_service import AuthService

router = APIRouter()

@router.post("/register")
def register( 
  request: UserCreate, 
  db: Session = Depends(get_db)
):

  user = AuthService.register(
    db,
    request.email,
    request.password,
  )

  if not user:
    raise HTTPException(
      status_code=400,
      detail="Email already exists",
    )
  
  return {
    "message" : "User created successfully"
  }


@router.post("/login", response_model=TokenResponse)
def login(
  request: UserLogin,
  db: Session = Depends(get_db)
):
  token = AuthService.login(
    db,
    request.email,
    request.password,
  )

  if not token:
    raise HTTPException(
      status_code=401,
      detail="Invalid credentials",
    )
  
  return TokenResponse(
    access_token=token,
    token_type="bearer"
  )

@router.get("/me")
def me(current_user=Depends(get_current_user)):
  return current_user