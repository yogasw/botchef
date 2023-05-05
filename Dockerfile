FROM node:16-alpine as builder

RUN apk update
RUN apk add --no-cache

WORKDIR /app/src
COPY . .

RUN cd client-setting && npm install && npm run build
RUN npm install
RUN npm run build


CMD ["npm", "run","start"]
