from pydantic import BaseModel
from models.connection import Connection

class Panel(BaseModel):
  room: str
  school: str
  connection: Connection