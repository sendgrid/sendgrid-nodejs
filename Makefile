.PHONY: clean install test test-integ test-docker

clean:
	@rm -rf node_modules

install: clean
	npm install
	./node_modules/.bin/lerna bootstrap

test:
	yarn test:files
	yarn test:license
	yarn test:typescript

test-integ: test
	yarn test:mail
	yarn test:client
	yarn test:helpers
	yarn lint

version ?= lts
test-docker:
	curl -s https://raw.githubusercontent.com/sendgrid/sendgrid-oai/master/prism/prism.sh | version=$(version) bash
