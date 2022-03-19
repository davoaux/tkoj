#!/bin/sh

cp -r /usr/src/cache/node_modules/. /app/node_modules/

exec yarn run dev