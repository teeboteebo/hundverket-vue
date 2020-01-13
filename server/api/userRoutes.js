const express = require("express")
const encryptPassword = require("../config/encryptPassword")
const User = require("../schemas/User")

const router = express.Router()

router.get("/api/users", async (req, res) => {
  let allUsers = await User.find()
  res.status(200).send(allUsers)
})

router.get("/api/users/id/:id", async (req, res) => {
  let user = await User.findById(req.params.id)
  res.status(200).send(user)
})

router.post("/api/users", async (req, res) => {
  if (typeof req.body.password !== "string" || req.body.password.length < 6) {
    res.json({ error: "Password too short" })
    return
  }
  let user = new User({
    ...req.body,
    password: encryptPassword(req.body.password)
  })
  let error
  let resultFromSave = await user.save().catch(err => (error = err + ""))
  res.json(error ? { error } : { success: "User created" })
  console.log(error)

})

router.put("/api/users/id/:id/edit", async (req, res) => {
  let user = await User.findById(req.params.id)
  req.body.password = await encryptPassword(req.body.password)
  Object.assign(user, req.body)
  await user.save()
  res.json(user)
})

router.delete("/api/users/delete/all", async (req, res) => {
  try {
    let usersToDelete = await User.find()
    usersToDelete.delete()
    res.status(200).send("All users terminated!")
  } catch (err) {
    res.send("Could not delete users")
  }
})

module.exports = router
