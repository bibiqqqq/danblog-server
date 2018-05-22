const Article = require('../../models/article')
const marked = require('marked')
const hljs = require('highlight.js')

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false,
  highlight: function (code) {
      return hljs.highlightAuto(code).value;
  }
})
class ArticleController {
  /**
   * 获取文章列表
   */
  static async getArticleList (ctx) {
    const { page = 1, pageSize = 5 } = ctx.query
    const skip = page === 1 ? 0 : (page - 1) * pageSize
    const art = await Article
      .find({})
      .select({content: 0, __v: 0})
      .limit(+pageSize)
      .skip(skip)
      .sort({updateAt: -1})
      .exec()
      .catch(e => ctx.throw(500))
    const artLen = await Article
      .find({})
      .count()
      .catch(e => ctx.throw(500))
    const total = Math.ceil(artLen / pageSize)
    ctx.status = 201
    ctx.body = {
      code: 0,
      data: { art, total },
    }
  }
  /**
   * 添加文章
   */
  static async createNewArticle (ctx) {
    const art = ctx.request.body
    const content = marked(art.content)
    const result = await Article.create({...art, content}).catch(e => ctx.throw(500))
    ctx.body = {
      code: 0,
      message: '添加文章成功'
    }
  }
  /**
   * 修改文章
   */
  static async updateArticle (ctx) {
    const { articleId } = ctx.params
    const art = ctx.request.body
    const result = await Article.findByIdAndUpdate(articleId, { ...art }).catch( e => ctx.throw(500))
    ctx.body = {
      code: 0,
      message: '修改文章成功'
    }
  }
  /**
   * 删除文章
   */
  static async removeArticle (ctx) {
    const { articleId } = ctx.params
    const result = await Article.findByIdAndRemove(articleId).catch( e => ctx.throw(500))
    ctx.body = {
      code: 0,
      message: '删除文章成功'
    }
  }
}
module.exports = ArticleController