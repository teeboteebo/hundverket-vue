const crypto = require('crypto')
const settings = require('./settings.json')

module.exports = password => {
  return crypto.createHmac('sha256', settings.salt)
    .update(password).digest('hex')
}