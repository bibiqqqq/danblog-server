const router = require('koa-router')()
const ArticleController = require('../controller/article')
const UserController = require('../controller/user')
const RepoController = require('../controller/repo')
module.exports = app => {
  /*-----------------------------------article----------------------------------------------- */
  router
    .get('/article/list/:listId', ArticleController.getArticleList) // 获取文章列表
    .get('/article/detail/:articleId', ArticleController.getArticleDetailById) // 根据id获取文章正文
    .post('/article/create', ArticleController.createNewArticle) // 添加文章
    .post('/article/:articleId/update', ArticleController.updateArticle) // 更新某篇文章
    .post('/article/:articleId/delete', ArticleController.removeArticle) // 删除某篇文章

  /*-----------------------------------user----------------------------------------------- */
  router
    .post('/user/login', UserController.login)
    .post('/user/register', UserController.register)

  /*-----------------------------------repo----------------------------------------------- */

  router
    .get('/repo/list', RepoController.getRepoList)
    .post('/repo/create', RepoController.createNewRepo)
    .post('/repo/:repoName/delete', RepoController.deleteRepo)



  app.use(router.routes())
    .use(router.allowedMethods())
}