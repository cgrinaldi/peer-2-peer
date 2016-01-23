var User = require('./usersModel.js');

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
  }
}
