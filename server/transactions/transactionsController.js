var Transaction = require('./transactionsModel.js');
var Model = require('../users/usersModel.js');

module.exports = {
  getTransactions (req, res) {
    Transaction.find({}, (err, transactions) => {
      if (err) {
        return console.log(err);
      }
      res.json(transactions);
    });
  },

  sendMoney (req, res, next) {
    const from = req.body.from;
    const to = req.body.to;
    const amount = +req.body.amount;
    const newTransaction = {from, to, amount};

    Model.transferMoney(from, to, amount, (err) => {
      if (err) {
        console.log('err is', err);
        // res.status(403);
      }
      // If here, money has been successfully transfered between users
      Transaction.create(newTransaction, (e, transaction) => {
        // TODO: If error, need to handle the discrepancy
        if (e || err) {
          console.log(e);
          res.status(403);
          res.send();
        } else {
          console.log('HERE???');
          res.sendStatus(200);
        }
      })
    });
  }
}
