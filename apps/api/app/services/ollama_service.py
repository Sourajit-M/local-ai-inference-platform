import ollama 
from app.core.constants import MODEL_NAME

class OllamaService:
  @staticmethod
  def chat(
    message: str,
    temperature: float = 0.0,
  ) -> str:
    response = ollama.chat(
      model = MODEL_NAME,
      messages = [
        {
          "role" : "user",
          "content": message, 
        }
      ],
      options={
        "temperature": temperature,
      },
    )

    return response["message"]["content"]
  
  @staticmethod
  def stream_chat(message: str):
    stream = ollama.chat(
      model = MODEL_NAME,
      messages = [
        {
          "role" : "user",
          "content": message, 
        }
      ],
      stream=True
    )

    for chunk in stream:
      content = chunk["message"]["content"]

      if content:
        yield content