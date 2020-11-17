#!/usr/bin/env bash

initBackend() {
  # init mongo service
  $(systemctl is-active --quiet mongodb.service) &&
    echo 'MongoDB is on' || systemctl start mongodb.service;

  # init express backend server
  cd "$HOME/workspace/agenda/server"
  yarn start
}

case $1 in
  stop) systemctl stop mongodb.service;;
  *) initBackend;;
esac
