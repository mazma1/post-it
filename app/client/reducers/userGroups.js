import isEmpty from 'lodash/isEmpty';
import { SET_USER_GROUPS, FETCHING_USER_GROUPS, FETCH_USER_GROUPS_FAILURE } from '../actions/types';
import initialState from '../../utils/initialState';


/**
* Reducer for actions related to a user's groups.
* @param {Object} state The old state of the application
* @param {Object} action The dispatched action
* @returns {Object} The new application state
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
        hasGroup: !isEmpty(action.group),
        groups: action.group
      };

    case FETCH_USER_GROUPS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };

    default:
      return state;
  }
};
