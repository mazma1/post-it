import models from '../models';
import customSort from '../utils/customSort';
import sendNotification from '../utils/sendNotification';

const GroupController = {
  /**
    * Creates a new group
    * Route: POST: /api/v1/groups
    *
    * @param {object} req - Incoming request from the client
    * @param {object} res - Response sent back to client
    *
    * @returns {object} Details of new group created
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
            .then(() => res.status(201).send({
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
    * Route: POST: /api/v1/groups/:groupId/user
    *
    * @param {object} req - Incoming request from the client
    * @param {object} res - Response sent back to client
    *
    * @returns {object} - Message that indicates that user was successfully
    * added to group
   */
  addUserToGroup(req, res) {
    const { groupId } = req.params;
    let error = '';
    if (!req.body.identifier) {
      error = 'Username or email is required';
      res.status(400).send({ error });
    } else {
      models.User.findOne({
        where: {
          $or: [
            { username: req.body.identifier },
            { email: req.body.identifier }
          ]
        },
      })
      .then((user) => {
        if (user) {
          user.getGroups().then((groups) => {
            groups.map((group) => {
              if (
                parseInt(group.id, 10) === parseInt(groupId, 10)
              ) {
                error = 'User has already been added to group';
                res.status(409).send({ error });
              } else {
                const details = {
                  groupId,
                  userId: user.id
                };
                models.GroupMember.create(details)
                .then(() => res.status(201).send({
                  message: 'User successfully added to group',
                }))
                .catch(err => res.status(500).send(err));
              }
            });
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
    * Route: POST: /api/v1/groups/:groupId/message
    *
    * @param {object} req - Incoming request from the client
    * @param {object} res - Response sent back to client
    *
    * @returns {object} Details of posted message
    */
  postMessageToGroup(req, res) {
    const userId = req.decoded.data.id;
    if (!req.body.message) {
      return res.status(400).send({ error: 'Message is required' });
    }
    const { priority } = req.body;
    const messageDetail = {
      userId,
      priority,
      readBy: req.decoded.data.username,
      body: req.body.message,
      groupId: req.params.groupId,
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
        if (priority === 'urgent' || priority === 'critical') {
          sendNotification(req, message, messageDetail);
        }
      })
      .catch(err => res.status(500).send(err.message));
  },


  /**
    * Get messages posted to a group
    * Route: GET: /api/v1/groups/:groupId/messages
    *
    * @param {object} req - Incoming request from the client
    * @param {object} res - Response sent back to client
    *
    * @returns {object} Messages that belong to a group
    */
  getGroupMessages(req, res) {
    const { groupId } = req.params;
    models.Message.findAll({
      where: { groupId },
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
   * Route: GET: /api/v1/groups/:groupId/members
   *
   * @param {object} req - Incoming request from the client
   * @param {object} res - Response sent back to client
   *
   * @returns {object} Users that belong to a group
   */
  getGroupMembers(req, res) {
    models.Group.findOne({
      where: { id: req.params.groupId },
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

export default GroupController;
