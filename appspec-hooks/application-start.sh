#!/bin/bash
cd /var/app/current
source /home/ec2-user/.nvm/nvm.sh

npm install
cd ./client-app & npm install
cd ./server & npm install
cd ./system-app & npm install

LOG_DIR="./logs"
$(npm bin)/forever start -c "npm run start-dev:server" ./ &
$(npm bin)/forever start -c "npm run start-dev:system" ./
