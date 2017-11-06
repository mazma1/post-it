import models from '../models';
import sendSms from '../utils/sendSms';
import sendEmail from '../utils/sendEmail';
import customSort from '../utils/customSort';

export default {
  /**
   * Creates a new group
   * Route: POST: /api/v1/groups
   *
   * @param {any} req incoming request from the client
   * @param {any} res response sent back to client
   *
   * @returns {response} response object
   */
  createGroup(req, res) {
    let error = '';
    const userId = req.decoded.data.id;
    const groupName = req.body.groupName.toLowerCase();
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
              groupId: newGroup.id,
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
   * @param {any} req incoming request from the client
   * @param {any} res response sent back to client
   *
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
   * @param {any} req incoming request from the client
   * @param {any} res response sent back to client
   *
   * @returns {response} response object
   */
  postMessageToGroup(req, res) {
    const userId = req.decoded.data.id;
    const { username } = req.decoded.data;
    if (!req.body.message) {
      return res.status(400).send({ error: 'Message is required' });
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
        const { id, isArchived, readBy } = message;
        res.status(201).send({
          id,
          readBy,
          isArchived,
          group: message.groupId,
          message: message.body,
          priority: message.priority,
          timeSent: message.createdAt,
          sentBy: { username: req.decoded.data.username }
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
            return members.members.map((member) => {
              const emailParams = {
                senderAddress: '"Post It ✔" <noreply.swiftpost@gmail.com>',
                recepientAddress: member.email,
                groupName: members.groupName,
                subject: `Post It: ${uppercasePriority} message in ${members.groupName}`,
                emailBody: `From <b>@${username}</b>: <br><br>
                            <i>${messageDetail.body}</i> <br><br>
                            <a href='http://${req.headers.host}/message-board/${messageDetail.groupId}'>Click here</a>
                            to view message details.`
              };
              sendEmail(emailParams);

              if (req.body.priority === 'critical' && process.env.NODE_ENV !== 'test') {
                const smsParams = {
                  priority: uppercasePriority,
                  group: members.groupName,
                  message: messageDetail.body,
                  to: member.phoneNumber
                };
                sendSms(smsParams);
              }
            });
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
   * @param {any} req incoming request from the client
   * @param {any} res response sent back to client
   *
   * @returns {response} response object
   */
  getGroupMessages(req, res) {
    models.Message.findAll({
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
      }]
    })
    .then((messages) => {
      if (messages) {
        res.status(200).send({ messages: messages.sort(customSort) });
      }
    })
    .catch(error => res.status(500).send(error.message));
  },

   /**
   * Get the groups a user belongs to
   * Route: GET: /api/v1/groups/:group_id/members
   *
   * @param {any} req incoming request from the client
   * @param {any} res response sent back to client
   *
   * @returns {response} response object
   */
  getGroupMembers(req, res) {
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
      }
    })
    .catch(error => res.status(500).send(error.message));
  }
};
