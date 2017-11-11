import models from '../models';

export function verifyGroupId(req, res, next) {
  const { groupId } = req.params;
  if (groupId && isNaN(groupId)) {
    return res.status(400).send({ error: 'Invalid group id' });
  }
  models.Group.findOne({ where: { id: groupId } })
    .then((group) => {
      if (!group) {
        return res.status(404).send({ error: 'Group does not exist' });
      } else if (group) {
        return next();
      }
    });
}

export function verifyUserId(req, res, next) {
  const { userId } = req.params;
  if (userId && isNaN(userId)) {
    return res.status(400).send({ error: 'Invalid user id' });
  }
  return next();
}
