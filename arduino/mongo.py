from pymongo import MongoClient
from datetime import datetime 

class conectionMongo(object):
    __client = MongoClient('mongodb://localhost:27017/')
    __db = __client.air
    __collection = __db.dados

    def insertTo(self, id, pressure, flow, volume, alarm):
        dado = {
            "_id": id,
            "pressure": pressure,
            "flow": flow,
            "volume": volume,
            "alarm": alarm,
            "insertAt": datetime.now()
        }
        try:
            self.__collection.insert(dado)
        except:
            return False
        return True


    def getNumberOfElement(self):
        res = 0
        try:
            res = self.__collection.count()
        except:
            return False
        return res

    def ultimateId(self):
        res = 0
        try:
            res = self.__collection.find_one({}, sort=[('_id', -1)])["_id"]
        except:
            return False
        if(res == None or res == False):
            res = 0
        return res

    def dropElement(self, ultimateId):
        limit = 200000
        dropId = ultimateId - limit
        myQuery = {"_id":dropId}
        try:
            self.__collection.remove(myQuery)
        except:
            return False
        return True
