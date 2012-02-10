test:
	find test -name "*.test.js" | xargs mocha

.PHONY: test
