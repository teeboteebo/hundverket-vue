const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  fbToken: process.env.FB_API,
  dbAPI: process.env.DB_KEY
}