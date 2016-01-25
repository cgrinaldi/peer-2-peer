var Transaction = require('./transactionsModel.js');

module.exports = {
  sendMoney (req, res, next) {
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
