FROM node:12.13-alpine

RUN apk add --no-cache bash

RUN npm config set cache /home/node/app/.npm-cache --global

WORKDIR /home/node/app

COPY . .

RUN npm i