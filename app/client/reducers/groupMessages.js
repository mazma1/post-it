import {
  SET_GROUP_MESSAGES,
  FETCHING_GROUP_MESSAGES,
  FETCH_GROUP_MESSAGES_FAILURE } from '../actions/types';
import initialState from '../utils/initialState';


/**
* Reducer for group messages related actions.
* @param {Object} state The old state of the application
* @param {Object} action The dispatched action
* @returns {Object} The new application state
*/
export default (state = initialState.groupMessages, action = {}) => {
  switch (action.type) {
    case FETCHING_GROUP_MESSAGES:
      return {
        ...state,
        isLoading: true
      };

    case SET_GROUP_MESSAGES:
      return {
        ...state,
        isLoading: false,
        messages: action.messages
      };

    case FETCH_GROUP_MESSAGES_FAILURE:
      return {
        ...state,
        isLoading: false,
        messages: action.error
      };

    default:
      return state;
  }
};
