const express = require('express');
const http = require('http');
const getRates = require('./services/exchange');
const applyMiddleswares = require('./middlewares');
const { PocketExchange } = require('./model');

const app = express();
const server = http.createServer(app);
const pocketExchange = new PocketExchange();

const { PORT, FETCH_INTERVAL } = process.env;
const port = PORT || 5000;

applyMiddleswares(app);

server.listen(port, () => {
  console.log(`Listening at ${port}`);
});

/**
 * endpoint to get list of all available pockets
 */
app.get('/pockets', (req, res) => {
  res.send(pocketExchange.pockets);
});

/**
 * endpoint to get latest exchange rate
 */
app.get('/exchangeRate', (req, res) => {
  const { from, to } = req.query;

  try {
    const conversionRate = pocketExchange.getConversionRate(from, to);
    res.status(200).send({ conversionRate });
  } catch (error) {
    res.status(403).send(error.message);
  }
});

/**
 * endpoint to convert currency from a pocket
 */
app.post('/exchange', (req, res) => {
  const { from, to, amount } = req.body;

  try {
    pocketExchange.updatePocket(from, to, amount);
    res.status(200).send(pocketExchange.pockets);
  } catch (error) {
    res.status(403).send(error.message);
  }
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
