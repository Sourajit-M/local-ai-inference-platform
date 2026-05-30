from fastapi import APIRouter
from fastapi.responses import StreamingResponse

from app.schemas.chat import ChatRequest, ChatResponse
from app.services.ollama_service import OllamaService

router = APIRouter()

@router.post("/chat", response_model=ChatResponse)
def chat(request : ChatRequest):
  response = OllamaService.chat(request.message)

  return ChatResponse(response=response)

@router.post("/chat/stream")
def stream_chat(request: ChatRequest):
  return StreamingResponse(
    OllamaService.stream_chat(request.message),
    media_type="text/plain"
  )