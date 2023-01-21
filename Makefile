VERSION := 0.0.1

.PHONY: push
push:
	- . ./scripts/push

.PHONY: publish
publish:
	- . ./scripts/publish

.PHONY: build
build:
	- . ./scripts/build