FROM node:12.13-alpine as build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./ .

RUN npm run build

FROM nginx:1.15.0-alpine as production-stage

RUN mkdir /app

COPY --from=build-stage /app/dist /app

COPY .nginx/nginx.conf /etc/nginx/nginx.conf