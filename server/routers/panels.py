from fastapi import APIRouter, Path, Response, status
from bson import ObjectId

from models.panel import Panel
from db import panels_collection

router = APIRouter(prefix="/panels")

@router.get('/{id}')
async def get_panel(id: str = Path(..., regex=r"^[0-9a-f]{24}$")) -> Panel:
  panel = await panels_collection.find_one({"_id": ObjectId(id)})
  return panel if panel else Response(status_code=status.HTTP_404_NOT_FOUND)