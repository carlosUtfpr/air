#!/bin/sh

cd /home/pi/Desktop/air/dashboard/
chromium-browser --incognito --kiosk index.html &

cd ../arduino
python aplication.py &

cd ../api
node server.js &

read
