FROM node:16.14-alpine

WORKDIR /usr/src/cache

COPY package*.json .
COPY tsconfig.json .
RUN yarn install --development

WORKDIR /app

ENV NODE_PATH=/app/node_modules/.bin
COPY . .
RUN chmod +x /app/entrypoint.sh