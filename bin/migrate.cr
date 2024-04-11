#! /usr/bin/env -S crystal i
require "pg"
require "../src/config"
require "../src/migrator/cli"

config = Swarmit::Config.setup_from_env
Migrator::CLI.new(config.database_url).run
