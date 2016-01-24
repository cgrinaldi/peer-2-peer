var usersController = require('./usersController.js');

module.exports = function(app) {
  app.get('/', usersController.getUsers);
  app.post('/signup', usersController.signup);
  app.post('/signin', usersController.signin);
  app.post('/logout', usersController.logout);
};
