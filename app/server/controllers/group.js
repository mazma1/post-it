import includes from 'lodash/includes';
import Nexmo from 'nexmo';
import models from '../models';
import sendEmail from '../../utils/sendEmail';


export default {
  // Method to create a new group
  createGroup(req, res) {
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
      models.Group.findOne({
        where: {
          group_name: req.body.group_name
        },
      })
      .then((group) => {
        if (group) {
          error = 'Group already exists';
          res.status(409).send({ error });
        } else {
          models.Group.create(groupData)
          .then((group) => {
            models.Group_member.create({
              group_id: group.id,
              user_id: userId
            })
            .then(groupMember => res.status(201).send({
              success: true,
              message: 'Group was successfully created and you have been added to it',
              groupName: group.group_name,
              groupOwner: group.user_id
            }))
            .catch(err => res.status(500).send(err));
          })
          .catch(err => res.status(500).send(err));
        }
      })
      .catch(err => res.status(500).send(err));
    }
  },

  // Method to add user to a group
  addUserToGroup(req, res) {
    let error = '';

    if (!req.body.identifier) {
      error = 'Username or email is required';
      res.status(400).send({ error });
    } else {
      models.User.findOne({
        where: {
          $or: [{ username: req.body.identifier }, { email: req.body.identifier }]
        },
      })
      .then((user) => {
        if (user) {
          models.Group_member.findOne({
            where: {
              $and: [{ user_id: user.id }, { group_id: req.params.group_id }]
            },
          })
          .then((member) => {
            if (member) {
              error = 'User has already been added to group';
              res.status(409).send({ error });
            } else {
              const details = {
                group_id: req.params.group_id,
                user_id: user.id
              };
              models.Group_member.create(details)
              .then(groupMember => res.status(201).send({
                success: true,
                message: 'User successfully added to group',
              }))
              .catch(err => res.status(500).send(err));
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
  postMessageToGroup(req, res) {
    if (!req.body.message) {
      res.status(400).send({ error: 'Message is required.' });
    } else {
      const userId = req.decoded.data.id;
      const userEmail = req.decoded.data.email;
      const messageDetail = {
        body: req.body.message,
        group_id: req.params.group_id,
        user_id: userId,
        priority: req.body.priority,
        read_by: req.body.read_by
      };
      models.Message.create(messageDetail)
      .then((message) => {
        res.status(201).send({
          success: true,
          message: 'Message was successfully sent',
          timeSent: message.createdAt,
          messageBody: message.body
        });
        if (req.body.priority === 'urgent' || req.body.priority === 'critical') {
          // get users email and send email
          models.Group.findOne({
            where: { id: messageDetail.group_id },
            attributes: ['group_name'],
            include: [{
              model: models.User,
              as: 'members',
              attributes: ['email', 'mobile'],
              through: { attributes: [] }
            }]
          }).then((members) => {
            const priority = messageDetail.priority;
            const uppercasePriority = priority.toUpperCase();
            members.members.map((member) => {
              const emailParams = {
                senderAddress: member.email,
                recepientAddress: userEmail,
                groupName: members.group_name,
                subject: `${uppercasePriority} message in ${members.group_name}`,
                emailBody: messageDetail.body
              };
              sendEmail(emailParams);

              // get users number and send sms
              if (req.body.priority === 'critical') {
                const nexmo = new Nexmo({
                  apiKey: process.env.NEXMO_KEY,
                  apiSecret: process.env.NEXMO_SECRET
                });

                const from = 'Post It';
                const to = member.mobile;
                const text = `${uppercasePriority} message in ${members.group_name}\n\n${messageDetail.body}`;

                nexmo.message.sendSms(from, to, text);
              }
            });
          });
        }
      })
      .catch(error => res.status(500).send(error.message));
    }
  },

  // Method to get messages posted to a group
  getGroupMessages(req, res) {
    if (req.params.group_id) {
      models.Message.findAll({ // User is associated to message
        where: { group_id: req.params.group_id },
        attributes: ['group_id', ['id', 'message_id'], ['body', 'message'], 'priority', 'read_by', ['created_at', 'sent_at']],
        include: [{
          model: models.User,
          as: 'sent_by',
          attributes: ['username'],
        }]
      })
      .then((message) => {
        if (message) {
          res.status(200).send(message);
        }
        res.status(404).send({ message: 'No message was found for the specified group' });
      })
      .catch(error => res.status(500).send(error));
    }
  },

  // Method that updates users that have read a message
  updateMessageReadStatus(req, res) {
    const username = req.body.username,
      readBy = req.body.read_by,
      messageId = req.body.message_id,
      updatedReadBy = `${readBy},${username}`;

    if (!includes(readBy, username)) {
      models.Message.update({
        read_by: updatedReadBy,
      }, {
        where: { id: messageId }
      })
      .then((update) => {
        res.status(201).send('Message read status updated successfully');
      })
      .catch(error => res.status(500).send(error.message));
    }
    res.status(200).send('User has read message');
  },

  // Method to get the groups a user belongs to
  getGroupMembers(req, res) {
    if (req.params.group_id) {
      models.Group.findOne({
        where: { id: req.params.group_id },
        attributes: ['group_name'],
        include: [{
          model: models.User,
          as: 'members',
          attributes: ['id', 'firstname', 'lastname', 'username', 'email'],
          through: { attributes: [] }
        }]
      })
      .then((group) => {
        res.status(200).send(group);
      })
      .catch(error => res.status(500).send(error));
    }
  }
};
