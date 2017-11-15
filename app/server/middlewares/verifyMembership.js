import models from '../models';

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
          return res.status(401).send({
            error: 'You don\'t belong to this group'
          });
        } else if (groupMember) {
          next();
        }
      });
    })
    .catch(err => res.status(500).send(err.message));
}

export default verifyMembership;

