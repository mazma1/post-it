import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import isEmpty from 'lodash/isEmpty';
import models from '../models';
import validateInput from '../../client/validations/signupValidation';

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
            models.User.create(userData)
            .then((user) => {
              const token = jwt.sign({ data: { id: user.id, username: user.username } }, process.env.TOKEN_SECRET);
              res.status(201).send({ success: true, message: 'Signup was successful', token });
            })
            .catch(error => res.status(400).send(error.message));
          }
        })
        .catch(err => res.status(400).send(err.message));
      });
    }
  },

  // Method to sign in a user
  signin(req, res) {
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
            const token = jwt.sign({ data: { id: user.id, username: user.username } }, process.env.TOKEN_SECRET);

            res.status(201).send({
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
      .catch(err => res.status(400).send(err.message));
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
        res.status(201).send(user);
      })
      .catch(err => res.status(400).send(err.message));
    }
  }
};
