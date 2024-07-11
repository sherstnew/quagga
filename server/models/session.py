from pydantic import BaseModel
from datetime import datetime

class Session(BaseModel):
  userId: str
  token: str
  expires: datetime