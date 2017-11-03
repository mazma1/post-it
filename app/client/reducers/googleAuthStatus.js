import { SET_GOOGLE_AUTH_STATUS } from '../actions/types';

export default (state = '', action = {}) => {
  switch (action.type) {
    case SET_GOOGLE_AUTH_STATUS:
      return action.status;

    default:
      return state;
  }
};
