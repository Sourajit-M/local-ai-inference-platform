import ollama 

class OllamaService:
  @staticmethod
  def chat(message: str) -> str:
    response = ollama.chat(
      model = "qwen2.5:3b",
      messages = [
        {
          "role" : "user",
          "content": message, 
        }
      ],
    )

    return response["message"]["content"]