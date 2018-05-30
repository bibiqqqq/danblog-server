const mongoose = require('mongoose')
const { Schema } = mongoose
const repoSchema = new Schema ({
  name: { type: String, required: true },
  desc: String,
  stars: { type: Number, required: true },
  url: { type: String, required: true },
  language: String


})
const Repo = mongoose.model('repo', repoSchema)
module.exports = Repo