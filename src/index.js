const express = require('express');
const http = require('http');
const getRates = require('./services/exchange');
const applyMiddleswares = require('./middlewares');

const port = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);

applyMiddleswares(app);

server.listen(port, () => {
  console.log(`Listening at ${port}`);
});

app.get('/exchange', (req, res) => {
  const callback = (error, data) => {
    if (error) {
      res.setHeader('Content-Type', 'application/json');
      res.status(500).send(error);
      return;
    }

    res.status(200).send(data);
  };

  getRates(callback);
});
