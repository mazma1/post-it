const User = require('../models').User;
const Group = require('../models').Group;
const Group_member = require('../models').Group_member;
const Message = require('../models').Message;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 7;
const salt = bcrypt.genSaltSync(saltRounds);

module.exports = {

  // Method to signup a user
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
            token,
            user: user
          });
        } else {
          res.status(401).send({ success: false, message: 'Invalid username or password.' });
        }
      }
    });
  },

  // Method to create a new group
  group: (req, res) => {
    // res.send(req.decoded); --JSON that contains details of the token owner.
    const userId = req.decoded.data.id;
    const groupData = {
      group_name: req.body.group_name,
      user_id: userId
    };
    if (!req.body.group_name) {
      res.status(400).send({ status: false, message: 'Group name is required.' });
    } else {
      Group.create(groupData)
        .then(group => res.status(201).send(group))
        .catch(error => res.status(400).send(error));
    }
  },

  // Method to add user to a group
  addUserToGroup: (req, res) => {
    if (!req.body.username) {
      res.send({ status: false, message: 'Username is required.' });
    } else {
      User.findOne({
        where: {
          username: req.body.username
        },
      })
      .then((user) => {
        if (user) {
          const details = {
            group_id: req.params.group_id,
            user_id: user.id
          };
          Group_member.create(details)
          .then(group_member => res.status(201).send(group_member))
          .catch(error => res.status(400).send(error));
          // res.send(details);
        } else {
          res.status(404).send({ status: false, message: 'User does not exist' });
        }
      });
    }
  },

  // Method to post message to a group
  postMessageToGroup: (req, res) => {
    if (!req.body.message) {
      res.send({ status: false, message: 'Message is required.' });
    } else {
      const userId = req.decoded.data.id;
      const messageDetail = {
        body: req.body.message,
        group_id: req.params.group_id,
        user_id: userId
      };
      Message.create(messageDetail)
      .then(message => res.status(201).send(message))
      .catch(error => res.status(400).send(error));
    }
  },

  // Method to get messages posted to a group
  getGroupMessages: (req, res) => {
    if (req.params.group_id) {
      Message.findAll({
        where: {
          group_id: req.params.group_id
        },
      })
      .then((message) => {
        if (message) {
          res.status(200).send({ data: message });
        } else if (message.data.length === 0) {
          res.status(404).send({ message: 'No message was found for the specified group' });
        }
      });
    }
  }

};
