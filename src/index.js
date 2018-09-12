const express = require('express');
const app = express();
const port = process.env.APP_PORT || 3000;
const name = process.env.NAME || 'JS';

app.get('/', (req, res) => res.send(`Hello ${name}!`));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
