from motor.motor_asyncio import AsyncIOMotorClient

class MongoConnector():
    uri = "mongodb://127.0.0.1:27017"
    db = None

    def __enter__(self):
        self.client = AsyncIOMotorClient(self.uri)
        self.db = self.client['quagga']
        return self

    async def insert_one(self, collection: str, document: dict) -> None:
        await self.db[collection].insert_one(document)

    async def read_one(self, collection: str, filter: dict) -> dict:
        data = await self.db[collection].find_one(filter)
        if not data:
            return None
        print(data)
        data['id'] = str(data.pop('_id'))
        return data

    async def read_many(self, collection: str, filter: dict) -> dict:
        data = await self.db[collection].find(filter).to_list(length=100)
        # replace ObjectId with string
        for i in range(len(data)):
            # data[i]['_id'] = str(data[i]['_id'])
            data[i]['id'] = str(data[i].pop('_id'))
        return data

    async def update_one(self, collection: str, filter: dict, update: dict) -> None:
        await self.db[collection].update_one(filter, update)

    async def delete_one(self, collection: str, filter: dict) -> None:
        await self.db[collection].delete_one(filter)

    def __exit__(self, type, value, traceback):
        pass