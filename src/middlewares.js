const bodyParser = require('body-parser');
const cors = require('cors');

module.exports = (app) => {
  const corsOptions = {
    origin: [process.env.APPLICATION_URL],
    methods: 'GET, POST',
  };
  app.use(bodyParser.json());
  app.use(cors(corsOptions));
};
