FROM node:12.11-alpine

WORKDIR /app
COPY package.json .
COPY src/. src

RUN apk add --no-cache bash
RUN npm install

ENTRYPOINT ["npm", "start"]