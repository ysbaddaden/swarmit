.POSIX:
.PHONY:

CRYSTAL = crystal
CRFLAGS =
OPTS =

BUN = bun
BUN_FLAGS = --minify --sourcemap=external
SASS = bun run sass
SASS_FLAGS = --style=compressed

all: bin/migrate bin/swarmit

bin/migrate: .PHONY
	$(CRYSTAL) build $(CRFLAGS) bin/migrate.cr -o bin/migrate

bin/swarmit: .PHONY
	$(CRYSTAL) build $(CRFLAGS) bin/swarmit.cr -o bin/swarmit

assets: js css

js: .PHONY
	$(BUN) build $(BUN_FLAGS) --public-path=/assets --outdir=public/assets/js assets/js/*.js

css: .PHONY
	$(SASS) $(SASS_FLAGS) --load-path=node_modules ./assets/css:./public/assets/css

run: .PHONY
	$(CRYSTAL) run $(CRFLAGS) src/server.cr -- $(OPTS)

test: .PHONY
	$(CRYSTAL) run $(CRFLAGS) test/**/*_test.cr -- $(OPTS)
