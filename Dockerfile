
FROM node:20.10.0-alpine

ENV NODE_ENV production
ENV NPM_CONFIG_UPDATE_NOTIFIER false
ENV NPM_CONFIG_FUND false

RUN apk add --no-cache libuuid python3 build-base pkgconf

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . ./

CMD node src/index.js