const mongoose = require("mongoose")
const Schema = mongoose.Schema

let dogSchema = new Schema({
  link: { type: String, unique: true },
  breed: { type: String },
  name: { type: String },
  desc: { type: String },
  image: { type: String },
  links: { type: Array },
  dateOfBirth: { type: Date },
  title: { type: String }
})

module.exports = mongoose.model("Dog", dogSchema)