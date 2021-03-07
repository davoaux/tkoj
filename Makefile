.PHONY: server client

SHELL := /bin/bash
BASE  := $(shell pwd)

COLOR_RESET   = \033[0m
COLOR_INFO    = \033[32m

all:
	@printf "${COLOR_INFO}Use 'make install' to fetch the server and client dependencies${COLOR_RESET}\n"
	@printf "${COLOR_INFO}Use 'make server' to initialize the node server${COLOR_RESET}\n"
	@printf "${COLOR_INFO}Use 'make client' to initialize the react app${COLOR_RESET}\n"

install:
	@cd ${BASE}/server && yarn install
	@cd ${BASE}/client && yarn install

server:
	@printf "${COLOR_INFO}🚀 Starting nodejs server...${COLOR_RESET}\n"
	@cd ${BASE}/server && yarn start

client:
	@printf "${COLOR_INFO}🚀 Starting react app...${COLOR_RESET}\n"
	@cd ${BASE}/client && yarn start

clean:
	rm -rfv ${BASE}/*/node_modules
