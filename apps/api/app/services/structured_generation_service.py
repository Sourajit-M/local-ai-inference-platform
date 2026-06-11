import json

from pydantic import ValidationError

from app.schemas.task_extraction import (
    TaskExtractionResponse,
)

from app.services.ollama_service import (
    OllamaService,
)


class StructuredGenerationService:
    @staticmethod
    def extract_tasks(text: str):
        prompt = f"""
Extract all tasks from the text below.

Return ONLY valid JSON.

Schema:

{{
  "tasks": [
    {{
      "title": "...",
      "deadline": "..."
    }}
  ]
}}

Text:

{text}
"""

        try:
            response = OllamaService.chat(
                prompt,
                temperature=0.0,
            )

            parsed = json.loads(response)

            validated = (
                TaskExtractionResponse
                .model_validate(parsed)
            )

            return {
                "result": validated.model_dump(),
                "validation_success": True,
                "retry_count": 0,
            }

        except (
            json.JSONDecodeError,
            ValidationError,
        ):
            retry_prompt = f"""
Your previous response was invalid.

Return ONLY valid JSON.

Schema:

{{
  "tasks": [
    {{
      "title": "...",
      "deadline": "..."
    }}
  ]
}}

Rules:
- Return JSON only
- No markdown
- No explanations
- No code fences

Text:

{text}
"""

            try:
                retry_response = OllamaService.chat(
                    retry_prompt,
                    temperature=0.0,
                )

                parsed = json.loads(
                    retry_response
                )

                validated = (
                    TaskExtractionResponse
                    .model_validate(parsed)
                )

                return {
                    "result": validated.model_dump(),
                    "validation_success": True,
                    "retry_count": 1,
                }

            except (
                json.JSONDecodeError,
                ValidationError,
            ):
                return {
                    "result": None,
                    "validation_success": False,
                    "retry_count": 1,
                    "error": "Structured generation failed",
                }