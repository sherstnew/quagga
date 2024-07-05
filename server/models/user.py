from pydantic import BaseModel
from typing import List
from models.connection import Connection
from models.session import Session

class User(BaseModel):
  name: str
  connections: List[str]
  sessions: List[str]
  email: str
  isConfirmed: bool
  passwordHash: str