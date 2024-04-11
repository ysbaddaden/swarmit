# Swarmit

Docker Swarm User Interface

## Status

Experimental.

## Requirements

Requirements:

- Docker Swarm, either as a single manager node, or as a full featured
  manager(s) + worker(s) cluster;
- Google OAuth API service for authenticating users.
- PostgreSQL database.

## Setup

This is a [Crystal](https://crystal-lang.org) application, so you must install
Crystal and Shards.

Compile the application:

```console
$ shards build --release
```

Export environment variables:

- `DOCKER_HOST` (optional, defaults to `unix:///var/run/docker.sock`)
- `DATABASE_URL=postgres://user:password@host/database` or `PGHOST`, `PGPORT`, ...
- `GOOGLE_OAUTH_CLIENT_ID`
- `GOOGLE_OAUTH_CLIENT_SECRET`

On initial setup, populate the PostgreSQL database from `db/structure.sql`. On
upgrade, you should run the individual database migrations:

```console
$ crystal i bin/migrate.cr
```

Run the application. It can run outside the Swarm (useful in development), but
for production it should run within the Swarm.

```console
bin/swarmit
```

TODO: `Dockerfile` and `compose.yml`

## License

Distributed under [CECILL v2.1](https://opensource.org/license/cecill-2-1/).

See `LICENSE` (English) and `LICENSE-FR` (French) for details.

## Authors

- Julien Portalier <julien@portalier.com>
