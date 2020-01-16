const express = require("express")
const Article = require("../schemas/Article")

const router = express.Router()

//paginated with 5
router.get('/api/articles', async (req, res) => {
  const page = req.query.page * 5 - 5 // page 1 = skip 0, page 2 = skip 5...
  const allArticles = await Article.find().sort({ "created": -1 }).skip(page).limit(5).exec()
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
//toggle published
router.put('/api/articles/:link/toggle', async (req, res) => {
  const articleToFind = await Article.findOne({ link: req.params.link })
  articleToFind.published = !articleToFind.published
  await articleToFind.save()
  res.json(articleToFind.published)
})

// edit existing article
router.put('/api/articles/:link/edit', async (req, res) => {
  // console.log(req.body)
  const articleToSave = await Article.findOne({ link: req.params.link })

  articleToSave.edited = new Date().getTime()
  articleToSave.headline = req.body.headline
  articleToSave.image = req.body.image
  articleToSave.body = req.body.body,
  articleToSave.link = req.body.link
  
  try {
    await articleToSave.save()
    console.log('Edited: ', articleToSave);
    res.json(articleToSave)
  }
  catch (err) {
    console.log(err)
    res.json({ error: err })
  }
})
router.post('/api/articles', async (req, res) => {
  console.log(req.body);

  let article = new Article({
    ...req.body, 
    created: new Date().getTime(), 
    edited: new Date().getTime()
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