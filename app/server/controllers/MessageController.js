import includes from 'lodash/includes';
import models from '../models';

const MessageController = {
  /**
    * Updates a user that have read a message
    * Route: PATCH: /api/v1/messages/:messageId/read
    *
    * @param {object} req - Incoming request from the client
    * @param {object} res - Response sent back to client
    *
    * @returns {object} Message that indicates that message status was
    * updated successfully
   */
  updateMessageReadStatus(req, res) {
    const { username, readBy } = req.body;
    const messageId = req.params.messageId;
    const updatedReadBy = `${readBy},${username}`;

    if (!includes(readBy, username)) {
      return models.Message.update({
        readBy: updatedReadBy,
      }, {
        where: { id: messageId }
      })
        .then(() => {
          res.status(201).send({
            message: 'Message read status updated successfully'
          });
        })
        .catch(error => res.status(500).send({ error: error.message }));
    }
    return res.status(200).send({ message: 'User has read message' });
  },


  /**
    * Archives a given message
    * Route: PATCH: /api/v1/messages/:messageId/archive
    *
    * @param {object} req - Incoming request from the client
    * @param {object} res - Response sent back to client
    *
    * @returns {object} Details of message that was archived
    */
  archiveMessage(req, res) {
    models.Message.findOne({
      where: {
        id: req.params.messageId
      }
    })
      .then((message) => {
        const { username } = req.decoded.data || req.body;
        message.isArchived.push(username);
        message.update({ isArchived: message.isArchived });
        const { id, isArchived, readBy } = message;
        res.status(200).send({
          message: 'Message successfully archived',
          archivedMessage: {
            id,
            readBy,
            isArchived,
            group: message.groupId,
            message: message.body,
            priority: message.priority,
            timeSent: message.createdAt,
            sentBy: { username: req.decoded.data.username }
          }
        });
      })
      .catch(error => res.status(500).send(error.message));
  }
};

export default MessageController;

