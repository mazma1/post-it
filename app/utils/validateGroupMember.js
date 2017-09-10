import isEmpty from 'lodash/isEmpty';
import models from '../server/models';

export default function validateGroupMember({ userId, group_id }) {
  let error;

  models.Group_member.findOne({
    where: {
      $and: [{ user_id: userId }, { group_id }]
    },
  }).then((member) => {
    if (!member) {
      error = 'You must belong to a group to post a message';
    }
    return error;
  });
  console.log(error);
}
