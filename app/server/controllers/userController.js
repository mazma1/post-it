const User = require('../models').User;
// const bcrypt = require('bcrypt');

module.exports = {
  signup(req, res) {
    const userData = {
      email: req.body.email,
      username: req.body.username
      // password: bcrypt.hashSync(req.body.password),
    };
    User.create(userData)
      .then(user => res.status(201).send(user))
      .catch(error => res.status(400).send(error));
  },
};
