import isEmpty from 'lodash/isEmpty';
import { SET_USER_GROUPS } from '../actions/types';

export default (state = {}, action = {}) => {
  switch (action.type) {
    case SET_USER_GROUPS:
      return {
        hasGroup: !isEmpty(action.group),
        groups: action.group
      };

    default:
      return state;
  }
};
