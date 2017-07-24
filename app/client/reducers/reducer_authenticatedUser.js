import isEmpty from 'lodash/isEmpty';
import { SET_CURRENT_USER, DELETE_CURRENT_USER } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: !isEmpty(action.user),
        user: {
          id: action.user.data.id,
          firstname: action.user.data.firstname,
          lastname: action.user.data.lastname,
          username: action.user.data.username,
          email: action.user.data.email
        }
      };

      case DELETE_CURRENT_USER:
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user
      }

    default:
      return state;
  }
};
