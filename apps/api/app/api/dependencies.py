from fastapi import Depends
from fastapi import HTTPException
from fastapi.security import HTTPAuthorizationCredentials
from fastapi.security import HTTPBearer

from sqlalchemy.orm import Session

from app.core.security import verify_access_token
from app.models.user import User
from app.db.dependencies import get_db
from app.core.security import verify_access_token

security = HTTPBearer()

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security), db:Session = Depends(get_db)):
  token = credentials.credentials

  payload = verify_access_token(token)
  if not payload :
    raise HTTPException(
      status_code=401,
      detail="Invalid token"
    )
  
  user_id = payload.get("sub")
  if user_id is None:
    raise HTTPException(
      status_code=401,
      detail="Invalid token"
    )

  user = (
    db.query(User)
    .filter(User.id == int(user_id))
    .first()
  )

  if user is None:
    raise HTTPException(
      status_code=401,
      detail="User not found",
  )

  return user