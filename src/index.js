const express = require('express');
const http = require('http');
const getRates = require('./services/exchange');
const applyMiddleswares = require('./middlewares');
const { PocketExchange } = require('./model');
const getPockets = require('./data');
const exchangeRoutes = require('./routes/exchangeRoutes');

const app = express();
const server = http.createServer(app);
const pocketExchange = new PocketExchange(getPockets());

const { PORT, FETCH_INTERVAL } = process.env;
const port = PORT || 5000;

applyMiddleswares(app);

exchangeRoutes(app, pocketExchange);

server.listen(port, () => {
  console.log(`Listening at ${port}`);
});

// callback that updates latest exchange rates
const getLatestExchangeRates = (error, { rates }) => {
  if (error) {
    return;
  }
  pocketExchange.updateExchangeRates(rates);
};

// get exchange rates at provided interval
getRates(getLatestExchangeRates);
setInterval(() => {
  getRates(getLatestExchangeRates);
}, FETCH_INTERVAL);
