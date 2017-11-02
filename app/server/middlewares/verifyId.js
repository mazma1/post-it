import models from '../models';

export function verifyGroupId(req, res, next) {
  const { group_id } = req.params;
  if (group_id && isNaN(group_id)) {
    return res.status(400).send({ message: 'Invalid group id' });
  }
  models.Group.findOne({ where: { id: group_id } })
    .then((group) => {
      if (!group) {
        return res.status(404).send({ error: 'Group does not exist' });
      } else if (group) {
        return next();
      }
    });
}

export function verifyUserId(req, res, next) {
  const { user_id } = req.params;
  if (user_id && isNaN(user_id)) {
    return res.status(400).send({ message: 'Invalid user id' });
  }
  return next();
}
