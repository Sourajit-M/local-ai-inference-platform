from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.db.database import Base, engine

from app.api.routes.auth import router as auth_router

import app.models.user
import app.models.chat_session
import app.models.message
import app.models.experiment

from app.api.routes.session import router as session_router
from app.api.routes.experiments import router as experiment_router
from app.api.routes.structured import (
  router as structured_router
)

import ollama
from app.config.settings import settings

Base.metadata.create_all(bind=engine)

app = FastAPI(
  title="Local AI Inference Platform",
  version="0.1.0",
)

app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

app.include_router(
  auth_router,
  prefix="/api/auth",
  tags=["auth"],
)

app.include_router(
  session_router,
  prefix="/api/chat",
  tags=["chat"],
)

app.include_router(
  experiment_router,
  prefix="/api",
  tags=["experiments"]
)

app.include_router(
  structured_router,
  prefix="/api",
  tags=["structured"],
)

@app.get("/health")
def health():
  try:
    models = ollama.list()

    return {
      "status" : "healthy",
      "model": settings.MODEL_NAME,
      "ollama": "connected",
      "models": models,
    }
  
  except Exception as e:
    return{
      "status" : "unhealthy",
      "error": str(e)
    }