from datetime import datetime
from datetime import timedelta
from datetime import timezone

import bcrypt

from jose import jwt, JWTError

from app.config.settings import settings

def hash_password(password: str) -> str:
    pwd_bytes = password.encode('utf-8')
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(pwd_bytes, salt)
    return hashed.decode('utf-8')

def verify_password(plain_password: str, hashed_password: str) -> bool:
    pwd_bytes = plain_password.encode('utf-8')
    hashed_bytes = hashed_password.encode('utf-8')
    return bcrypt.checkpw(pwd_bytes, hashed_bytes)

def create_access_token(data: dict):
  payload = data.copy()

  expire = datetime.now(timezone.utc) + timedelta(
    minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
  )

  payload["exp"] = expire

  return jwt.encode(
    payload,
    settings.JWT_SECRET_KEY,
    algorithm=settings.JWT_ALGORITHM,
  )

def verify_access_token(token: str):
  try:
    payload = jwt.decode(
      token,
      settings.JWT_SECRET_KEY,
      algorithms=[settings.JWT_ALGORITHM]
    )
    
    return payload
  
  except JWTError:
    return None
