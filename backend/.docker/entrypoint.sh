#!/bin/bash
cd /home/node/app/
echo RODANDO INSTALL
npm install sequelize-cli -g

npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
npm start