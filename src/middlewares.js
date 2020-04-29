const bodyParser = require('body-parser');
const cors = require('cors');

module.exports = (app) => {
  console.log(process.env.APPLICATION_URL);
  const corsOptions = {
    origin: [process.env.APPLICATION_URL],
    methods: 'GET, POST',
  };
  app.use(bodyParser.json());
  app.use(cors(corsOptions));
};
