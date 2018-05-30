const Koa = require('koa')
const app = new Koa()
const routes = require('./routes')
const bodyParser = require('koa-bodyparser')
const db = require('./mongodb/db')
const cors = require('koa2-cors')
const koaJwt = require('koa-jwt')
const { secret } = require('./config')
app.use(cors())
app.use(bodyParser())
app.use(koaJwt({secret}).unless({ path: [
  /^\/user\/register/,
  /^\/user\/login/,
  /^\/article\/list/,
  /^\/article\/detail/,
  /^\/repo\/list/
]}))
routes(app)
app.listen(9093, () => {
  console.log('server is running 9093 port')
})