const User = require('../models').User;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 7;
const salt = bcrypt.genSaltSync(saltRounds);
const secret = 'qWgdh*ujh7778Qwee';

module.exports = {

  signup: (req, res) => {
    if (!req.body.email) {
      res.send({ message: 'Email is required.' });
    } else if (!req.body.username) {
      res.send({ message: 'Username is required.' });
    } else if (!req.body.password) {
      res.send({ message: 'Password is required.' });
    } else {
      const userData = {
        email: req.body.email,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, salt)
      };
      User.create(userData)
      .then(user => res.status(201).send(user))
      .catch(error => res.status(400).send(error));
    }
  },

  login: (req, res) => {
    User.findOne({
      where: {
        username: req.body.username
      },
    })
    .then((user, err) => {
      if (err) throw err;

      if (!user) {
        res.json({ success: false, message: 'Invalid username or password.' });
      } else if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) { 
          // if user is found and password is right, create a token
          const token = jwt.sign({ data: user }, secret, { expiresIn: 1440 });

          // return the information including token as JSON
          res.json({
            success: true,
            message: 'User successfully logged in.',
            token: token,
            user: user
          });
        } else {
          res.json({ success: false, message: 'Invalid username or password.' });
        }
      }
    });
  }
};
