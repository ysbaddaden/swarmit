#! /usr/bin/env sh
set -eux
cd /app
bin/migrate all --no-dump
exec bin/swarmit
