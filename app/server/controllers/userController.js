const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const crypto = require('crypto');
const User = require('../models').User;
const Group = require('../models').Group;
const Group_member = require('../models').Group_member;
const ForgotPassword = require('../models').ForgotPassword;

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
      const errors = {};

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
      if (!data.phone) {
        errors.phone = 'This field is required';
      } else if (data.phone.length !== 11) {
        errors.phone = 'Phone number must be 11 digits';
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
              mobile: `234${req.body.phone.slice(1)}`,
              email: req.body.email,
              password: bcrypt.hashSync(req.body.password, salt)
            };
            User.create(userData)
            .then(user => {
              const token = jwt.sign({ data: user }, process.env.TOKEN_SECRET);
              res.status(201).send({ success: true, message: 'Signup was successful', token });
            })
            .catch(error => res.status(400).send(error.message));
          }
        });
      });
    }
  },

  // Method to sign in a user
  signin: (req, res) => {
    const errors = {};
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
            const token = jwt.sign({ data: user }, process.env.TOKEN_SECRET);

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

  // Method to get the groups a user belongs to
  getUserGroups: (req, res) => {
    if (req.params.user_id) {
      User.findOne({
        where: { id: req.params.user_id },
        attributes: [['id', 'user_id'], 'firstname', 'lastname', 'email'],
        include: [{
          model: Group,
          as: 'group',
          attributes: ['id', ['group_name', 'name']],
          through: { attributes: [] }
        }]
      })
      // Group.findAll({
      //   include: [{
      //     model: User,
      //     as: 'member',
      //     where: { '$member.id$': req.params.user_id }
      //   }]
      // })
      .then((user) => {
        res.status(201).send(user);
      });
    }
  },

   // Method to send password reset link
  sendResetPasswordLink: (req, res) => {
    let error = '';
    if (!req.body.email) {
      error = 'Email field is required';
      res.status(401).send(error);
    } else if (!validator.isEmail(req.body.email)) {
      error = 'Invalid email address';
      res.status(401).send(error);
    } else {
      User.findOne({
        where: { email: req.body.email }
      }).then(user => {
        if (user) {
          const resetPasswordHash = crypto.randomBytes(20).toString('hex');
          const resetPasswordExpires = Date.now() + 3600000;
          const transporter = nodemailer.createTransport(smtpTransport({
            service: 'gmail',
            port: 465,
            auth: {
              user: 'mazi.mary.o@gmail.com',
              pass: process.env.EMAIL_PASSWORD
            }
          }));
          const mailOptions = {
            from: 'mazi.mary.o@gmail.com',
            to: user.email,
            subject: 'Reset your Post It Password',
            html: `Hello ${user.firstname} ${user.lastname}, 
            <br><br>You recently made a request to reset your Post It password. 
            Please click the link below to complete the process. 
            <br><br><a href='http://${req.headers.host}/newpassword/${resetPasswordHash}'>Reset now ></a>
            <br><br>----------------------<br>
            The Post It Team`
          };
          ForgotPassword.findOne({
            where: { user_id: user.id }
          }).then((userAlreadyRequested) => {
            if (userAlreadyRequested) {
              ForgotPassword.update({
                hash: resetPasswordHash,
                expiry_time: Date.now() + 3600000
              }, {
                where: { user_id: user.id }
              }).then(() => {
                // send email
                transporter.sendMail(mailOptions, (err, info) => {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log(`Email sent:${info.response}`);
                  }
                });
                res.status(200).send('Email sent');
              }).catch(err => res.status(400).send(err.message));
            } else {
              ForgotPassword.create({
                user_id: user.id,
                hash: resetPasswordHash,
                expiry_time: resetPasswordExpires
              })
              .then(() => {
                // send email
                transporter.sendMail(mailOptions, (err, info) => {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log(`Email sent:${info.response}`);
                  }
                });
                res.status(200).send('Email sent');
              });
            }
          })
          .catch(err => res.status(400).send(err.message));
        } else {
          res.status(404).send('User does not exist');
        }
      })
      .catch(err => res.status(400).send(err.message));
    }
  },

  // Method to check validity of reset password token
  validateResetPasswordToken: (req, res) => {
    const token = req.body.token;
    ForgotPassword.findOne({
      where: {
        hash: token
      },
    }).then((user) => {
      if (user) {
        if (Date.now() > user.expiry_time) {
          res.status(400).send('Token has expired');
        } else {
          res.status(200).send('Token is valid');
        }
      } else {
        res.status(404).send('Token does not exist');
      }
    }).catch(err => res.status(400).send(err.message));
  },

  updateUserPassword: (req, res) => {
    const errors = {};
    if (!req.body.password && !req.body.confirm_password) {
      errors.password = 'New password is required';
      errors.confirm_password = 'Confirm new password is required';
      res.status(401).send(errors);
    } else if (!req.body.password) {
      errors.password = 'New password is required';
      res.status(401).send(errors);
    } else if (!req.body.confirm_password) {
      errors.confirm_password = 'Confirm new password is required';
      res.status(401).send(errors);
    } else if (!validator.equals(req.body.password, req.body.confirm_password)) {
      errors.confirm_password = 'Passwords must match';
      res.status(401).send(errors);
    } else {
      const hashedNewPassword = bcrypt.hashSync(req.body.password, salt);
      const token = req.params.token;

      ForgotPassword.findOne({
        where: { hash: token }
      }).then((result) => {
        User.update(
          { password: hashedNewPassword }, { where: { id: result.user_id } }
        );
        res.status(200).send('Password successfully updated');
      }).catch(err => res.status(400).send(err.message));
    }
  }
};
