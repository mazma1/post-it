import { SET_GROUP_MEMBERS, FETCHING_GROUP_MEMBERS } from '../actions/types';
import initialState from '../utils/initialState';

/**
  * Reducer for actions related to group members
  *
  * @param {Object} state - The old state of the application
  * @param {Object} action - The dispatched action
  *
  * @returns {Object} The new application state
  */
export default (state = initialState.groupMembers, action = {}) => {
  switch (action.type) {
    case FETCHING_GROUP_MEMBERS:
      return {
        ...state,
        isLoading: true
      };

    case SET_GROUP_MEMBERS:
      return {
        ...state,
        isLoading: false,
        members: action.membersDetails.members
      };

    default:
      return state;
  }
};
