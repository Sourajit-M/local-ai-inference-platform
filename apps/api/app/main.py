from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes.chat import router as chat_router

import ollama
from app.config.settings import settings

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

app.include_router(chat_router, prefix="/api")



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