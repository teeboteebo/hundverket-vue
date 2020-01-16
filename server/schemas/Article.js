const mongoose = require("mongoose")
const Schema = mongoose.Schema

let articleSchema = new Schema({
  created: { type: Date },
  edited: { type: Date },
  link: { type: String, unique: true },
  headline: { type: String },
  body: { type: String },
  image: { type: String },
  published: { type: Boolean, default: false }
})

module.exports = mongoose.model("Article", articleSchema)