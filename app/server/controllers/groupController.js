const Group = require('../models').Group;
const Group_member = require('../models').Group_member;
const Message= require('../models').Message;
const User = require('../models').User;

const bcrypt = require('bcrypt');
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
    if (!req.body.username) {
      res.status(400).send({ status: false, message: 'Username is required.' });
    } else {
      User.findOne({
        where: {
          username: req.body.username
        },
      })
      .then((user) => {
        if (user) {
          Group_member.findOne({
            where: {
              user_id: user.id
            },
          })
          .then((member) => {
            if (member) {
              res.status(400).send({ success: false, message: 'User has already been added to group' });
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
              .catch(error => res.status(400).send(error));
            }
          });
        } else {
          res.status(404).send({ success: false, message: 'User does not exist' });
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
      Message.findAll({
        where: {
          group_id: req.params.group_id
        },
      })
      .then((message) => {
        if (message) {
          res.status(200).send({ message });
        } else if (JSON.stringify(message) === '{}') {
          res.status(404).send({ message: 'No message was found for the specified group' });
        }
      });
    }
  }
};
