const mongoose = require('mongoose')
const { dbAPI } = require('./variables')

const connectToDb = () => {
  // connect to db for testing
  mongoose
    .connect(dbAPI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err))
  global.db = mongoose.connection
}

module.exports = connectToDb
