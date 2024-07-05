from pydantic import BaseModel
from datetime import datetime
from bson import ObjectId

class Connection(BaseModel):
  panelId: str
  expires: datetime
