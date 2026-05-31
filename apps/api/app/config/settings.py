from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict


BASE_DIR = Path(__file__).resolve().parent.parent.parent


class Settings(BaseSettings):
  APP_NAME: str = "Local AI Inference Platform"
  MODEL_NAME: str = "qwen2.5:3b"
  OLLAMA_HOST: str = "http://localhost:11434"

  JWT_SECRET_KEY: str = "change_me_later"
  JWT_ALGORITHM: str = "HS256"

  ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
  DATABASE_URL : str = "sqlite:///./local_ai.db"

  model_config = SettingsConfigDict(
    env_file=BASE_DIR / ".env",
    env_file_encoding="utf-8",
    extra="ignore"
  )


settings: Settings = Settings()