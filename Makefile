TESTS = $(find test -name "*.test.js")

test:
	mocha $(TESTS) --require should

.PHONY: test