from fastapi import APIRouter

from app.schemas.task_extraction import (
  TaskExtractionRequest,
)

from app.services.structured_generation_service import (
  StructuredGenerationService,
)

router = APIRouter()

@router.post("/extract-tasks")
def extract_tasks(
  request: TaskExtractionRequest,
):
  return (
    StructuredGenerationService
    .extract_tasks(
      request.text
    )
  )

