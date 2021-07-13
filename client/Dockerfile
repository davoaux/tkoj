# run: docker build -t tkoj-client .
#      docker run -it --rm -v (pwd):/app -v /app/node_modules --network tkoj-network -p 3000:3000 tkoj-client:dev

FROM node:16.3.0-alpine

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
RUN yarn install --development

COPY . ./

CMD ["yarn", "start"]
