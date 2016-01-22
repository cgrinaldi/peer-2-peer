var usersController = require('./usersController.js');

module.exports = function(app) {
  app.get('/', usersController.getUsers);
  app.post('/', usersController.addUser);
};
