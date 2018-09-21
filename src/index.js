const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.APP_PORT || 3000;
const name = process.env.NAME || 'JS';

app.use(cookieParser());

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

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
