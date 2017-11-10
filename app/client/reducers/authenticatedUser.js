import isEmpty from 'lodash/isEmpty';
import { SET_CURRENT_USER, DELETE_CURRENT_USER } from '../actions/types';
import initialState from '../utils/initialState';


/**
* Reducer for authentication-related actions
*
* @param {object} state - The old state of the application
* @param {object} action - The dispatched action
*
* @returns {object} - The new application state
*/
export default (state = initialState.auth, action = {}) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.user),
        user: {
          id: action.user.data.id,
          firstname: action.user.data.firstName,
          lastname: action.user.data.lastName,
          username: action.user.data.username,
          email: action.user.data.email
        }
      };

    case DELETE_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.user),
        user: action.user
      };

    default:
      return state;
  }
};
