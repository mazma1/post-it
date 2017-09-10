import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import crypto from 'crypto';
import models from '../models';
import validateSignup from '../../utils/signupValidation';
import sendEmail from '../../utils/sendEmail';

const saltRounds = 7;
const salt = bcrypt.genSaltSync(saltRounds);

export default {
  /**
   * Creates a new user
   * Route: POST: /api/user/signup
   *
   * @param {any} req
   * @param {any} res
   * @returns {response} response object
   */
  signup(req, res) {
    const { errors, valid } = validateSignup(req.body);

    if (!valid) {
      res.status(400).send(errors);
    } else {
      models.User.findOne({
        where: {
          $or: [{ username: req.body.username }, { email: req.body.email }]
        },
      })
      .then((existingUser, err) => {
        if (existingUser) {
          if (existingUser.username === req.body.username) {
            errors.username = 'Username already exists';
          }
          if (existingUser.email === req.body.email) {
            errors.email = 'Email already exists';
          }
          if (!isEmpty(errors)) {
            res.status(409).send(errors);
          }
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
                firstname: user.firstname,
                lastname: user.lastname,
                username: user.username,
                email: user.email
              }
            }, process.env.TOKEN_SECRET);
            res.status(201).send({ message: 'Signup was successful', token });
          })
          .catch(error => res.status(500).send(error.message));
        }
      })
      .catch(error => res.status(500).send(error.message));
    }
  },

   /**
   * Authenticates and logs a user in
   * Route: POST: /api/user/signin
   *
   * @param {any} req
   * @param {any} res
   * @returns {response} response object
   */
  signin(req, res) {
    const errors = {};
    if (!req.body.identifier || !req.body.password) {
      if (!req.body.identifier) {
        errors.identifier = 'This field is required';
      }
      if (!req.body.password) {
        errors.password = 'This field is required';
      }
      res.status(400).send(errors);
    } else {
      models.User.findOne({
        where: {
          $or: [
            { username: req.body.identifier },
            { email: req.body.identifier }
          ]
        },
      })
      .then((user) => {
        if (!user) {
          errors.identifier = 'Invalid username or password';
          res.status(401).send(errors);
        } else if (user) {
          if (bcrypt.compareSync(req.body.password, user.password)) {
            const token = jwt.sign({
              data: {
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                username: user.username,
                email: user.email
              }
            }, process.env.TOKEN_SECRET);

            res.status(200).send({
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

  /**
   * Fetches the groups a user belongs to
   * Route: GET: /api/user/:user_id/groups
   *
   * @param {any} req
   * @param {any} res
   * @returns {response} response object
   */
  getUserGroups(req, res) {
    if (req.params.user_id && !isNaN(req.params.user_id)) {
      models.User.findOne({
        where: { id: req.params.user_id },
        attributes: [],
        include: [{
          model: models.Group,
          as: 'groups',
          attributes: ['id', ['group_name', 'name']],
          through: { attributes: [] }
        }]
      })
      .then((userGroups) => {
        if (userGroups) {
          res.status(200).send(userGroups);
        } else {
          res.status(404).send({ message: 'User does not exist' });
        }
      })
      .catch(error => res.status(500).send(error.message));
    } else {
      res.status(400).send({ message: 'Invalid user id' });
    }
  },

  /**
   * Sends reset password link on request
   * Route: POST: /api/user/reset_password
   *
   * @param {any} req
   * @param {any} res
   * @returns {response} response object
   */
  sendResetPasswordLink(req, res) {
    const errors = {};
    if (!req.body.email) {
      errors.email = 'Email field is required';
      res.status(400).send(errors);
    } if (!validator.isEmail(req.body.email)) {
      errors.email = 'Invalid email address';
      res.status(401).send(errors);
    } else {
      models.User.findOne({
        where: { email: req.body.email }
      }).then((user) => {
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
              })
              .then(() => {
                sendEmail(emailParams);
                res.status(200).send({ message: 'Email sent' });
              })
              .catch(error => res.status(500).send(error.message));
            } else {
              models.ForgotPassword.create({
                user_id: user.id,
                hash: resetPasswordHash,
                expiry_time: resetPasswordExpires
              })
              .then(() => {
                sendEmail(emailParams);
                res.status(200).send({ message: 'Email sent' });
              });
            }
          })
          .catch(error => res.status(500).send(error.message));
        } else {
          res.status(404).send({ message: 'User does not exist' });
        }
      })
      .catch(error => res.status(500).send(error.message));
    }
  },

  /**
   * Checks the validity of reset password token
   * Route: POST: /api/user/newpassword
   *
   * @param {any} req
   * @param {any} res
   * @returns {response} response object
   */
  validateResetPasswordToken(req, res) {
    const token = req.body.token;
    models.ForgotPassword.findOne({
      where: {
        hash: token
      },
    }).then((hash) => {
      if (hash) {
        if (Date.now() > hash.expiry_time) {
          res.status(401).send({ message: 'Token has expired' });
        } else {
          res.status(200).send({ message: 'Token is valid' });
        }
      } else {
        res.status(400).send({ message: 'Reset password token is required' });
      }
    }).catch(error => res.status(500).send(error.message));
  },

  /**
   * Updates a user's password
   * Route: PATCH: /api/user/newpassword
   *
   * @param {any} req
   * @param {any} res
   * @returns {response} response object
   */
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

      if (token) {
        models.ForgotPassword.findOne({
          where: { hash: token }
        }).then((result) => {
          if (result) {
            models.User.update(
              { password: hashedNewPassword }, { where: { id: result.user_id } }
            );
            res.status(200).send({ message: 'Password successfully updated' });
          } else {
            res.status(404).send({ message: 'Token does not exist' });
          }
        }).catch(err => res.status(500).send(err.message));
      } else {
        res.status(400).send({ message: 'Reset password token is required' });
      }
    }
  },

  /**
   * Search for registered user
   * Route: POST: /api/user/search'
   *
   * @param {any} req
   * @param {any} res
   * @returns {response} response object
   */
  searchForUser(req, res) {
    if (req.query.q) {
      const searchQuery = req.query.q;
      models.User.findAll({
        where: {
          $or: [
            { firstname: { $like: `%${searchQuery}%` } },
            { lastname: { $like: `%${searchQuery}%` } },
            { username: { $like: `%${searchQuery}%` } },
            { email: { $like: `%${searchQuery}%` } }
          ]
        },
        attributes: ['id', 'firstname', 'lastname', 'username', 'email', 'mobile'],
        include: [{
          model: models.Group,
          as: 'groups',
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
      res.status(400).send({ error: 'A search keyword is required' });
    }
  }
};
