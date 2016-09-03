.PHONY: build lint serve-server serve-client serve-dev serve

NODEMON_BIN = ./node_modules/.bin/nodemon
WEBPACK_BIN = ./node_modules/.bin/webpack
WEBPACK_DEV_SERVER_BIN = ./node_modules/.bin/webpack-dev-server
ESLINT_BIN = ./node_modules/.bin/eslint
PORT ?= 8000

build:
	$(WEBPACK_BIN)

lint:
	$(ESLINT_BIN) ./src/*.*

start-db-dev:
	rm -rf ./.db_tmp
	initdb -E 'UTF-8' ./.db_tmp
	pg_ctl -D ./.db_tmp -l ./.db_tmp/server.log start
	sleep 2
	createdb

stop-db-dev:
	pg_ctl -D ./.db_tmp -l ./.db_tmp/server.log stop
	rm -rf ./.db_tmp

migrate-db:
	node scripts/sync-models.js

migrate-db-force:
	# WARNING: This will drop tables if they exist
	# Sleeping five seconds, CTRL+C to cancel
	sleep 5
	node scripts/sync-models.js --force

serve-server:
	PORT=$(PORT) $(NODEMON_BIN) --watch ./server ./server/server

serve-client:
	$(WEBPACK_DEV_SERVER_BIN)

serve-dev:
	NODE_ENV=dev $(MAKE) serve-server & $(MAKE) serve-client

serve: build serve-server

prepare-sentiment-analysis:
	python -m textblob.download_corpora

install:
	pip install -r requirements.txt
	$(MAKE) prepare-sentiment-analysis
	npm prune
	npm install
