const Group = require('../models').Group;
const Group_member = require('../models').Group_member;
const Message= require('../models').Message;
const User = require('../models').User;

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const saltRounds = 7;
const salt = bcrypt.genSaltSync(saltRounds);

module.exports = {
  // Method to create a new group
  createGroup: (req, res) => {
    // res.send(req.decoded); --JSON that contains details of the token owner.
    const userId = req.decoded.data.id;
    const groupData = {
      group_name: req.body.group_name,
      user_id: userId
    };
    if (!req.body.group_name) {
      res.status(400).send({ success: false, message: 'Group name is required.' });
    } else {
      Group.findOne({
        where: {
          group_name: req.body.group_name
        },
      })
      .then((group) => {
        if (group) {
          res.status(400).send({ success: false, message: 'Group already exists' });
        } else {
          Group.create(groupData)
          .then(group => res.status(201).send({
            success: true,
            message: 'Group was successfully created',
            groupName: group.group_name,
            groupOwner: group.user_id
          }))
          .catch(error => res.status(400).send(error));
        }
      });
    }
  },

  // Method to add user to a group
  addUserToGroup: (req, res) => {
    let error = '';

    if (!req.body.identifier) {
      error = 'Username or email is required';
      res.status(400).send({ error });
    } else {
      User.findOne({
        where: {
          $or: [{ username: req.body.identifier }, { email: req.body.identifier }]
        },
      })
      .then((user) => {
        if (user) {
          Group_member.findOne({
            where: {
              $and: [{ user_id: user.id }, { group_id: req.params.group_id }]
            },
          })
          .then((member) => {
            if (member) {
              error = 'User has already been added to group';
              res.status(400).send({ error });
            } else {
              const details = {
                group_id: req.params.group_id,
                user_id: user.id
              };
              Group_member.create(details)
              .then(groupMember => res.status(201).send({
                success: true,
                message: 'User successfully added to group',
              }))
              .catch(err => res.status(400).send(err));
            }
          });
        } else {
          error = 'User does not exist';
          res.status(404).send({ error });
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
      .then(message => res.status(201).send({
        success: true,
        message: 'Message was successfully sent',
        timeSent: message.createdAt,
        messageBody: message.body
      }))
      .catch(error => res.status(400).send(error));
    }
  },

  // Method to get messages posted to a group
  getGroupMessages: (req, res) => {
    if (req.params.group_id) {
      Message.findAll({ // User is associated to message
        where: { group_id: req.params.group_id },
        attributes: ['group_id', ['id', 'message_id'], ['body', 'message'], ['created_at', 'sent_at']],
        include: [{
          model: User,
          as: 'sent_by',
          attributes: ['username'],
        }]
      })
      // User.findAll({
      //   include: [{
      //     model: Message,
      //     where: { '$group.id$': req.params.group_id }
      //   }]
      // })
      .then((message) => {
        if (message) {
          res.status(200).send(message);
        } else if (JSON.stringify(message) === '{}') {
          res.status(404).send({ message: 'No message was found for the specified group' });
        }
      });
    }
  }
};
