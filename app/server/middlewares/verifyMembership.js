import models from '../models';

export default (req, res, next) => {
  const userId = req.decoded.data.id;
  const groupId = req.params.group_id;
  models.Group.findOne({ where: { id: groupId } })
    .then((group) => {
      if (!group) {
        return res.status(404).send({ error: 'Group does not exist' });
      }
      if (group) {
        models.GroupMember.findOne({
          where: {
            $and: [{ userId }, { groupId }]
          },
        }).then((member) => {
          if (!member) {
            return res.status(401).send({
              error: 'You don\'t belong to this group'
            });
          } else if (member) {
            next();
          }
        });
      }
    })
    .catch(err => res.status(500).send(err.message));
};
