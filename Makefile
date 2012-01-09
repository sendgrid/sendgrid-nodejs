test:
	find test -name "*.test.js" | xargs mocha --require should

.PHONY: test
