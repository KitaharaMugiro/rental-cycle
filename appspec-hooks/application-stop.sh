#!/bin/bash
cd /var/app/current
source /home/ec2-user/.nvm/nvm.sh

npm install forever
$(npm bin)/forever stopall
kill $(lsof -t -i:8080) || echo "no running on 8080"
kill $(lsof -t -i:8082) || echo "no running on 8080"
kill $(lsof -t -i:8999) || echo "no running on 8080"