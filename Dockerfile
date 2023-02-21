FROM node:16.19.0-alpine3.16 as build-stage 

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5001

CMD [ "node", "index.js" ]