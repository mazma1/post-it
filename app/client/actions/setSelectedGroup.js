import { SET_SELECTED_GROUP } from '../actions/types';

/**
  * Makes request to sign up a user

  * @param {object} group group id and name of selected group

  * @returns {action} action type and payload
  */
export default function setSelectedGroup(group) {
  return {
    type: SET_SELECTED_GROUP,
    selectedGroup: group
  };
}
