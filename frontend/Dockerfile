FROM node:16-alpine

WORKDIR /usr/src/frontend

COPY package*.json ./

RUN npm i

COPY ./ ./

EXPOSE 4200

CMD [ "npm", "start" ]
