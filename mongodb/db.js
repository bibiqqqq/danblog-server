const mongoose = require('mongoose')
const url = 'mongodb://localhost:27017/dan-blog'
mongoose.connect(url)
mongoose.Promise = global.Promise
const db = mongoose.connection

db.on('open', () => {
  console.log('mongodb server start at 27017')
})

db.on('error', (err) => {
  console.error('Error in mongodb connection', err)
  mongoose.disconnect()
})
module.exports = db
