import isEmpty from 'lodash/isEmpty';
import {
  SET_USER_GROUPS,
  FETCHING_USER_GROUPS,
  FETCH_USER_GROUPS_FAILURE,
  SUBMIT_NEW_GROUP_FAILURE } from '../actions/types';
import initialState from '../utils/initialState';


/**
  * Reducer for actions related to a user's groups
  *
  * @param {object} state - The old state of the application
  * @param {object} action - The dispatched action
  *
  * @returns {object} The new application state
  */
export default (state = initialState.userGroups, action = {}) => {
  switch (action.type) {
    case FETCHING_USER_GROUPS:
      return {
        ...state,
        isLoading: true
      };

    case SET_USER_GROUPS:
      return {
        ...state,
        isLoading: false,
        hasGroup: !isEmpty(action.groups),
        groups: action.groups
      };

    case FETCH_USER_GROUPS_FAILURE:
      return {
        isLoading: false,
        error: action.error.response.data.error
      };

    case SUBMIT_NEW_GROUP_FAILURE:
      return {
        isLoading: false,
        error: action.error.response.data
      };

    default:
      return state;
  }
};
