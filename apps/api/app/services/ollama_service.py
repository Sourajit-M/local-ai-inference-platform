import ollama 
import time
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

  @staticmethod
  def benchmark_chat(
    message: str,
    temperature: float = 0.0
  ):
    start_time = time.perf_counter()

    stream = ollama.chat(
      model=MODEL_NAME,
      messages=[
        {
          "role": "user",
          "content": message
        }
      ],
      stream=True,
      options={
        "temperature": temperature,
      },
    )

    #measure TTFT
    first_chunk = True
    ttft = None
    response_parts = []

    for chunk in stream:
      if first_chunk:
        ttft = (
          time.perf_counter() - start_time
        )
        first_chunk = False

      content = chunk["message"]["content"]

      if content:
        response_parts.append(content)

    latency = (
      time.perf_counter() - start_time
    )

    response = "".join(
      response_parts
    )

    #approximate token count
    estimated_token_count = len(
      response.split()
    )

    tokens_per_second = (
      estimated_token_count / latency
      if latency > 0
      else 0
    )

    if ttft is None:
      ttft = latency

    return {
      "response": response,
      "ttft": ttft,
      "latency": latency,
      "estimated_tokens": estimated_token_count,
      "tokens_per_second": tokens_per_second,
    }
  
  