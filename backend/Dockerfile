FROM node:16-alpine as backend

WORKDIR /usr/src/backend

COPY package*.json ./

RUN npm i

COPY ./ ./

EXPOSE 8088

CMD [ "npm", "start" ]
