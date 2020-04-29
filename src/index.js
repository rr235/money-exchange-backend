const express = require('express');
const http = require('http');
const getRates = require('./services/exchange');
const applyMiddleswares = require('./middlewares');

const port = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);

applyMiddleswares(app);

const roundUpDigits = (value, digits) => Number(value.toFixed(digits));

const rates = {
  EUR: 0.92288,
  GBP: 0.80434,
  USD: 1,
};

const pockets = [
  { name: 'Euro', code: 'EUR', symbol: '€', balance: roundUpDigits(10, 2) },
  {
    name: 'Pound Sterling',
    code: 'GBP',
    symbol: '£',
    balance: roundUpDigits(10, 2),
  },
  {
    name: 'US Dollar',
    code: 'USD',
    symbol: '$',
    balance: roundUpDigits(10, 2),
  },
];

server.listen(port, () => {
  console.log(`Listening at ${port}`);
});

app.post('/exchange', (req, res) => {
  const { from, to, amount } = req.body;
  const conversionRate = Number((rates[to] / rates[from]).toFixed(5));

  const fromPocket = pockets.find((pocket) => pocket.code === from);

  if (fromPocket.balance < amount) {
    res
      .status(403)
      .send({ message: "You don't have enough balance for this exchange" });
    return;
  }

  const convertedAmount = amount * conversionRate;
  for (let i in pockets) {
    if (pockets[i].code === from) {
      pockets[i].balance = Number((pockets[i].balance - amount).toFixed(2));
    }

    if (pockets[i].code === to) {
      pockets[i].balance = Number(
        (pockets[i].balance + convertedAmount).toFixed(2)
      );
    }
  }

  res.status(200).send(pockets);
});

app.get('/exchangeRate', (req, res) => {
  const { from, to } = req.query;
  const conversionRate = Number((rates[to] / rates[from]).toFixed(5));
  res.status(200).send({ conversionRate });
});

app.get('/pockets', (req, res) => {
  // const callback = (error, data) => {
  //   res.setHeader('Content-Type', 'application/json');

  //   if (error) {
  //     res.status(500).send(error);
  //     return;
  //   }

  //   res.status(200).send(data);
  // };

  // getRates(callback);
  res.send(pockets);
});
