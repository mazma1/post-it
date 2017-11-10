import { SET_NEW_GROUP } from '../actions/types';


/**
  * Reducer that handles updating a newly created group
  *
  * @param {object} state - The old state of the application
  * @param {object} action - The dispatched action
  *
  * @returns {object} The new application state
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
