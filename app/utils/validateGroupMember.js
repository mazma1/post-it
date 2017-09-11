import models from '../server/models';

export default function validateGroupMember({ res, userId, group, GroupMember }) {
  GroupMember.findOne({
    where: {
      $and: [{ userId }, { groupId: group.id }]
    },
  })
  .then((member) => {
    console.log(member)
    if (member === null) {
      return false;
    }
  });
}
