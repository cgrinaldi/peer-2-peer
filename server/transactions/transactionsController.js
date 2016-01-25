var Transaction = require('./transactionsModel.js');

module.exports = {
  getTransactions (req, res) {
    Transaction.find({}, (err, transactions) => {
      if (err) {
        return console.log(err);
      }
      res.json(transactions);
    });
  },

  sendMoney (req, res) {
    const newTransaction = {
      from: req.body.from,
      to: req.body.to,
      amount: req.body.amount
    };
    Transaction.create(newTransaction, (err, transaction) => {
      if (err) {
        return console.log(err);
      }
      res.json(transaction);
    });
  }
}
