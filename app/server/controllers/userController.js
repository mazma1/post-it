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
    // if (!req.body.email) {
    //   res.status(400).send({ success: false, message: 'Email is required' });
    // } else if (!validator.isEmail(req.body.email)) {
    //   res.status(400).send({ success: false, message: 'Incorrect email syntax' });
    // } else if (!req.body.username) {
    //   res.status(400).send({ success: false, message: 'Username is required' });
    // } else if (!req.body.password) {
    //   res.status(400).send({ success: false, message: 'Password is required' });
    // } else if (req.body.username && req.body.email) {


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

    // res.send(typeof (req.body.username));

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
              .then(user => {
                const token = jwt.sign({ data: user }, process.env.TOKEN_SECRET, { expiresIn: 1440 });
                res.status(201).send({ success: true, message: 'Signup was successful', token });
              })
              .catch(error => res.status(400).send(error));
            }
          });
        }
      });
    }
  },

  // Method to sign in a user
  signin: (req, res) => {
    if (!req.body.username && !req.body.password) {
      res.status(401).send({ success: false, message: 'Enter a valid username and password' });
    } else {
      User.findOne({
        where: {
          username: req.body.username
        },
      })
      .then((user, err) => {
        if (err) throw err;
        if (!user) {
          res.status(401).send({ success: false, message: 'Invalid username or password' });
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
            res.status(401).send({ success: false, message: 'Invalid username or password' });
          }
        }
      });
    }
  },
};
