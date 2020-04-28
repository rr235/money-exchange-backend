const https = require('https');

module.exports = (callback) => {
  const { OPEN_EXCHANGE_HOST, OPEN_EXCHANGE_API_KEY } = process.env;
  const options = {
    hostname: OPEN_EXCHANGE_HOST,
    path: `/api/latest.json?app_id=${OPEN_EXCHANGE_API_KEY}&symbols=EUR,GBP,USD`,
    method: 'GET',
  };

  const req = https.request(options, (res) => {
    console.log(`statusCode: ${res.statusCode}`);
    const data = [];

    res.on('data', (chunk) => {
      data.push(chunk);
    });

    res.on('end', () => {
      callback(null, JSON.parse(data));
    });
  });

  req.on('error', (error) => {
    console.error(error);
    callback(error);
  });

  req.end();
};
