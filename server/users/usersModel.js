// Model a user in MongoDB
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  isOnline: {
    type: Boolean,
    required: true,
    default: true
  }
});

// Method to compare user provided password with the stored hashed password
UserSchema.methods.comparePasswords = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    callback(isMatch);
  });
};

UserSchema.methods.setOnlineStatus = function(isOnline) {
  this.isOnline = isOnline;
  this.save((err) => {
    if (err) {
      console.log('Error: could not set online status', err);
    }
  });
}

// Prior to saving a user, hash the password
UserSchema.pre('save', function(next) {
  bcrypt.hash(this.password, null, null, (err, hash) => {
    if (err) {
      console.log(err);
    } else if (!this.isModified('password')) {
      // Don't want to re-hash password if it hasn't been modified
      return next();
    } else {
      this.password = hash;
      next();
    }
  });
});

module.exports = mongoose.model('users', UserSchema);
