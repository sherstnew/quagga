from pydantic import BaseModel
from typing import Generic, TypeVar, Dict

DataT = TypeVar('DataT')

class ResponseWithData(BaseModel, Generic[DataT]):
  status: str
  data: DataT