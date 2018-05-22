const ArticleController = require('../controller/article')
module.exports = router => {
  router.get('/article/list', ArticleController.article.getArticleList) // 获取文章列表
        .post('/article/create', ArticleController.article.createNewArticle) // 添加文章
        .post('/article/:articleId/update', ArticleController.article.updateArticle) // 更新某篇文章
        .post('/article/:articleId/remove', ArticleController.article.removeArticle) // 删除某篇文章
}