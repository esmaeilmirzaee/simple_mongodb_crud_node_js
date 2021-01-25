const dotenv = require('dotenv');
dotenv.config();

const mongodb = requrie('mongodb');

mongodb.connect(
  process.env.CONNECTIONSTRING,
  { useUnifiedTopology: true },
  async (err, client) => {
    if (err) console.log(err);

    module.exports = client;
    const app = require('./app');
    app.listen(process.env.PORT || 3000);
  },
);
