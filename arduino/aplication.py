#!/usr/bin/python3
from mongo import conectionMongo
import time
import string
import serial
import json
import re

comport = serial.Serial('/dev/ttyACM0', 115200, timeout=5)

db = conectionMongo()
# Time entre a conexao serial e o tempo para escrever (enviar algo)
time.sleep(2) # Entre 1.5s a 2s
volumeant = 100

count = db.ultimateId()
while True:
    try:
        VALUE_SERIAL = comport.readline().decode("utf-8")
        if(('{' in VALUE_SERIAL) and ('alarm' in VALUE_SERIAL) and ('pressao' in VALUE_SERIAL) and ('angulo' in VALUE_SERIAL) and ('}' in VALUE_SERIAL)):
            count = count + 1
            js = VALUE_SERIAL.rstrip('\n')
            js = js.rstrip('\r')
            data = json.loads(js)
            #if(data["angulo"] > 100):
            volume =  ((data["angulo"]*-0.392)+1417)
            if(volume < 0):
                volume = 0
            fluxo = volume - volumeant
            db.insertTo(count, str("{0:.1f}".format(round(data["pressao"], 1))), str("{0:.1f}".format(round(fluxo, 1))), str("{0:.1f}".format(round(volume,1))), str(data["alarm"]))
            volumeant = volume
    except:
        db.insertTo(count,str("null"),str("null"),str("null"), str(8))
        pass

comport.close()
