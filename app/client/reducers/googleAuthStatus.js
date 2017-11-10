import { SET_GOOGLE_AUTH_STATUS } from '../actions/types';


/**
  * Reducer that updates the status of a Google user
  *
  * @param {string} state - The old state of the application
  * @param {object} action - The dispatched action
  *
  * @returns {object} The new application state
  */
export default (state = '', action = {}) => {
  switch (action.type) {
    case SET_GOOGLE_AUTH_STATUS:
      return action.status;

    default:
      return state;
  }
};
