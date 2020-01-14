.PHONY: clean install test

clean:
	@rm -rf node_modules

install: clean
	npm install

test: install
	yarn test:files
	yarn test:license
	yarn test:typescript
