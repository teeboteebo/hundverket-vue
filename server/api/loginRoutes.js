const express = require("express")
const encryptPassword = require('../config/encryptPassword')
const User = require("../schemas/User")

const router = express.Router()

router.post('/api/login', async (req, res) => {  
  let {email, password} = req.body
  password = encryptPassword(password)
  let user = await User.findOne({email, password})
  if (user) {
    req.session.user = user
    res.json({success: 'logged in', user})
  }
   else {
    res.json({ error: 'not found' })
  }
})
 
// check if/which user that is logged in
router.get('/api/login', (req, res) => {
  res.json(req.session.user ?
    req.session.user :
    {status: 'not logged in'}
  )
})

router.delete('/api/login', (req, res) => {
  delete req.session.user
  res.json({status: 'logged out'})
})

module.exports = router