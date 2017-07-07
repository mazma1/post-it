const User = require('../models').User;

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const isEmpty = require('lodash/isEmpty');

const saltRounds = 7;
const salt = bcrypt.genSaltSync(saltRounds);

module.exports = {

  // Method to signup a user
  signup: (req, res) => {
    function validateInput(data) {
      let errors = {};

      if (!data.firstname) {
        errors.firstname = 'This field is required';
      }
      if (!data.lastname) {
        errors.lastname = 'This field is required';
      }
      if (!data.email) {
        errors.email = 'This field is required';
      } else if (!validator.isEmail(data.email)) {
        errors.email = 'Invalid email';
      }
      if (!data.username) {
        errors.username = 'This field is required';
      }
      if (!data.password) {
        errors.password = 'This field is required';
      }
      if (!data.confirm_password) {
        errors.confirm_password = 'This field is required';
      } else if (!validator.equals(data.password, data.confirm_password)) {
        errors.confirm_password = 'Passwords must match';
      }
      return {
        errors,
        valid: isEmpty(errors)
      };
    }

    const { errors, valid } = validateInput(req.body);

    if (!valid) {
      res.status(400).send(errors);
    } else {
      User.findOne({
        where: {
          username: req.body.username
        },
      })
      .then((user, err) => {
        if (err) throw err;
        if (user) {
          errors.username = 'Username already exists';
        }
        User.findOne({
          where: {
            email: req.body.email
          },
        })
        .then((user, err) => {
          if (err) throw err;
          if (user) {
            errors.email = 'Email already exists';
          }

          if (!isEmpty(errors)) {
            res.status(400).send(errors);
          } else {
            const userData = {
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              username: req.body.username,
              email: req.body.email,
              password: bcrypt.hashSync(req.body.password, salt)
            };
            User.create(userData)
            .then(user => {
              const token = jwt.sign({ data: user }, process.env.TOKEN_SECRET, { expiresIn: 1440 });
              res.status(201).send({ success: true, message: 'Signup was successful', token });
            })
            .catch(error => res.status(400).send(error));
          }
        });
      });
    }
  },

  // Method to sign in a user
  signin: (req, res) => {
    let errors = {};
    if (!req.body.identifier && !req.body.password) {
      errors.identifier = 'This field is required';
      errors.password = 'This field is required';
      res.status(401).send(errors);
    } else if (!req.body.identifier) {
      errors.identifier = 'This field is required';
      res.status(401).send(errors);
    } else if (!req.body.password) {
      errors.password = 'This field is required';
      res.status(401).send(errors);
    } else {
      User.findOne({
        where: {
          $or: [{ username: req.body.identifier }, { email: req.body.identifier }]
        },
      })
      .then((user, err) => {
        if (err) throw err;
        if (!user) {
          errors.identifier = 'Invalid username or password';
          res.status(401).send(errors);
        } else if (user) {
          if (bcrypt.compareSync(req.body.password, user.password)) {
            // if user is found and password is right, create a token
            const token = jwt.sign({ data: user }, process.env.TOKEN_SECRET, { expiresIn: 1440 });

            // return the information including token as JSON
            res.status(201).send({
              success: true,
              message: 'User successfully logged in',
              token
            });
          } else {
            errors.identifier = 'Invalid username or password';
            res.status(401).send(errors);
            // res.status(401).send({ success: false, message: 'Invalid username or password' });
          }
        }
      });
    }
  },
};
