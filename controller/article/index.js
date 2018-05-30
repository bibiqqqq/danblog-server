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
  highlight: code => {
      return hljs.highlightAuto(code).value;
  }
})
class ArticleController {
  /**
   * 获取文章列表
   */
  static async getArticleList (ctx) {
    const { listId } = ctx.params
    const { pageSize = 10 } = ctx.query
    const skip = listId === 1 ? 0 : (listId - 1) * pageSize
    try {
      const list = await Article
        .find({})
        .select({content: 0, __v: 0})
        .limit(+pageSize)
        .skip(skip)
        .sort({createdAt: -1})
        .exec()
      const artLen = await Article
        .find({})
        .count()
      const total = Math.ceil(artLen / pageSize)
      ctx.body = {
        code: 0,
        data: { list, total },
    }
    } catch (e) {
      ctx.body = {
        success: false,
        data: e
      }
    }
  }
  /**
   * 获取文章正文 by id
   */
  static async getArticleDetailById (ctx) {
    const { articleId } = ctx.params
    const data = await Article
      .findOne({ _id: articleId })
      .select({ _id: 0, __v: 0 })
      .catch(e => ctx.throw(500))
    ctx.body = {
      code: 0,
      data: data
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