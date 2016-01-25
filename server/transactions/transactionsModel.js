// Model a transaction in MongoDB
var mongoose = require('mongoose');

var TransactionSchema = new mongoose.Schema({
  from: {
    type: String,
    required: true
  },

  to: {
    type: String,
    required: true
  },

  amount: {
    type: Number,
    required: true
  },

  timestamp: {
    type: Date,
    required: true,
    default: Date.now()
  }
});

module.exports = mongoose.model('transactions', TransactionSchema);
