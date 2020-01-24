const express = require("express")
const router = express.Router()
const axios = require('axios')
const { fbToken } = require('../config/variables')

router.get('/api/photos/', async (req, res) => {
  const response = await axios.get(
    `https://graph.facebook.com/v5.0/431784067012499?fields=albums{photos{images,name,link,created_time}}&access_token=${fbToken}`
  );
  res.json(response.data.albums.data[0].photos.data)
})

module.exports = router