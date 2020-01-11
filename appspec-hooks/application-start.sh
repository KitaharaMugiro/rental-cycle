#!/bin/bash
cd /var/app/current
source /home/ec2-user/.nvm/nvm.sh

npm install
cd ./client-app 
npm install
cd ./server 
npm install
cd ./system-app 
npm install

$(npm bin)/forever start -c "npm run start-dev:server" ./server &
$(npm bin)/forever start -c "npm run start-dev:system" ./system-app &
$(npm bin)/forever start -c "npm run start-dev:client" ./client-app 
