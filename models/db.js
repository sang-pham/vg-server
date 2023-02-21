const mongoose = require('mongoose')
require('dotenv').config()

mongoose.set("strictQuery", false);

mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?${process.env.MONGOQUERYPARAMS}`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    console.log(err)
  }
);

const {db} = mongoose.connection;

module.exports = db