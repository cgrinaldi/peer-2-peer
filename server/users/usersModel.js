// Model a user in MongoDB
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  }
});

// Method to compare user provided password with the stored hashed password
UserSchema.methods.comparePasswords = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    callback(isMatch);
  });
};

// Prior to saving a user, hash the password
UserSchema.pre('save', function(next) {
  bcrypt.hash(this.password, null, null, (err, hash) => {
    if (err) {
      console.log(err);
    } else {
      this.password = hash;
      next();
    }
  });
});

module.exports = mongoose.model('users', UserSchema);
