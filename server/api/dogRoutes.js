const express = require("express")
const Dog = require("../schemas/Dog")

const router = express.Router()

router.get('/api/dogs', async (req, res) => {
  const allDogs = await Dog.find()
  res.json(allDogs)
})

// Find one with link
router.get('/api/dogs/:link', async (req, res) => {
  const dogToFind = await Dog.findOne({link:req.params.link})
  res.json(dogToFind)
})

router.post('/api/dogs', async (req, res) => {
  console.log(req.body);
  let dog = new Dog({
    ...req.body
  })
  try {
    await dog.save()
    console.log('SAVED: ', dog);

    res.json(dog)
  }
  catch (err) {
    res.json({ error: err })
  }
})

router.delete('/api/dogs/:id', async (req, res) => {
  const dogToDelete = await Dog.findById(req.params.id)
  try {
    dogToDelete.delete()
    res.json({ success: 'deleted' })
  }
  catch (err) {
    res.json({ error: 'could not delete' })
  }
})

module.exports = router
