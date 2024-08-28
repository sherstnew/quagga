import json
from fastapi import APIRouter, WebSocket, Response, status
from bson import ObjectId
from pydantic import BaseModel

from db import users_collection
from utils.prepare_user import prepare_user
from models.user import User

router = APIRouter(prefix="/connections")

ws_panels = {}

class CardAuth(BaseModel):
  cardId: str
  panelId: str

@router.post('/card')
async def authorize_by_card(card_auth: CardAuth) -> User:
  if card_auth.panelId in ws_panels:
    user = await users_collection.find_one({"cardId": card_auth.cardId})
    print(user)
    print(card_auth.cardId)
    print(len(card_auth.cardId))
    if user:
      return user
    else:
      return Response(status_code=status.HTTP_404_NOT_FOUND, content="User not found")
  else:
    return Response(status_code=status.HTTP_404_NOT_FOUND, content="Panel not found")

@router.websocket('/connect')
async def ws_connect(websocket: WebSocket):
  try:
    await websocket.accept()
    while True:
      data = await websocket.receive_text()
      if data:
        data = json.loads(data)
        if data["panelId"] in ws_panels:
          user = await users_collection.find_one({"_id": ObjectId(data["userId"])})
          await ws_panels[data["panelId"]].send_text(json.dumps(prepare_user(user)))
          await websocket.send_text("User connected");
  except Exception as e:
    print(e)

@router.websocket('/add')
async def ws_panel_add(websocket: WebSocket):
  try:
    await websocket.accept()
    while True:
      data = await websocket.receive_text()
      if data:
        data = json.loads(data)
        print('Connected new panel: ', data["panelId"])
        ws_panels[data["panelId"]] = websocket
        await websocket.send_text("Panel connected")
  except Exception as e:
    print(e)