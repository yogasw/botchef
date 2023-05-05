FROM node:16-alpine as builder

RUN apk update
RUN apk add --no-cache

WORKDIR /app/src
COPY . .

RUN npm install
RUN npm run build

CMD ["node", "dist/index.js"]