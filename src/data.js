const roundUpDigits = (value, digits) => Number(value.toFixed(digits));

const getPockets = () => [
  {
    name: 'Euro',
    code: 'EUR',
    symbol: '€',
    balance: roundUpDigits(10, 2),
  },
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

module.exports = getPockets;
