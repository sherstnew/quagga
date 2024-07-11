from pydantic import BaseModel

class Panel(BaseModel):
  room: str
  school: str
  ip: str