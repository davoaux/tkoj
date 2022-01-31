# run: docker build -t tkoj-client .
#      docker run -it --rm -v (pwd):/app -v /app/node_modules --network tkoj-network -p 3000:3000 tkoj-client:dev

FROM node:16.3.0-alpine

WORKDIR /usr/src/cache

COPY package*.json .
COPY tsconfig.json .
RUN yarn install --development

WORKDIR /app

ENV NODE_PATH=/app/node_modules/.bin
COPY . .
RUN chmod +x /app/entrypoint.sh