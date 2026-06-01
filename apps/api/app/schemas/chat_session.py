from pydantic import BaseModel

class SessionCreate(BaseModel):
  title: str

class SessionResponse(BaseModel):
  id: int
  title: str

  model_config = {
    "from_attributes": True
  }