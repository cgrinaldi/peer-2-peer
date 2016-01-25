var transactionsController = require('./transactionsController.js');

module.exports = function(app) {
  app.get('/', transactionsController.getTransactions);
  app.post('/', transactionsController.sendMoney);
};
