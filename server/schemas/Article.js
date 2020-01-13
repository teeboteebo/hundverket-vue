const mongoose = require("mongoose")
const Schema = mongoose.Schema

let articleSchema = new Schema({
  created: { type: Date, default: new Date().getTime() },
  edited: { type: Date },
  link: { type: String, unique: true },
  headline: { type: String },
  body: { type: String },
  image: { type: String },
  published: { type: Boolean, default: false }
})
articleSchema.pre('save', async function () {
  this.edited = new Date().getTime();
});
module.exports = mongoose.model("Article", articleSchema)