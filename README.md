# hello-js ![Docker Build](https://img.shields.io/docker/build/oliviercuyp/hello-js.svg)

A simple expressjs server to ops tests.

## Routes

- **GET** `/` respond: `hello <name>` (name is env.NAME or default to "JS")
- **GET** `/ip` respond: `{ ip: x.x.x.x }` (expose client ip)
- **GET** `/headers` respond: `{ headers:  { ... } }` (expose req.headers)
- **GET** `/cookies` respond: `{ cookies:  { ... } }` (expose req.cookies)


