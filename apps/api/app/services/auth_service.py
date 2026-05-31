from sqlalchemy.orm import Session

from app.core.security import ( hash_password, verify_password, create_access_token )

from app.models.user import User

class AuthService:
  @staticmethod
  def register(db: Session, email: str, password: str):
    existing_user = (
                    db.query(User)
                    .filter(User.email == email)
                    .first()
                  )
    if existing_user:
      return None
    
    user = User(
      email=email,
      hashed_password = hash_password(password)
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user
  
  @staticmethod
  def login(db: Session, email: str, password: str):
    user = (
      db.query(User)
      .filter(User.email == email)
      .first()
    )

    if not user:
      return None
    
    if not verify_password(
      password, user.hashed_password,
    ):
      return None
    
    token = create_access_token({
      "sub" : str(user.id),
      "email": user.email,
    })

    return token