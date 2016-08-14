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

serve-server:
	PORT=$(PORT) $(NODEMON_BIN) --watch ./server ./server/server

serve-client:
	$(WEBPACK_DEV_SERVER_BIN)

serve-dev:
	NODE_ENV=dev $(MAKE) serve-server & $(MAKE) serve-client

serve: build serve-server
