const { PocketExchange } = require('./model');

const mockPockets = [
  {
    name: 'Euro',
    code: 'EUR',
    symbol: '€',
    balance: 10.0,
  },
  {
    name: 'Pound Sterling',
    code: 'GBP',
    symbol: '£',
    balance: 10.0,
  },
  {
    name: 'US Dollar',
    code: 'USD',
    symbol: '$',
    balance: 10.0,
  },
];

const mockRates = {
  EUR: 0.921452,
  GBP: 0.804644,
  USD: 1,
};

describe('Pocket Exchange', () => {
  let pocketExchange;

  beforeEach(() => {
    pocketExchange = new PocketExchange(mockPockets);
  });

  it('should set correct pockets', () => {
    expect(pocketExchange.pockets).toBe(mockPockets);
  });

  it('should set correct mock rates', () => {
    pocketExchange.updateExchangeRates(mockRates);
    expect(pocketExchange.rates).toBe(mockRates);
  });

  it('should update correct pockets', () => {
    pocketExchange.updateExchangeRates(mockRates);
    pocketExchange.updatePocket('USD', 'EUR', 10);
    const usdPocket = pocketExchange.pockets.find(
      (pocket) => pocket.code == 'USD'
    );
    const eurPocket = pocketExchange.pockets.find(
      (pocket) => pocket.code == 'EUR'
    );

    expect(usdPocket.balance).toBe(0);
    expect(eurPocket.balance).toBe(19.21);
  });

  it('should throw error if balance is low', () => {
    expect(() => {
      pocketExchange.updatePocket('USD', 'EUR', 100);
    }).toThrow();
  });

  it('should throw error if rates are not set', () => {
    expect(() => {
      pocketExchange.getConversionRate('USD', 'EUR');
    }).toThrow();
  });

  it('should show correct conversion rate', () => {
    pocketExchange.updateExchangeRates(mockRates);
    expect(pocketExchange.getConversionRate('USD', 'EUR')).toBe(0.92145);
  });
});
