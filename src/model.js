class PocketExchange {
  constructor(pockets) {
    this.pockets = pockets;
    this.rates = {};
  }

  /**
   * NOTE: This method only returns relative exchange rate.
   * This is because the free api only return rate to default base USD.
   * Ideally rates have to fetched based on correct Base.
   */
  getConversionRate(fromCode, toCode) {
    if (!this.rates[toCode] || !this.rates[fromCode]) {
      throw new Error('Cannot find conversion rates');
    }
    return Number((this.rates[toCode] / this.rates[fromCode]).toFixed(5));
  }

  updateExchangeRates(rates) {
    this.rates = rates;
  }

  updatePocket(fromCode, toCode, amount) {
    const pockets = this.pockets;

    const fromPocket = pockets.find((pocket) => pocket.code === fromCode);

    if (fromPocket.balance < amount) {
      throw new Error("You don't have enough balance for this exchange");
    }

    const convertedAmount = amount * this.getConversionRate(fromCode, toCode);

    for (let i in pockets) {
      if (pockets[i].code === fromCode) {
        pockets[i].balance = Number((pockets[i].balance - amount).toFixed(2));
      }

      if (pockets[i].code === toCode) {
        pockets[i].balance = Number(
          (pockets[i].balance + convertedAmount).toFixed(2)
        );
      }
    }
  }
}

module.exports = { PocketExchange };
