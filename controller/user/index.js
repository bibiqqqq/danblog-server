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
    try {
      const isExisted = await User.findOne({ username })
      if (!!isExisted) {
        return ctx.body = {
          success: false,
          err: '用户名已存在'
        }
      }
      const user = await User.create({ username, password: UserController.md5Pwd(password) })
      ctx.body = {
        code: 0,
        message: '注册成功'
      }
    } catch(e) {
      ctx.body = {
        success: false,
        data: e
      }
    }
  }
  /**
   * 登录
   */
  static async login (ctx) {
    const { username, password } = ctx.request.body
    try {
      const user = await User.findOne({ username, password: UserController.md5Pwd(password) })
      const token = jwt.sign({
        data: { username: user.username },
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
      }, secret)
      ctx.cookies.set('token', token)
      ctx.body = {
        code: 0,
        data: {
          token: token
        }
      }
    } catch (e) {
      ctx.body = {
        success: false,
        data: e
      }
    }
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