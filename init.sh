#!/bin/sh

cd /home/pi/Desktop/air/dashboard/
midori -e fullscreen --private index.html &

cd ../arduino
python aplication.py &

cd ../api
node server.js &

read
