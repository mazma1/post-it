import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import crypto from 'crypto';
import models from '../models';
import validateInput from '../../utils/signupValidation';
import sendEmail from '../../utils/sendEmail';

const saltRounds = 7;
const salt = bcrypt.genSaltSync(saltRounds);

export default {
  // Method to signup a user
  signup(req, res) {
    const { errors, valid } = validateInput(req.body);

    if (!valid) {
      res.status(400).send(errors);
    } else {
      models.User.findOne({
        where: {
          username: req.body.username
        },
      })
      .then((existingUsername, err) => {
        if (existingUsername) {
          errors.username = 'Username already exists';
        }
        models.User.findOne({
          where: {
            email: req.body.email
          },
        })
        .then((existingUser, err) => {
          if (existingUser) {
            errors.email = 'Email already exists';
          }

          if (!isEmpty(errors)) {
            res.status(409).send(errors);
          } else {
            const userData = {
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              username: req.body.username,
              mobile: `234${req.body.phone.slice(1)}`,
              email: req.body.email,
              password: bcrypt.hashSync(req.body.password, salt)
            };
            models.User.create(userData)
            .then((user) => {
              const token = jwt.sign({
                data: {
                  id: user.id,
                  username: user.username,
                  email: user.email
                }
              }, process.env.TOKEN_SECRET);
              res.status(201).send({ success: true, message: 'Signup was successful', token });
            })
            .catch(error => res.status(500).send(error.message));
          }
        })
        .catch(err => res.status(500).send(err.message));
      });
    }
  },

  // Method to sign in a user
  signin(req, res) {
    const errors = {};
    if (!req.body.identifier && !req.body.password) {
      errors.identifier = 'This field is required';
      errors.password = 'This field is required';
      res.status(400).send(errors);
    } else if (!req.body.identifier) {
      errors.identifier = 'This field is required';
      res.status(400).send(errors);
    } else if (!req.body.password) {
      errors.password = 'This field is required';
      res.status(400).send(errors);
    } else {
      models.User.findOne({
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
            const token = jwt.sign({
              data: {
                id: user.id,
                username: user.username,
                email: user.email
              }
            }, process.env.TOKEN_SECRET);

            res.status(200).send({
              success: true,
              message: 'User successfully logged in',
              token
            });
          } else {
            errors.identifier = 'Invalid username or password';
            res.status(401).send(errors);
          }
        }
      })
      .catch(err => res.status(500).send(err.message));
    }
  },

  // Method to get the groups a user belongs to
  getUserGroups(req, res) {
    if (req.params.user_id) {
      models.User.findOne({
        where: { id: req.params.user_id },
        attributes: [['id', 'user_id'], 'firstname', 'lastname', 'email'],
        include: [{
          model: models.Group,
          as: 'group',
          attributes: ['id', ['group_name', 'name']],
          through: { attributes: [] }
        }]
      })
      .then((user) => {
        res.status(200).send(user);
      })
      .catch(err => res.status(500).send(err.message));
    }
  },

   // Method to send password reset link
  sendResetPasswordLink(req, res) {
    let error = '';
    if (!req.body.email) {
      error = 'Email field is required';
      res.status(400).send(error);
    } else if (!validator.isEmail(req.body.email)) {
      error = 'Invalid email address';
      res.status(401).send(error);
    } else {
      models.User.findOne({
        where: { email: req.body.email }
      }).then(user => {
        if (user) {
          const resetPasswordHash = crypto.randomBytes(20).toString('hex');
          const resetPasswordExpires = Date.now() + 3600000;

          const emailParams = {
            senderAddress: process.env.ADMIN_EMAIL,
            recepientAddress: user.email,
            subject: 'Reset your Post It Password',
            emailBody: `Hello ${user.firstname} ${user.lastname}, 
            <br><br>You recently made a request to reset your Post It password. 
            Please click the link below to complete the process. 
            <br><br><a href='http://${req.headers.host}/newpassword/${resetPasswordHash}'>Reset now ></a>
            <br><br>----------------------<br>
            The Post It Team`
          };

          models.ForgotPassword.findOne({
            where: { user_id: user.id }
          }).then((userAlreadyRequested) => {
            if (userAlreadyRequested) {
              models.ForgotPassword.update({
                hash: resetPasswordHash,
                expiry_time: Date.now() + 3600000
              }, {
                where: { user_id: user.id }
              }).then(() => {
                // send email
                sendEmail(emailParams);
                res.status(200).send('Email sent');
              }).catch(err => res.status(500).send(err.message));
            } else {
              models.ForgotPassword.create({
                user_id: user.id,
                hash: resetPasswordHash,
                expiry_time: resetPasswordExpires
              })
              .then(() => {
                // send email
                sendEmail(emailParams);
                res.status(200).send('Email sent');
              });
            }
          })
          .catch(err => res.status(500).send(err.message));
        } else {
          res.status(404).send('User does not exist');
        }
      })
      .catch(err => res.status(500).send(err.message));
    }
  },

  // Method to check validity of reset password token
  validateResetPasswordToken(req, res) {
    const token = req.body.token;
    models.ForgotPassword.findOne({
      where: {
        hash: token
      },
    }).then((user) => {
      if (user) {
        if (Date.now() > user.expiry_time) {
          res.status(401).send('Token has expired');
        } else {
          res.status(200).send('Token is valid');
        }
      } else {
        res.status(404).send('Token does not exist');
      }
    }).catch(err => res.status(500).send(err.message));
  },

  updateUserPassword(req, res) {
    const errors = {};
    if (!req.body.password && !req.body.confirm_password) {
      errors.password = 'New password is required';
      errors.confirm_password = 'Confirm new password is required';
      res.status(400).send(errors);
    } else if (!req.body.password) {
      errors.password = 'New password is required';
      res.status(400).send(errors);
    } else if (!req.body.confirm_password) {
      errors.confirm_password = 'Confirm new password is required';
      res.status(400).send(errors);
    } else if (!validator.equals(req.body.password, req.body.confirm_password)) {
      errors.confirm_password = 'Passwords must match';
      res.status(400).send(errors);
    } else {
      const hashedNewPassword = bcrypt.hashSync(req.body.password, salt);
      const token = req.params.token;

      models.ForgotPassword.findOne({
        where: { hash: token }
      }).then((result) => {
        models.User.update(
          { password: hashedNewPassword }, { where: { id: result.user_id } }
        );
        res.status(200).send('Password successfully updated');
      }).catch(err => res.status(500).send(err.message));
    }
  },

  searchForUser(req, res) {
    if (req.body.searchKeyword) {
      models.User.findAll({
        where: {
          $or: [
            { firstname: { $like: `%${req.body.searchKeyword}%` } },
            { lastname: { $like: `%${req.body.searchKeyword}%` } },
            { username: { $like: `%${req.body.searchKeyword}%` } },
            { email: { $like: `%${req.body.searchKeyword}%` } }
          ]
        },
        attributes: ['id', 'firstname', 'lastname', 'username', 'email', 'mobile'],
        include: [{
          model: models.Group,
          as: 'group',
          attributes: ['id', 'group_name'],
          through: { attributes: [] }
        }],
      })
        .then((users) => {
          if (!isEmpty(users)) {
            res.status(200).send({ users });
          }
          res.status(404).send({ error: 'User was not found' });
        })
        .catch((error) => {
          res.status(500).send({ error: error.message });
        });
    } else {
      res.status(401).send({ error: 'A search keyword is required' });
    }
  }
};
