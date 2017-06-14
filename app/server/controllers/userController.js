const User = require('../models').User;
const Group = require('../models').Group;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 7;
const salt = bcrypt.genSaltSync(saltRounds);

module.exports = {

  signup: (req, res) => {
    if (!req.body.email) {
      res.status(400).send({ message: 'Email is required.' });
    } else if (!req.body.username) {
      res.status(400).send({ message: 'Username is required.' });
    } else if (!req.body.password) {
      res.status(400).send({ message: 'Password is required.' });
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
            token: token,
            user: user
          });
        } else {
          res.status(401).send({ success: false, message: 'Invalid username or password.' });
        }
      }
    });
  },

  group: (req, res) => {
    // res.send(req.decoded); --JSON that contains details of the token owner.
    const id = req.decoded.data.id;
    const groupData = {
      group_name: req.body.group_name,
      user_id: id
    };
    if (!req.body.group_name) {
      res.status(400).send({ status: false, message: 'Group name is required.' });
    } else {
      Group.create(groupData)
        .then(group => res.status(201).send(group))
        .catch(error => res.status(400).send(error));
    }
  }
};
