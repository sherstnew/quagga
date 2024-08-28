from pydantic import BaseModel
from bson import ObjectId

class File(BaseModel):
  filename: str
  path: str
  originalName: str
  extension: str
  size: int