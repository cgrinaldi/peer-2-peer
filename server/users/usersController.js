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
    var email = req.body.email;
    var password = req.body.password;
    User.findOne({email}, (err, data) => {
      // If email is taken...
      if (data) {
        console.log('User unavailable:', email);
        return next('Username unavailable');
      } else {
        // Otherwise, create new user
        var newUser = {email, password};
        User.create(newUser, (err, data) => {
          if (err) {
            console.log('Failed to sign up:', email);
            return next('Error');
          } else {
            res.send('User successfully created!');
          }
        });
      }
    });
  },

  signin (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    console.log('request is', req.body);
    User.findOne({email}, (err, user) => {
      console.log('user is', user);
      if (!user) {
        res.sendStatus(403);
      } else {
        user.comparePasswords(password, (isMatch) => {
          if (isMatch) {
            var token = jwt.sign(user, config.secret, {
              expiresIn: 1 * 60 * 60
            });
            res.json({success: true, token});
          } else {
            res.sendStatus(403);
          }
        });
      }
    });
  }
}
