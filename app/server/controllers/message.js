import includes from 'lodash/includes';
import models from '../models';

export default {
  /**
   * Updates a user that have read a message
   * Route: PATCH: /api/v1/messages/:message_id/read
   *
   * @param {any} req
   * @param {any} res
   * @returns {response} response object
   */
  updateMessageReadStatus(req, res) {
    const { username, readBy } = req.body;
    const messageId = req.params.message_id;
    const updatedReadBy = `${readBy},${username}`;

    if (!includes(readBy, username)) {
      return models.Message.update({
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
    return res.status(200).send({ message: 'User has read message' });
  },

  /**
   * Archives a given message
   * Route: PATCH: /api/v1/messages/:message_id/archive
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
        const { username } = req.decoded.data || req.body;
        message.isArchived.push(username);
        message.update({ isArchived: message.isArchived });
        res.status(200).send({ message: 'Message successfully archived' });
      })
      .catch(error => res.status(500).send(error.message));
  }
};
