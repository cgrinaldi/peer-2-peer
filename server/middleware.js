var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

module.exports = function(app) {
  // Add logging of server requests/responses
  app.use(morgan('dev'));
  // Parse body of request
  app.use(bodyParser.urlencoded({extended:false}));

  // Create Express routers
  var usersRouter = express.Router();

  // Use users router for requests related to adding and getting users
  app.use('/users', usersRouter);

  // Setup all of the routers
  require('./users/userRoutes.js')(usersRouter);
};
