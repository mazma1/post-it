import { SET_SELECTED_GROUP } from '../actions/types';

/**
  * Updates the redux store with details of an active group
  *
  * @param {object} group - Object that contains the group id and name
  * of selected group
  *
  * @returns {object} Action that sends the details of the active group to the
  * reducers
  */
export default function setSelectedGroup(group) {
  return {
    type: SET_SELECTED_GROUP,
    selectedGroup: group
  };
}
