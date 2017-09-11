import includes from 'lodash/includes';
import Nexmo from 'nexmo';
import models from '../models';
import sendEmail from '../../utils/sendEmail';
import validateGroupMember from '../../utils/validateGroupMember';


export default {
  /**
   * Creates a new group
   * Route: POST: /api/group
   *
   * @param {any} req
   * @param {any} res
   * @returns {response} response object
   */
  createGroup(req, res) {
    let error = '';
    const userId = req.decoded.data.id;
    const { groupName } = req.body;
    const groupData = {
      groupName,
      userId
    };
    if (!groupName) {
      error = 'Group name is required';
      res.status(400).send({ error });
    } else {
      models.Group.findOne({
        where: { groupName },
      })
      .then((existingGroup) => {
        if (existingGroup) {
          error = 'Group already exists';
          res.status(409).send({ error });
        } else {
          models.Group.create(groupData)
          .then((newGroup) => {
            models.GroupMember.create({
              groupId: newGroup.id,
              userId
            })
            .then(groupMember => res.status(201).send({
              message: 'Group was successfully created and you have been added to it',
              groupName: newGroup.groupName,
              groupOwner: newGroup.userId
            }))
            .catch(err => res.status(500).send(err.message));
          })
          .catch(err => res.status(500).send(err.message));
        }
      })
      .catch(err => res.status(500).send(err.message));
    }
  },

  /**
   * Adds a user to a group
   * Route: POST: /api/group
   *
   * @param {any} req
   * @param {any} res
   * @returns {response} response object
   */
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

  /**
   * Post message to a group
   * Route: POST: /api/group/:group_id/message
   *
   * @param {any} req
   * @param {any} res
   * @returns {response} response object
   */
  postMessageToGroup(req, res) {
    const userId = req.decoded.data.id;
    const { username } = req.decoded.data;
    if (isNaN(req.params.group_id)) {
      return res.status(400).send({ error: 'Invalid group id' });
    }
    if (!req.body.message) {
      return res.status(400).send({ error: 'Message is required' });
    }
    models.Group.findOne({
      where: { id: req.params.group_id }
    })
      .then((group) => {
        if (!group) {
          return res.status(404).send({ error: 'Group does not exist' });
        }
        if (group) {
          const ghghgh = validateGroupMember({ res, userId, group, GroupMember: models.GroupMember });
          if (!ghghgh) {
            return res.status(401).send({ error: 'You don\'t belong to this group' });
          }
          // if (ghghgh) {}
          const userEmail = req.decoded.data.email;
          const { message, priority } = req.body;
          const messageDetail = {
            userId,
            priority,
            body: message,
            groupId: req.params.group_id,
            readBy: username,
            isArchived: ['']
          };
          models.Message.create(messageDetail)
            .then((sentMessage) => {
              res.status(201).send({
                message: 'Message was successfully sent',
                timeSent: sentMessage.createdAt,
                messageBody: sentMessage.body
              });
              if (priority === 'urgent' || priority === 'critical') {
                // get users email and send email
                models.Group.findOne({
                  where: { id: messageDetail.groupId },
                  attributes: ['groupName'],
                  include: [{
                    model: models.User,
                    as: 'members',
                    attributes: ['email', 'phoneNumber'],
                    through: { attributes: [] }
                  }]
                }).then((members) => {
                  const uppercasePriority = priority.toUpperCase();
                  members.members.map((member) => {
                    const emailParams = {
                      senderAddress: member.email,
                      recepientAddress: userEmail,
                      groupName: members.groupName,
                      subject: `${uppercasePriority} message in ${members.groupName}`,
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
                })
                .catch(err => res.status(500).send(err.message));
              }
            });
        }
      }).catch();
  },

  /**
   * Get messages posted to a group
   * Route: GET: /api/group/:group_id/messages
   *
   * @param {any} req
   * @param {any} res
   * @returns {response} response object
   */
  getGroupMessages(req, res) {
    if (req.params.group_id) {
      models.Message.findAll({ // User is associated to message
        where: { groupId: req.params.group_id },
        attributes: [
          'id',
          ['body', 'message'],
          'priority',
          'readBy',
          'isArchived',
          ['createdAt', 'sentAt']
        ],
        include: [{
          model: models.User,
          as: 'sentBy',
          attributes: ['username'],
        }],
        order: [
          ['createdAt', 'DESC'],
        ]
      })
      .then((messages) => {
        if (messages) {
          res.status(200).send({ messages });
        } else {
          res.status(404).send({ message: 'No message was found for the specified group' });
        }
      })
      .catch(error => res.status(500).send(error));
    }
  },

   /**
   * Updates a user that have read a message
   * Route: PATCH: /api/group/message/read
   *
   * @param {any} req
   * @param {any} res
   * @returns {response} response object
   */
  updateMessageReadStatus(req, res) {
    const username = req.body.username,
      readBy = req.body.read_by,
      messageId = req.body.message_id,
      updatedReadBy = `${readBy},${username}`;

    if (!includes(readBy, username)) {
      models.Message.update({
        readBy: updatedReadBy,
      }, {
        where: { id: messageId }
      })
      .then((update) => {
        res.status(201).send({
          message: 'Message read status updated successfully'
        });
      })
      .catch(error => res.status(500).send(error.message));
    }
    res.status(200).send('User has read message');
  },

   /**
   * Get the groups a user belongs to
   * Route: GET: /api/group/:group_id/members
   *
   * @param {any} req
   * @param {any} res
   * @returns {response} response object
   */
  getGroupMembers(req, res) {
    if (req.params.group_id) {
      models.Group.findOne({
        where: { id: req.params.group_id },
        attributes: ['groupName'],
        include: [{
          model: models.User,
          as: 'members',
          attributes: ['id', 'firstName', 'lastName', 'username', 'email'],
          through: { attributes: [] }
        }]
      })
      .then((group) => {
        if (group) {
          res.status(200).send(group);
        } else {
          res.status(404).send({ message: 'Group does not exist' });
        }
      })
      .catch(error => res.status(500).send(error.message));
    }
  },

  /**
   * Archives a given message
   * Route: PATCH: /api/group/:message_id/archive
   *
   * @param {any} req
   * @param {any} res
   * @returns {response} response object
   */
  archiveMessage(req, res) {
    models.Message.findOne({
      where: {
        id: req.params.message_id
      }
    })
    .then((message) => {
      const username = req.decoded.data.username;
      message.isArchived.push(username);
      message.update({ isArchived: message.isArchived });
      res.status(200).send(message);
    })
    .catch(error => res.status(500).send(error.message));
  }
};
