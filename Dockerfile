FROM node:16-alpine as builder

RUN apk update
RUN apk add --no-cache

WORKDIR /app/src
COPY . .

RUN npm install
RUN npm run build

WORKDIR /app

RUN mv src/node_modules node_modules
RUN mv src/dist botchef
RUN rm -rf src/

ENTRYPOINT ["/app"]

# Production Stage
FROM alpine:latest
RUN apk --no-cache add ca-certificates nodejs

WORKDIR /app
COPY --from=builder app/node_modules node_modules
COPY --from=builder app/botchef dist

CMD ["node", "dist/index.js"]