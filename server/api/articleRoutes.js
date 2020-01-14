const express = require("express")
const Article = require("../schemas/Article")

const router = express.Router()

//paginated with 5
router.get('/api/articles', async (req, res) => {
  const page = req.query.page*5-5 // page 1 = skip 0, page 2 = skip 5...
  const allArticles = await Article.find().sort({"created": -1}).skip(page).limit(5).exec()
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

// only return if article is set to published
router.get('/api/articles/published/:link', async (req, res) => {
  const articleToFind = await Article.findOne({ link: req.params.link })
  if (articleToFind && articleToFind.published) {
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
