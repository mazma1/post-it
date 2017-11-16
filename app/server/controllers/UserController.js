import bcrypt from 'bcryptjs';
import validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import crypto from 'crypto';
import models from '../models';
import validateSignup from '../utils/validateInput';
import sendEmail from '../utils/sendEmail';
import paginate from '../utils/paginate';
import generateToken from '../utils/generateToken';
import resetPasswordTemplate from '../utils/resetPasswordTemplate';

const saltRounds = 7;
const salt = bcrypt.genSaltSync(saltRounds);

const UserController = {
  /**
    * Creates a new user
    * Route: POST: /api/v1/users/signup
    *
    * @param {object} req - Incoming request from the client
    * @param {object} res - Response sent back to client
    *
   * @returns {object} Authentication token
   */
  signup(req, res) {
    const { errors, valid } = validateSignup(req.body);
    if (!valid) {
      return res.status(400).send(errors);
    }
    models.User.findOne({
      where: {
        $or: [
          { email: req.body.email },
          { username: req.body.username.toLowerCase() },
        ]
      },
    })
      .then((existingUser) => {
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
            email,
            phoneNumber,
            username: username.toLowerCase(),
            password: bcrypt.hashSync(req.body.password, salt)
          };
          models.User.create(userData)
            .then((user) => {
              const token = generateToken(user);
              res.status(201).send({ message: 'Signup was successful', token });
            })
            .catch(error => res.status(500).send({ error: error.message }));
        }
      })
      .catch(error => res.status(500).send({ error: error.message }));
  },

  /**
   * Authenticates and logs a user in
   * Route: POST: /api/v1/users/signin
   *
   * @param {object} req - Incoming request from the client
   * @param {object} res - Response sent back to client
   *
   * @returns {object} Authentication token
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
              const token = generateToken(user);
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
        .catch(err => res.status(500).send({ error: err.message }));
    }
  },


  /**
    * Checks if a user who wants to sign in via Google is new or returning
    * Route: POST: /api/v1/users/signin
    *
    * @param {object} req - Incoming request from the client
    * @param {object} res - Response sent back to client
    *
    * @returns {object} States if a user is new or returning
    */
  verifyGoogleUser(req, res) {
    const { email } = req.body;
    models.User.findOne({
      where: { email }
    }).then((user) => {
      if (!user) {
        res.status(200).send({ message: 'New user' });
      } else {
        res.status(200).send({ message: 'Returning user' });
      }
    }).catch((error) => {
      res.status(500).send({ error: error.message });
    });
  },


  /**
    * Authenticates and logs a user in using the google API
    * Route: POST: /api/v1/users/google-auth
    *
    * @param {object} req - Incoming request from the client
    * @param {object} res - Response sent back to client
    *
    * @returns {object} Authentication token
    */
  googleSignIn(req, res) {
    const { email } = req.body;
    models.User.findOne({ where: { email } })
      .then((existingUser) => {
        if (existingUser) {
          const token = generateToken(existingUser);
          res.status(200).send({
            message: 'Google authentication was successful',
            token
          });
        }
      }).catch((error) => {
        res.status(500).send({ error: error.message });
      });
  },

  /**
    * Fetches the groups a user belongs to
    * Route: GET: /api/v1/users/:userId/groups
    *
    * @param {object} req - Incoming request from the client
    * @param {object} res - Response sent back to client
    *
    * @returns {object} Groups a user belongs to
    */
  getUserGroups(req, res) {
    models.User.findOne({
      where: { id: req.params.userId },
      attributes: [],
      include: [{
        model: models.Group,
        as: 'groups',
        attributes: ['id', ['groupName', 'name'], ['userId', 'groupOwner']],
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
      .catch(error => res.status(500).send({ error: error.message }));
  },


  /**
    * Sends reset password link on request
    * Route: POST: /api/v1/users/resetPassword
    *
    * @param {object} req - Incoming request from the client
    * @param {object} res - Response sent back to client
    *
    * @returns {object} Message stating that email was successfully sent
    */
  sendResetPasswordLink(req, res) {
    const errors = {};
    if (!req.body.email) {
      errors.email = 'Email field is required';
      return res.status(400).send(errors);
    } if (!validator.isEmail(req.body.email)) {
      errors.email = 'Invalid email address';
      return res.status(401).send(errors);
    }
    models.User.findOne({
      where: { email: req.body.email }
    }).then((user) => {
      if (user) {
        const resetPasswordHash = crypto.randomBytes(20).toString('hex');
        const resetPasswordExpires = Date.now() + 3600000;
        const emailParams = {
          senderAddress: `"Post It ✔" <${process.env.ADMIN_EMAIL}>`,
          recepientAddress: user.email,
          subject: 'Reset your Post It Password',
          emailBody: resetPasswordTemplate(req, user, resetPasswordHash)
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
          .catch(error => res.status(500).send({ error: error.message }));
      } else {
        res.status(404).send({ email: 'User does not exist' });
      }
    })
      .catch(error => res.status(500).send({ error: error.message }));
  },


  /**
    * Checks the validity of reset password token
    * Route: POST: /api/v1/users/new-password
    *
    * @param {object} req - Incoming request from the client
    * @param {object} res - Response sent back to client
    *
    * @returns {object} Message stating if token is valid, expired or missing
    */
  validateResetPasswordToken(req, res) {
    const { token } = req.body;
    if (!token) {
      return res.status(400).send({
        message: 'Reset password token is required'
      });
    }
    models.ForgotPassword.findOne({
      where: {
        hash: token
      },
    }).then((hash) => {
      if (hash) {
        if (Date.now() > hash.expiryTime) {
          res.status(401).send({ message: 'Token has expired' });
        } else {
          res.status(200).send({ message: 'Token is valid' });
        }
      } else {
        res.status(400).send({ message: 'Invalid token' });
      }
    }).catch(error => res.status(500).send({ error: error.message }));
  },


  /**
   * Updates a user's password
   * Route: PATCH: /api/v1/users/new-password
   *
   * @param {object} req - Incoming request from the client
   * @param {object} res - Response sent back to client
   *
   * @returns {object} Message stating that password was successfully updated
   */
  updateUserPassword(req, res) {
    const errors = {};
    if (!req.body.password && !req.body.confirmPassword) {
      errors.password = 'New password is required';
      errors.confirmPassword = 'New password confirmation is required';
      res.status(400).send(errors);
    } else if (!req.body.password) {
      errors.password = 'New password is required';
      res.status(400).send(errors);
    } else if (!req.body.confirmPassword) {
      errors.confirmPassword = 'New password confirmation is required';
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
        }).catch(err => res.status(500).send({ error: err.message }));
      } else {
        res.status(400).send({ message: 'Reset password token is required' });
      }
    }
  },

  /**
   * Search for registered user
   * Route: POST: /api/v1/users/search
   *
   * @param {object} req - Incoming request from the client
   * @param {object} res - Response sent back to client
   *
   * @returns {object} Users that match a search query, given the specified
   * offset and limit
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
              pagination: paginate(users.count, limit, offset)
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

export default UserController;
