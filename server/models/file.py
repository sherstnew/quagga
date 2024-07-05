from pydantic import BaseModel

class File(BaseModel):
  path: str
  originalName: str
  extension: str
  size: int