const UserController = require('../controller/user')
module.exports = router => {
  router
    .post('/user/login', UserController.login)
    .post('/user/register', UserController.register)
}