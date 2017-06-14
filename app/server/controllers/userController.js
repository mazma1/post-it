const User = require('../models').User;
const bcrypt = require('bcrypt');

const saltRounds = 7;
const salt = bcrypt.genSaltSync(saltRounds);

module.exports = {
  signup(req, res) {
    if (req.body.email === '') {
      res.json({
        staus: false,
        message: 'Email is required.'
      });
    }
    else {
      const userData = {
        email: req.body.email,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, salt)
      };
      User.create(userData)
        .then(user => res.status(201).send(user))
        .catch(error => res.status(400).send(error));
    }
  }
};
