from fastapi import APIRouter, WebSocket
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel

from db import panels_collection

router = APIRouter(prefix="/connections")

class ConnectionData(BaseModel):
  userId: str
  panelId: str

ws_panels = {}
panels_ips = []

@router.websocket('/ws')
async def connection_websocket(websocket: WebSocket):
  await websocket.accept()
  panels = panels_collection.find({})
  panels = await panels.to_list(await panels_collection.count_documents({}))

  for panel in panels:
    panels_ips.append(panel["ip"])

  if websocket.client.host in panels_ips:
    # panel connection type
    ws_panels[str(panel["_id"])] = { "ip": panel["ip"], "ws": websocket}
  else:
    # client connection type
    while True:
        data = await websocket.receive_text()
        data: ConnectionData = jsonable_encoder(data)

        if data["type"] == "connect":
          await ws_panels[data["panelId"]]["ws"].send_text({"userId": data["userId"]})
