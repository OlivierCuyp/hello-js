# hello-js ![Docker Build](https://img.shields.io/docker/build/oliviercuyp/hello-js.svg)

A simple expressjs server for ops tests.

## Routes

- **GET** `/` respond: `hello <name>` (name is env.NAME)
- **GET** `/cookies` respond: `{ "cookies": { ... } }` (exposes req.cookies)
- **GET** `/error` respond: `{ "error": "Some error happened !" }` (generates error)
- **GET** `/headers` respond: `{ "headers": { ... } }` (exposes req.headers)
- **GET** `/ip` respond: `{ "ip": "x.x.x.x" }` (exposes client ip)

## Environment variables

- **APP_PORT** Port on which the express server listen (default: 3000)
- **NAME** Name shown root route (default: 'JS')
- **START_DELAY** Delay in seconds the server wait to start (default: 0)

## How to run

**Local**

```
docker-compose up
```
You can play around with the env vars.

**On Swarm**

This is just a working exemple.
You should tweak it for your needs (e.g. increase the `START_DELAY` to fail the healthcheck).

```
version: '3.7'

services:
  hello-js:
    image: oliviercuyp/hello-js:latest
    healthcheck:
      test: wget -q -t 1 --spider http://localhost:3000
      interval: 10s
      timeout: 2s
      retries: 3
      start_period: 5s
    ports:
      - 3000:3000
    environment:
      APP_PORT: 3000
      NAME: JS
      START_DELAY: 0
    deploy:
      resources:
        limits:
          memory: 32M
      update_config:
        monitor: 120s
```

