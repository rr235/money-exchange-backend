module.exports = (app, exchange) => {
  /**
   * endpoint to get list of all available pockets
   */
  app.get('/pockets', (req, res) => {
    res.send(exchange.pockets);
  });

  /**
   * endpoint to get latest exchange rate
   */
  app.get('/exchangeRate', (req, res) => {
    const { from, to } = req.query;

    try {
      const conversionRate = exchange.getConversionRate(from, to);
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
      exchange.updatePocket(from, to, amount);
      res.status(200).send(exchange.pockets);
    } catch (error) {
      res.status(403).send(error.message);
    }
  });
};
