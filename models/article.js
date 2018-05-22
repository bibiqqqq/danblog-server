const mongoose = require('mongoose')
const { Schema } = mongoose
const articleSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  tag: { type: String },
  updatedAt: { type: Date, default: Date.now() }
})
const Article = mongoose.model('article', articleSchema)
module.exports = Article