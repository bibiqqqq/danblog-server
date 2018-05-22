const router = require('koa-router')()
const article = require('./article')
const user = require('./user')
module.exports = app => {
  article(router)
  user(router)
  app.use(router.routes())
    .use(router.allowedMethods())
}