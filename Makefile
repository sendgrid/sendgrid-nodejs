.PHONY: clean install test

clean:
	@rm -rf node_modules

install: clean
	npm install

test: install
	npm run test:files
	npm run test:license
	npm run test:typescript
