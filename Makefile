.DEFAULT_GOAL := help

.PHONY: help install dev build preview clean

help:
	@echo "Usage: make <target>"
	@echo ""
	@echo "Targets:"
	@echo "  install   Install npm dependencies"
	@echo "  dev       Start local development server"
	@echo "  build     Build static site for GitHub Pages"
	@echo "  preview   Preview the production build locally"
	@echo "  clean     Remove build output"

install:
	npm install

dev:
	npm run dev

build:
	npm run build

preview:
	npm run preview

clean:
	rm -rf dist
