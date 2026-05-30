from fastapi import APIRouter

from app.schemas.chat import ChatRequest, ChatResponse
from app.services.ollama_service import OllamaService

router = APIRouter()

@router.post("/chat", response_model=ChatResponse)
def chat(request : ChatRequest):
  response = OllamaService.chat(request.message)

  return ChatResponse(response=response)