import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import crypto from 'crypto';
import GoogleAuth from 'google-auth-library';
import models from '../models';
import validateSignup from '../utils/signupValidation';
import sendEmail from '../utils/sendEmail';
import pagination from '../utils/pagination';

const saltRounds = 7;
const salt = bcrypt.genSaltSync(saltRounds);

export default {
  /**
   * Creates a new user
   * Route: POST: /api/v1/users/signup
   *
   * @param {any} req incoming request from the client
   * @param {any} res response sent back to client
   *
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
          const { firstName, lastName, username, email, phoneNumber } = req.body;
          const userData = {
            firstName,
            lastName,
            username,
            email,
            phoneNumber: `234${phoneNumber.slice(1)}`,
            password: bcrypt.hashSync(req.body.password, salt)
          };
          models.User.create(userData)
          .then((user) => {
            const { id } = user;
            const token = jwt.sign({
              data: {
                id,
                firstName,
                lastName,
                username,
                email
              }
            }, process.env.TOKEN_SECRET, { expiresIn: '720m' });
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
   * Route: POST: /api/v1/users/signin
   *
   * @param {any} req incoming request from the client
   * @param {any} res response sent back to client
   *
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
            const { id, firstName, lastName, username, email } = user;
            const token = jwt.sign({
              data: {
                id,
                firstName,
                lastName,
                username,
                email
              }
            }, process.env.TOKEN_SECRET, { expiresIn: '720m' });
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
   * Authenticates and logs a user in using the google API
   * Route: POST: /api/v1/users/googleAuth
   *
   * @param {any} req incoming request from the client
   * @param {any} res response sent back to client
   *
   * @returns {response} response object
   */
  googleSignIn(req, res) {
    let user;
    const idToken = Object.keys(req.body)[0];
    const auth = new GoogleAuth();
    const client = new auth.OAuth2(process.env.CLIENT_ID, '', '');
    client.verifyIdToken(idToken, process.env.CLIENT_ID, (e, login) => {
      const payload = login.getPayload();
      user = {
        firstName: payload.givenName,
        lastName: payload.familyName,
        email: payload.email,
        username: payload.givenName,
        googleId: payload.sub
      };

      models.User.findOne({
        where: {
          $or: [
            { googleId: user.googleId },
            { email: user.email }
          ]
        },
      }).then((user) => {
        if (!user) {
          const { firstName, lastName, username, email, googleId } = req.body;
          const userData = {
            firstName,
            lastName,
            username,
            email,
            phoneNumber: '08098765432',
            password: bcrypt.hashSync(googleId, salt),
            googleId
          };
          return models.User.create(userData).then((googleUser) => {
            const { id } = googleUser;
            const token = jwt.sign({
              data: {
                id,
                firstName,
                lastName,
                username,
                email
              }
            }, process.env.TOKEN_SECRET, { expiresIn: '24h' });
            res.status(201).send({ message: 'Google sign was successful', token });
          }).catch();
        }
        if (user.email) {
          const { id, firstName, lastName, username, email } = user;
          const token = jwt.sign({
            data: {
              id,
              firstName,
              lastName,
              username,
              email
            }
          }, process.env.TOKEN_SECRET, { expiresIn: '24h' });
          res.status(200).send({ message: 'Google sign was successful', token });
        }
      }).catch();
    });
  },

  /**
   * Fetches the groups a user belongs to
   * Route: GET: /api/v1/users/:user_id/groups
   *
   * @param {any} req incoming request from the client
   * @param {any} res response sent back to client
   *
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
          attributes: ['id', ['groupName', 'name']],
          through: { attributes: [] }
        }]
      })
      .then((user) => {
        if (user) {
          res.status(200).send(user);
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
   * Route: POST: /api/v1/users/resetPassword
   *
   * @param {any} req incoming request from the client
   * @param {any} res response sent back to client
   *
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
            emailBody: `Hello ${user.firstName} ${user.lastName},
            <br><br>You recently made a request to reset your Post It password.
            Please click the link below to complete the process.
            <br><br><a href='http://${req.headers.host}/new-password/${resetPasswordHash}'>Reset now ></a>
            <br><br>----------------------<br>
            The Post It Team`
          };

          models.ForgotPassword.findOne({
            where: { userId: user.id }
          }).then((userAlreadyRequested) => {
            if (userAlreadyRequested) {
              models.ForgotPassword.update({
                hash: resetPasswordHash,
                expiryTime: Date.now() + 3600000
              }, {
                where: { userId: user.id }
              })
              .then(() => {
                sendEmail(emailParams);
                res.status(200).send({ message: 'Email sent' });
              })
              .catch(error => res.status(500).send(error.message));
            } else {
              models.ForgotPassword.create({
                userId: user.id,
                hash: resetPasswordHash,
                expiryTime: resetPasswordExpires
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
   * Route: POST: /api/v1/users/newpassword
   *
   * @param {any} req incoming request from the client
   * @param {any} res response sent back to client
   *
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
   * Route: PATCH: /api/v1/users/newpassword
   *
   * @param {any} req incoming request from the client
   * @param {any} res response sent back to client
   *
   * @returns {response} response object
   */
  updateUserPassword(req, res) {
    const errors = {};
    if (!req.body.password && !req.body.confirmPassword) {
      errors.password = 'New password is required';
      errors.confirmPassword = 'Confirm new password is required';
      res.status(400).send(errors);
    } else if (!req.body.password) {
      errors.password = 'New password is required';
      res.status(400).send(errors);
    } else if (!req.body.confirmPassword) {
      errors.confirmPassword = 'Confirm new password is required';
      res.status(400).send(errors);
    } else if (!validator.equals(req.body.password, req.body.confirmPassword)) {
      errors.confirmPassword = 'Passwords must match';
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
              { password: hashedNewPassword }, { where: { id: result.userId } }
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
   * Route: POST: /api/v1/users/search'
   *
   * @param {any} req incoming request from the client
   * @param {any} res response sent back to client
   *
   * @returns {response} response object
   */
  searchForUser(req, res) {
    if (req.query.q) {
      const searchQuery = req.query.q;
      const limit = req.query.limit || 5;
      const offset = req.query.offset || 0;
      models.User.findAndCountAll({
        where: {
          $or: [
            { firstName: { $like: `%${searchQuery}%` } },
            { lastName: { $like: `%${searchQuery}%` } },
            { username: { $like: `%${searchQuery}%` } }
          ]
        },
        attributes: [
          'id', 'firstName', 'lastName', 'username', 'email', 'phoneNumber'
        ],
        include: [{
          model: models.Group,
          as: 'groups',
          required: false,
          attributes: ['id', 'groupName'],
          through: { attributes: [] }
        }],
        distinct: true,
        limit,
        offset
      })
      .then((users) => {
        if (users.count > 0) {
          return res.status(200).send({
            users: users.rows,
            pagination: pagination(users.count, limit, offset)
          });
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
