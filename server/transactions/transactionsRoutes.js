var transactionsController = require('./transactionsController.js');

module.exports = function(app) {
  app.post('/', transactionsController.sendMoney);
};
