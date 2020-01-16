const mongoose = require('mongoose')
const { connectionString } = require('./connectionString')

const connectToDb = () => {
  // connect to db for testing
  mongoose
    .connect(process.env.API_KEY, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err))
  global.db = mongoose.connection
}

module.exports = connectToDb
