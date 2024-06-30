from fastapi import FastAPI, Depends, Response, status, Form, File, Header
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from bson import ObjectId

from typing import Annotated

import secrets

import uvicorn
import json

from utils.MongoConnector import MongoConnector

app = FastAPI()

origins = ['*']
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

app.mount('/static', StaticFiles(directory="static"), name="static")

async def checkPanelToken(token: str) -> bool:
    with MongoConnector() as mongo:
        filter = {'token': token}
        panel = await mongo.read_one('panelTokens', filter)
        if not panel:
            return False
        return True

@app.post('/api/tokens/panel/invoke')
async def authorizePanel(panelid: Annotated[str, Form()], panelsec: Annotated[str, Form()], response: Response):
    with MongoConnector() as mongo:
        filter = {'_id': ObjectId(panelid), 'secret': panelsec}
        panel = await mongo.read_one('panels', filter)
        if panel:
            ntoken = secrets.token_hex(16)
            data = {
                'panelId': panelid,
                'token': ntoken
            }

            await mongo.insert_one('panelTokens', data)

            return data

        response.status_code = status.HTTP_403_FORBIDDEN
        return {'error': 'unknown panel authorization data'}

@app.post('/api/tokens/userConnect/invoke')
async def invokeUserConnectionString(authorization: Annotated[str | None, Header()], response: Response):
    with MongoConnector() as mongo:
        filter = {'token': authorization}
        panelToken = await mongo.read_one('panelTokens', filter)
        if not panelToken:
            response.status_code = status.HTTP_403_FORBIDDEN
            return {'error': 'invalid authorization string'}

        pairtoken = secrets.token_hex(32)
        data = {'panelid': panelToken['panelid'], 'pair_token': pairtoken}
        await mongo.insert_one('pairingTokens', data)
    return {'panelid': panelToken['panelid'], 'pair_token': pairtoken}

@app.post('/api/tokens/userConnect/connect')
async def connectUserBot(tgid: Annotated[str, Form()], pairtoken: Annotated[str, Form()], response: Response):
    with MongoConnector() as mongo:
        filter = {'tgid': int(tgid)}
        user = await mongo.read_one('users', filter)
        if not user:
            response.status_code = status.HTTP_403_FORBIDDEN
            return {'error': 'invalid authrorization string'}

        filter = {'pair_token': pairtoken}
        pairToken = await mongo.read_one('pairingTokens', filter)
        if not pairToken:
            response.status_code = status.HTTP_404_NOT_FOUND
            return {'error': 'pairtoken was not found'}

        filter = {'_id': ObjectId(pairToken['panelid'])}
        data = {'connected_user': user['id']}
        update = {'$set': data}
        await mongo.update_one('panels', filter, update)

        return {'info': 'connected to panel'}

@app.get('/api/panel/checkConnected')
async def checkIfConnected(authorization: Annotated[str | None, Header()], response: Response):
    with MongoConnector() as mongo:
        filter = {'token': authorization}
        panelToken = await mongo.read_one('panelTokens', filter)
        if not panelToken:
            response.status_code = status.HTTP_403_FORBIDDEN
            return {'error': 'invalid authorization string'}

        filter = {'_id': ObjectId(panelToken['panelid'])}
        panel = await mongo.read_one('panels', filter)
        if not panel:
            response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
            return {'error': 'panel is removed'}

        return {'connected': True if panel['connected_user'] != 0 else False}

@app.get('/api/panel/files/fetch')
async def fetchUserFilesList(authorization: Annotated[str | None, Header()], response: Response):
    with MongoConnector() as mongo:
        filter = {'token': authorization}
        panelToken = await mongo.read_one('panelTokens', filter)
        if not panelToken:
            response.status_code = status.HTTP_403_FORBIDDEN
            return {'error': 'invalid authorization string'}

        filter = {'_id': ObjectId(panelToken['panelid'])}
        panel = await mongo.read_one('panels', filter)
        if not panel:
            response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
            return {'error': 'panel is removed'}

        if panel['connected_user'] == 0:
            response.status_code = status.HTTP_400_BAD_REQUEST
            return {'error': 'no connected user'}

        filter = {'ownerid': panel['connected_user']}
        files = await mongo.read_many('files', filter)
        return files

@app.post('/uploadFile')
async def uploadFile(file: Annotated[bytes, File()], tgid: Annotated[str, Form()], name: Annotated[str, Form()], extension: Annotated[str, Form()], response: Response):
    with MongoConnector() as mongo:
        filter = {'tgid': int(tgid)}
        user = await mongo.read_one('users', filter)
        if not user:
            response.status_code = status.HTTP_403_FORBIDDEN
            return {'error': 'invalid authrorization string'}

        filename = secrets.token_hex(32)
        with open(f'static/{filename}.{extension}', 'wb') as f:
            f.write(file)

        data = {
            'downloadpath': f'static/{filename}.{extension}',
            'ownerid': user['id'],
            'displayName': name,
            'extension': extension
        }

        await mongo.insert_one('files', data)
        return {'status': 'done'}

@app.post('/api/panel/closeConnection')
async def closePanelConnection(authorization: Annotated[str | None, Header()], response: Response):
    with MongoConnector() as mongo:
        filter = {'token': authorization}
        panelToken = await mongo.read_one('panelTokens', filter)
        if not panelToken:
            response.status_code = status.HTTP_403_FORBIDDEN
            return {'error': 'invalid authorization string'}

        filter = {'_id': ObjectId(panelToken['panelid'])}
        data = {'connected_user': 0}
        update = {'$set': data}
        await mongo.update_one('panels', filter, update)

        return {'status': 'done'}

@app.post('/api/user/filesList')
async def listUserFiles(tgid: Annotated[str, Form()], response: Response):
    with MongoConnector() as mongo:
        filter = {'tgid': int(tgid)}
        user = await mongo.read_one('users', filter)
        if not user:
            response.status_code = status.HTTP_403_FORBIDDEN
            return {'error': 'invalid authrorization string'}

        filter = {'ownerid': user['id']}
        files = await mongo.read_many('files', filter)
        return files

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=45219)