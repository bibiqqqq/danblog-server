const Repo = require('../../models/repo')
const { getGithubRepo } = require('./getRepo')

class RepoController {
  /**
   * 获取repo列表
   */
  static async getRepoList (ctx) {
    const repo = await Repo
      .find({})
      .select({ _id: 0, __v: 0 })
      .sort({ stars: 1 })
      .catch(e => {ctx.throw(500)})
    ctx.body = {
      code: 0,
      data: repo
    }
  }

  /**
   * 添加repo
   */
  static async createNewRepo (ctx) {
    const { name } = ctx.request.body
    const repo = await getGithubRepo(name)
    const res = await Repo.create(repo).catch(e => ctx.throw(500))
    ctx.body = {
      code: 0,
      message: '添加成功'
    }
  }

  /**
   * 删除repo
   */
  static async deleteRepo (ctx) {
    const { repoName } = ctx.params
    // const repo = await Repo.Remo
  }

}
module.exports = RepoController