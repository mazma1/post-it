import Nexmo from 'nexmo';
import models from '../models';
import sendEmail from '../../utils/sendEmail';


export default {
  /**
   * Creates a new group
   * Route: POST: /api/v1/groups
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
   * Route: POST: /api/v1/groups/:group_id/user
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
          models.GroupMember.findOne({
            where: {
              $and: [{ userId: user.id }, { groupId: req.params.group_id }]
            },
          })
          .then((member) => {
            if (member) {
              error = 'User has already been added to group';
              res.status(409).send({ error });
            } else {
              const details = {
                groupId: req.params.group_id,
                userId: user.id
              };
              models.GroupMember.create(details)
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
   * Route: POST: /api/v1/groups/:group_id/message
   *
   * @param {any} req
   * @param {any} res
   * @returns {response} response object
   */
  postMessageToGroup(req, res) {
    const userId = req.decoded.data.id;
    const userEmail = req.decoded.data.email;
    const groupId = req.params.group_id;
    if (isNaN(req.params.group_id)) {
      return res.status(400).send({ error: 'Invalid group id' });
    }
    if (!req.body.message) {
      return res.status(400).send({ error: 'Message is required' });
    }
    models.Group.findOne({
      where: { id: groupId }
    })
    .then((group) => {
      if (!group) {
        return res.status(404).send({ error: 'Group does not exist' });
      }
      if (group) {
        models.GroupMember.findOne({
          where: {
            $and: [{ userId }, { groupId }]
          },
        })
        .then((member) => {
          if (!member) {
            return res.status(401).send({
              error: 'You don\'t belong to this group'
            });
          }
          const { priority } = req.body;
          const messageDetail = {
            userId,
            priority,
            readBy: req.decoded.data.username,
            body: req.body.message,
            groupId: req.params.group_id,
            isArchived: ['']
          };
          models.Message.create(messageDetail)
          .then((message) => {
            res.status(201).send({
              message: 'Message was successfully sent',
              timeSent: message.createdAt,
              messageBody: message.body
            });
            if (req.body.priority === 'urgent' || req.body.priority === 'critical') {
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
          })
          .catch(err => res.status(500).send(err.message));
        })
        .catch(err => res.status(500).send(err.message));
      }
    })
    .catch(err => res.status(500).send(err.message));
  },

  /**
   * Get messages posted to a group
   * Route: GET: /api/v1/groups/:group_id/messages
   *
   * @param {any} req
   * @param {any} res
   * @returns {response} response object
   */
  getGroupMessages(req, res) {
    if (req.params.group_id && !isNaN(req.params.group_id)) {
      models.Message.findAll({ // User is associated to message
        where: { groupId: req.params.group_id },
        attributes: [
          'id',
          ['groupId', 'group'],
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
          res.status(404).send({
            message: 'No message was found for the specified group'
          });
        }
      })
      .catch(error => res.status(500).send(error.message));
    } else {
      res.status(400).send({ message: 'Invalid group id' });
    }
  },

   /**
   * Get the groups a user belongs to
   * Route: GET: /api/v1/groups/:group_id/members
   *
   * @param {any} req
   * @param {any} res
   * @returns {response} response object
   */
  getGroupMembers(req, res) {
    if (req.params.group_id && !isNaN(req.params.group_id)) {
      models.Group.findOne({
        where: { id: req.params.group_id },
        attributes: [],
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
    } else {
      res.status(400).send({ message: 'Invalid group id' });
    }
  }
};
