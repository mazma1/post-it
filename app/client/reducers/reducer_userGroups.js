import isEmpty from 'lodash/isEmpty';
import { SET_USER_GROUPS, FETCHING_USER_GROUPS, FETCH_USER_GROUPS_FAILURE } from '../actions/types';

const initialState = {
  isLoading: false,
  groups: []
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCHING_USER_GROUPS:
      return {
        isLoading: true,
        groups: action.group
      };

    case SET_USER_GROUPS:
      return {
        hasGroup: !isEmpty(action.group),
        groups: action.group
      };

    case FETCH_USER_GROUPS_FAILURE:
      return {
        isLoading: false,
        error: action.error
      };

    default:
      return state;
  }
};
