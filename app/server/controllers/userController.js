const User = require('../models').User;

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 7;
const salt = bcrypt.genSaltSync(saltRounds);

module.exports = {

  // Method to signup a user
  signup: (req, res) => {
    if (!req.body.email) {
      res.status(400).send({ success: false, message: 'Email is required.' });
    } else if (!req.body.username) {
      res.status(400).send({ success: false, message: 'Username is required.' });
    } else if (!req.body.password) {
      res.status(400).send({ success: false, message: 'Password is required.' });
    } else if (req.body.username && req.body.email) {
      User.findOne({
        where: {
          username: req.body.username
        },
      })
      .then((user, err) => {
        if (err) throw err;
        if (user) {
          res.status(400).send({ success: false, message: 'Username already exists' });
        } else {
          User.findOne({
            where: {
              email: req.body.email
            },
          })
          .then((user, err) => {
            if (err) throw err;
            if (user) {
              res.status(400).send({ success: false, message: 'User with the email address already exists.' });
            } else {
              const userData = {
                email: req.body.email,
                username: req.body.username,
                password: bcrypt.hashSync(req.body.password, salt)
              };
              User.create(userData)
              .then(user => res.status(201).send({ success: true, message: 'Signup was successful' }))
              .catch(error => res.status(400).send(error));
            }
          });
        }
      });
    }
  },

  // Method to sign in a user
  signin: (req, res) => {
    User.findOne({
      where: {
        username: req.body.username
      },
    })
    .then((user, err) => {
      if (err) throw err;

      if (!user) {
        res.status(401).send({ success: false, message: 'Invalid username or password.' });
      } else if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          // if user is found and password is right, create a token
          const token = jwt.sign({ data: user }, process.env.TOKEN_SECRET, { expiresIn: 1440 });

          // return the information including token as JSON
          res.status(201).send({
            success: true,
            message: 'User successfully logged in.',
            token: token
          });
        } else {
          res.status(401).send({ success: false, message: 'Invalid username or password.' });
        }
      }
    });
  },
};
