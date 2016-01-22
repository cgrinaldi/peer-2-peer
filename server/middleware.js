var morgan = require('morgan');

module.exports = function(app) {
  // Add logging of server requests/responses
  app.use(morgan('dev'));
};
