#!/bin/bash
cd /var/app/current
source /home/ec2-user/.nvm/nvm.sh

npm install
cd ./client-app 
npm install
cd ../server 
npm install
cd ../system-app 
npm install
cd ../

kill $(lsof -t -i:80) || echo "no running on 80"
kill $(lsof -t -i:8080) || echo "no running on 8080"
kill $(lsof -t -i:8082) || echo "no running on 8082"
kill $(lsof -t -i:8999) || echo "no running on 8999"

# npm run build:server
npm run build:system
npm run build:client

$(npm bin)/forever start -c "npm run start:server" ./server &
$(npm bin)/forever start -c "npm run start:system" ./system-app &
$(npm bin)/forever start -c "npm run start:client" ./client-app 
