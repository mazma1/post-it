const Group = require('../models').Group;
const Group_member = require('../models').Group_member;
const Message = require('../models').Message;
const User = require('../models').User;
const includes = require('lodash/includes');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const saltRounds = 7;
const salt = bcrypt.genSaltSync(saltRounds);

module.exports = {
  // Method to create a new group
  createGroup: (req, res) => {
    let error = '';
    // res.send(req.decoded); --JSON that contains details of the token owner.
    const userId = req.decoded.data.id;
    const groupData = {
      group_name: req.body.group_name,
      user_id: userId
    };
    if (!req.body.group_name) {
      error = 'Group name is required';
      res.status(400).send({ error });
    } else {
      Group.findOne({
        where: {
          group_name: req.body.group_name
        },
      })
      .then((group) => {
        if (group) {
          error = 'Group already exists';
          res.status(400).send({ error });
        } else {
          Group.create(groupData)
          .then(group => {
            Group_member.create({
              group_id: group.id,
              user_id: userId
            })
            .then(groupMember => res.status(201).send({
              success: true,
              message: 'Group was successfully created and you have been added to it',
              groupName: group.group_name,
              groupOwner: group.user_id
            }))
            .catch(err => res.status(400).send(err));
          })
          .catch(err => res.status(400).send(err));
        }
      })
      .catch(err => res.status(400).send(err));
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
        user_id: userId,
        priority: req.body.priority,
        read_by: req.body.read_by
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
        attributes: ['group_id', ['id', 'message_id'], ['body', 'message'], 'priority', 'read_by', ['created_at', 'sent_at']],
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
      })
      .catch(error => res.status(400).send(error));
    }
  },

  // Method that updates users that have read a message
  updateMessageReadStatus: (req, res) => {
    const username = req.body.username,
      readBy = req.body.read_by,
      messageId = req.body.message_id,
      updatedReadBy = `${readBy},${username}`;

    if (!includes(readBy, username)) {
      Message.update({
        read_by: updatedReadBy,
      }, {
        where: { id: messageId }
      })
      .then((update) => {
        res.status(201).send('Message read status updated successfully');
      })
      .catch(error => res.status(400).send(error.message));
    }
  },

  // Method to get the groups a user belongs to
  getGroupMembers: (req, res) => {
    if (req.params.group_id) {
      Group.findOne({
        where: { id: req.params.group_id },
        attributes: ['group_name'],
        include: [{
          model: User,
          as: 'members',
          attributes: ['id', 'firstname', 'lastname', 'username', 'email'],
          through: { attributes: [] }
        }]
      })
      .then((group) => {
        res.status(201).send(group);
      })
      .catch(error => res.status(400).send(error));
    }
  }
};
