import { SET_NEW_GROUP } from '../actions/types';


/**
* Reducer for actions related to a user's groups.
* @param {Object} state The old state of the application
* @param {Object} action The dispatched action
* @returns {Object} The new application state
*/
export default (state = {}, action = {}) => {
  switch (action.type) {
    case SET_NEW_GROUP:
      return {
        ...state,
        groupId: action.groupDetails.groupId,
        groupName: action.groupDetails.groupName
      };

    default:
      return state;
  }
};
