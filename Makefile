.PHONY: build lint serve-server serve-client serve-dev serve

NODEMON_BIN = ./node_modules/.bin/nodemon
WEBPACK_BIN = ./node_modules/.bin/webpack
WEBPACK_DEV_SERVER_BIN = ./node_modules/.bin/webpack-dev-server
ESLINT_BIN = ./node_modules/.bin/eslint
PORT = 8000

build:
	$(WEBPACK_BIN)

lint:
	$(ESLINT_BIN) ./src/*.*

start-postgres-dev:
	rm -rf ./.db_tmp
	initdb -E 'UTF-8' ./.db_tmp
	pg_ctl -D ./.db_tmp -l ./.db_tmp/server.log start
	sleep 2
	createdb

stop-postgres-dev:
	pg_ctl -D ./.db_tmp -l ./.db_tmp/server.log stop
	rm -rf ./.db_tmp

serve-server:
	PORT=$(PORT) $(NODEMON_BIN) --watch ./server ./server/server

serve-client:
	$(WEBPACK_DEV_SERVER_BIN)

serve-dev: start-postgres-dev
	NODE_ENV=dev $(MAKE) serve-server & $(MAKE) serve-client

serve: build serve-server
