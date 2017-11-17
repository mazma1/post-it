import models from '../models';


/**
 * Authorizes only members of a group to perform specified actions
 * in the group
 *
 * @param {object} req - Request from the client
 * @param {object} res - Response sent back to the client
 * @param {function} next - Executes succeeding middleware
 *
 * @returns {function} next
 */
function verifyMembership(req, res, next) {
  const userId = req.decoded.data.id;
  const { groupId } = req.params;
  if (groupId && isNaN(groupId)) {
    return res.status(400).send({ error: 'Invalid group id' });
  }
  models.Group.findOne({ where: { id: groupId } })
    .then((group) => {
      if (!group) {
        return res.status(404).send({ error: 'Group does not exist' });
      }
      group.getMembers().then((members) => {
        const groupMember = members.find(member => member.id === userId);
        if (!groupMember) {
          return res.status(403).send({
            error: 'Unauthorized! You do not belong to this group'
          });
        } else if (groupMember) {
          next();
        }
      });
    })
    .catch(err => res.status(500).send(err.message));
}

export default verifyMembership;

