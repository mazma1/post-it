import {
  REQUEST_NEW_PASSWORD_SUCCESS,
  REQUEST_NEW_PASSWORD_FAILURE,
  SET_TOKEN_STATUS,
  TOKEN_STATUS_ERROR
} from '../actions/types';


/**
  * Reducer that handles reset password actions
  *
  * @param {object} state - The old state of the application
  * @param {object} action - The dispatched action
  *
  * @returns {object} The new application state
  */
export default (state = {}, action = {}) => {
  switch (action.type) {
    case REQUEST_NEW_PASSWORD_SUCCESS:
      return {
        message: action.message
      };

    case REQUEST_NEW_PASSWORD_FAILURE:
      return {
        message: action.error
      };

    case SET_TOKEN_STATUS:
      return {
        status: 'success',
        message: action.message
      };

    case TOKEN_STATUS_ERROR:
      return {
        status: 'failure',
        message: action.message
      };

    default:
      return state;
  }
};
