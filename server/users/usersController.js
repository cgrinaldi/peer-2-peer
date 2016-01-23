var User = require('./usersModel.js');
var jwt = require('jsonwebtoken');
var config = require('../config.js');

module.exports = {
  getUsers (req, res) {
    User.find({}, (err, data) => {
      res.json(data);
    });
  },

  signup (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    User.findOne({username}, (err, data) => {
      // If username is taken...
      if (data) {
        console.log('User unavailable:', username);
        return next('Username unavailable');
      } else {
        // Otherwise, create new user
        var newUser = {username, password};
        User.create(newUser, (err, data) => {
          if (err) {
            console.log('Failed to sign up:', username);
            return next('Error');
          } else {
            res.send('User successfully created!');
          }
        });
      }
    });
  },

  signin (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    User.findOne({username}, (err, user) => {
      if (!user) {
        res.json({success: false, message: 'Username or password is incorrect'});
      } else {
        user.comparePasswords(password, (isMatch) => {
          if (isMatch) {
            var token = jwt.sign(user, config.secret, {
              expiresIn: 1 * 60 * 60
            });
            res.json({success: true, user, token});
          } else {
            res.json({success: false, message: 'Username or password is incorrect'});
          }
        });
      }
    });
  }
}
