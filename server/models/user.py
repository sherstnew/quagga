from pydantic import BaseModel
from typing import List
from models.session import Session
from models.file import File

class User(BaseModel):
  _id: str
  name: str
  sessions: List[Session]
  files: List[File]
  isConfirmed: bool
  email: str
  password: str
  cardId: str