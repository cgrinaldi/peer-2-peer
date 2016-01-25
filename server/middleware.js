var express = require('express');
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var webpack = require('webpack');
var webpackMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('../webpack.config.js');

module.exports = function(app) {
  // Add logging of server requests/responses
  app.use(morgan('dev'));
  // Parse body of request
  app.use(bodyParser.urlencoded({extended:false}));
  app.use(bodyParser.json());

  // Create Express routers
  var usersRouter = express.Router();
  var transactionsRouter = express.Router();

  // Use users router for requests related to adding and getting users
  app.use('/users', usersRouter);
  app.use('/transactions', transactionsRouter);

  // Setup all of the routers
  require('./users/userRoutes.js')(usersRouter);
  require('./transactions/transactionsRoutes.js')(transactionsRouter);
};
