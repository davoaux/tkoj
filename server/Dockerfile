# run: docker build -t tkoj-server .
#      docker run -it --rm --network tkoj-network -p 4567:4567 tkoj-server:latest

FROM ruby:2.7-alpine

RUN bundle config --global frozen 1

RUN apk update && apk add --no-cache make gcc musl-dev g++

WORKDIR /app

COPY Gemfile* ./
RUN bundle install

COPY . ./

CMD ["bundle", "exec", "rackup", "--host", "0.0.0.0", "-p", "4567"]
