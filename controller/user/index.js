const User = require('../../models/user')
const utils = require('utility')
const jwt = require('jsonwebtoken')
const { secret } = require('../../config')
class UserController {
  /**
   * 注册
   */
  static async register (ctx) {
    const { username, password } = ctx.request.body
    const isExisted = await User.find({ username })
    if (isExisted.length) {
      ctx.throw(406, 'username已存在')
    } else {
      const user = await User.create({ username, password: UserController.md5Pwd(password) })
      ctx.body = {
        code: 0,
        message: '注册成功'
      }
    }
  }
  /**
   * 登录
   */
  static async login (ctx) {
    const { username, password } = ctx.request.body
    const user = await User.find({ username, password: UserController.md5Pwd(password) })
      .then(doc => {
        if (!doc.length) {
          return ctx.throw(401, '登录失败')
        }
        ctx.body = {
          message: '登录成功',
          code: 0,
          token: jwt.sign({
            data: doc,
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
          }, secret)
        }
      })
    
  }
  /**
   * md5加密
   */
  static md5Pwd (password) {
    const salt = 'sadbbfsdnsakdbawdeasc'
    return utils.md5(utils.md5(password + salt))
  }
}
module.exports = UserController