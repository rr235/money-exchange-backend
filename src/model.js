class PocketExchange {
  constructor() {
    this.pockets = [
      {
        name: 'Euro',
        code: 'EUR',
        symbol: '€',
        balance: this.roundUpDigits(10, 2),
      },
      {
        name: 'Pound Sterling',
        code: 'GBP',
        symbol: '£',
        balance: this.roundUpDigits(10, 2),
      },
      {
        name: 'US Dollar',
        code: 'USD',
        symbol: '$',
        balance: this.roundUpDigits(10, 2),
      },
    ];
  }

  roundUpDigits(value, digits) {
    return Number(value.toFixed(digits));
  }

  getConversionRate(fromCode, toCode) {
    return Number((this.rates[toCode] / this.rates[fromCode]).toFixed(5));
  }

  updateExchangeRates(rates) {
    this.rates = rates;
  }

  updatePocket(fromCode, toCode, amount) {
    const pockets = this.pockets;

    const fromPocket = pockets.find((pocket) => pocket.code === fromCode);

    if (fromPocket.balance < amount) {
      throw new Error({
        message: "You don't have enough balance for this exchange",
      });
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
