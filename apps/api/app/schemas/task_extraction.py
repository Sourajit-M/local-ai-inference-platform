from pydantic import BaseModel

class Task(BaseModel):
  title: str
  deadline: str

class TaskExtractionRequest(BaseModel):
  text: str

class TaskExtractionResponse(BaseModel):
  tasks: list[Task]