var User = require('./usersModel.js');
var jwt = require('jsonwebtoken');
var config = require('../config.js');

module.exports = {
  getUsers (req, res) {
    User.getAllUsersSafe((users) => {
      res.json(users);
    });
  },

  signup (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    console.log('request body is', req.body);
    User.findOne({email}, (err, data) => {
      // If email is taken...
      if (data) {
        console.log('User unavailable:', email);
        return next('Username unavailable');
      } else {
        // Otherwise, create new user
        var newUser = {email, password};
        User.create(newUser, (err, user) => {
          if (err) {
            console.log('Failed to sign up:', email, err);
            return next('Error all the ways');
          } else {
            var token = jwt.sign(user, config.secret, {
              expiresIn: 1 * 60 * 60
            });
            // Send along the token and all the users currently in the system
            User.getAllUsersSafe((users) => {
              res.json({token, users});
            });
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
            // Send along the token and all the users currently in the system
            User.getAllUsersSafe((users) => {
              user.setOnlineStatus(true);
              res.json({token, users});
            });
          } else {
            res.sendStatus(403);
          }
        });
      }
    });
  },

  logout (req, res, next) {
    const email = req.body.email;
    User.findOne({email}, (err, user) => {
      if (!user) {
        res.sendStatus(404);
      } else {
        user.setOnlineStatus(false);
      }
    });
  }
}
