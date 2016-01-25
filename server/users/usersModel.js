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
  },

  balance: {
    type: Number,
    required: true,
    default: 50
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

// Can call this to get a list of all of the users without
// any sensitive info, like id or password
UserSchema.statics.getAllUsersSafe = function(cb) {
  this.find({}, (err, users) => {
    var cleanedUsers = [];
    users.forEach((user) => {
      const cleanedUser = {
        email: user.email,
        isOnline: user.isOnline,
        balance: user.balance
      };
      cleanedUsers.push(cleanedUser);
    });
    cb(cleanedUsers);
  });
}

// TODO: Research a way to do the find and update in one go
UserSchema.statics.transferMoney = function(from, to, amount, cb) {
  const userModel = this;
  userModel.findOne({email: from}, (err, fromUser) => {
    if (fromUser.balance < amount) {
      console.log('balance not large enough!');
      cb(true)
      return;
    }

    userModel.findOne({email: to}, (err, toUser) => {
      const newToBalance = toUser.balance + amount;
      const newFromBalance = fromUser.balance - amount;
      userModel.update({email: to}, {balance: newToBalance}, (err) => {
        if (err) {
          return console.log(err);
        }
        userModel.update({email: from}, {balance: newFromBalance}, (err) => {
          if (err) {
            return console.log(err);
          }
          cb();
        });
      });
    });
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
