var express = require('express');
var morgan = require('morgan');

module.exports = function(app) {
  // Add logging of server requests/responses
  app.use(morgan('dev'));

  // Create Express routers
  var usersRouter = express.Router();

  // Use users router for requests related to adding and getting users
  app.use('/api/users', usersRouter);

  // Setup all of the routers
  require('./users/userRoutes.js')(usersRouter);
};
