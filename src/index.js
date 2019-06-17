const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('pino')();
const expressPino = require('express-pino-logger')({ logger });

const app = express();
const port = parseInt(process.env.APP_PORT || 3000, 10);
const startDelay = parseInt(process.env.START_DELAY || 0, 10) * 1000;
const name = process.env.NAME || 'JS';

app.use(cookieParser());
app.use(expressPino);

app.use('*', (req, res, next) => {
  req.log.info('Incoming request !');
  next();
});
app.get('/', (req, res) => res.send(`Hello ${name}!`));
app.get('/ip', (req, res) => {
  const ip = req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
  res.json({ ip });
});
app.get('/headers', (req, res) => res.json(req.headers));
app.get('/cookies', (req, res) => res.json({ cookies: req.cookies }));
app.get('/error', (req, res, next) => next(new Error('Some error happened !')));

app.use((error, req, res, next) => {
  req.log.error(error);

  res.json({ error: error.message });
});

setTimeout(() => {
  app.listen(port, () => logger.info(`Hello-js listening on port ${port} !`));
}, startDelay);
