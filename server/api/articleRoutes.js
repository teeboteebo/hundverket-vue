const express = require("express")
const Article = require("../schemas/Article")

const router = express.Router()

router.get('/api/articles', async (req, res) => {
  const allArticles = await Article.find().sort({"created": -1}).limit(5).exec()
  res.json(allArticles)
})
router.get('/api/articles/:link', async (req, res) => {
  const articleToFind = await Article.findOne({ link: req.params.link })
  if (articleToFind) {
    res.json(articleToFind)
  } else {
    res.json({ error: 'article not found' })
  }
})
router.post('/api/articles', async (req, res) => {
  console.log(req.body);
  
  let article = new Article({
    ...req.body
  })
  try {
    await article.save()
    console.log('SAVED: ', article);
    
    res.json(article)
  }
  catch (err) {
    res.json({ error: err })
  }
})

module.exports = router
